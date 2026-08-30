extends Node

# Runtime corrections inherited from the accepted managed-decline-v1 camera/world playtests.
# This deliberately implements only the settled soft-occlusion direction; rejected deep
# whole-building ghosting and dither cutaways are not reproduced here.

const R1_CORRIDOR_MARGIN := 0.75
const MAX_BUILDING_TRANSPARENCY := 0.24
const PREFADE_STRENGTH := 0.32

var scene_root: Node3D
var player: CharacterBody3D
var camera: Camera3D
var world_space: PhysicsDirectSpaceState3D

var building_meshes: Dictionary = {}
var building_fades: Dictionary = {}
var player_meshes: Array[GeometryInstance3D] = []
var xray_material: StandardMaterial3D

func _ready() -> void:
	call_deferred("_bind_scene")

func _bind_scene() -> void:
	scene_root = get_tree().current_scene as Node3D
	if scene_root == null:
		return

	player = scene_root.get_node_or_null("Player") as CharacterBody3D
	camera = scene_root.get_node_or_null("DioramaCamera") as Camera3D
	if player == null or camera == null:
		return

	world_space = scene_root.get_world_3d().direct_space_state
	_collect_player_meshes(player)
	_build_xray_material()
	_hide_explanatory_caption(scene_root)

func _physics_process(delta: float) -> void:
	if player == null or camera == null or world_space == null:
		return

	var camera_right: Vector3 = camera.global_transform.basis.x
	camera_right.y = 0.0
	if camera_right.length_squared() > 0.001:
		camera_right = camera_right.normalized()
	else:
		camera_right = Vector3.RIGHT

	var actual_counts: Dictionary = {}
	var anticipation: Dictionary = {}
	var blocked_probe_count := 0

	var upper_body_probes: Array[Vector3] = [
		player.global_position + Vector3(0.0, 1.38, 0.0),
		player.global_position + Vector3(0.0, 0.98, 0.0),
		player.global_position + camera_right * 0.28 + Vector3(0.0, 0.98, 0.0),
		player.global_position - camera_right * 0.28 + Vector3(0.0, 0.98, 0.0)
	]

	for target in upper_body_probes:
		var blockers := _eligible_blockers_to(target)
		if not blockers.is_empty():
			blocked_probe_count += 1
		for body in blockers:
			actual_counts[body] = int(actual_counts.get(body, 0)) + 1

	# R1-style restrained corridor pre-fade. These side probes prepare a nearby
	# building before it fully covers the character, but can never create a deep ghost.
	var corridor_targets: Array[Vector3] = [
		player.global_position + camera_right * R1_CORRIDOR_MARGIN + Vector3(0.0, 1.08, 0.0),
		player.global_position - camera_right * R1_CORRIDOR_MARGIN + Vector3(0.0, 1.08, 0.0)
	]
	for target in corridor_targets:
		for body in _eligible_blockers_to(target):
			anticipation[body] = true

	var touched: Dictionary = {}
	for body in actual_counts.keys():
		touched[body] = true
	for body in anticipation.keys():
		touched[body] = true
	for body in building_fades.keys():
		touched[body] = true

	for body in touched.keys():
		if not is_instance_valid(body):
			building_fades.erase(body)
			building_meshes.erase(body)
			continue

		var count := int(actual_counts.get(body, 0))
		var target_fade := 0.0
		if count >= 4:
			target_fade = 1.0
		elif count == 3:
			target_fade = 0.58
		elif anticipation.has(body):
			target_fade = PREFADE_STRENGTH

		var current_fade := float(building_fades.get(body, 0.0))
		var speed := 7.0 if target_fade > current_fade else 4.0
		current_fade = move_toward(current_fade, target_fade, speed * delta)
		building_fades[body] = current_fade
		_apply_building_fade(body, current_fade)

	_apply_player_xray(blocked_probe_count)

func _eligible_blockers_to(target: Vector3) -> Array[StaticBody3D]:
	var blockers: Array[StaticBody3D] = []
	var excluded: Array[RID] = [player.get_rid()]

	# Continue past low/ineligible geometry so fences can hide legs without forcing
	# an architectural fade, while stacked substantial occluders can reveal together.
	for _layer in range(5):
		var query := PhysicsRayQueryParameters3D.create(camera.global_position, target)
		query.collision_mask = 1
		query.exclude = excluded
		var hit := world_space.intersect_ray(query)
		if hit.is_empty():
			break

		var collider := hit.get("collider")
		if collider is StaticBody3D:
			var body := collider as StaticBody3D
			excluded.append(body.get_rid())
			if _is_fade_eligible(body):
				blockers.append(body)
		else:
			break

	return blockers

func _is_fade_eligible(body: StaticBody3D) -> bool:
	var body_name := String(body.name)
	return (
		body_name.begins_with("Terrace")
		or body_name == "CornerShop"
		or body_name == "Flats"
		or body_name == "GarageBlock"
	)

func _apply_building_fade(body: StaticBody3D, fade: float) -> void:
	var meshes := _meshes_for_building(body)
	for geometry in meshes:
		if is_instance_valid(geometry):
			# GeometryInstance3D transparency preserves the authored material/shading.
			geometry.transparency = fade * MAX_BUILDING_TRANSPARENCY

func _meshes_for_building(body: StaticBody3D) -> Array[GeometryInstance3D]:
	if building_meshes.has(body):
		return building_meshes[body]

	var meshes: Array[GeometryInstance3D] = []
	_collect_geometry(body, meshes)

	# Greybox roofs are sibling nodes rather than children of their collision bodies.
	var roof := scene_root.get_node_or_null(String(body.name) + "Roof") as GeometryInstance3D
	if roof != null:
		meshes.append(roof)

	building_meshes[body] = meshes
	return meshes

func _collect_geometry(node: Node, output: Array[GeometryInstance3D]) -> void:
	for child in node.get_children():
		if child is GeometryInstance3D:
			output.append(child as GeometryInstance3D)
		_collect_geometry(child, output)

func _collect_player_meshes(node: Node) -> void:
	player_meshes.clear()
	_collect_geometry(node, player_meshes)

func _build_xray_material() -> void:
	xray_material = StandardMaterial3D.new()
	xray_material.albedo_color = Color(0.97, 0.82, 0.32, 0.30)
	xray_material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	xray_material.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	xray_material.no_depth_test = true
	xray_material.cull_mode = BaseMaterial3D.CULL_DISABLED

func _apply_player_xray(blocked_probe_count: int) -> void:
	var enabled := blocked_probe_count >= 3
	if xray_material != null:
		var alpha := 0.38 if blocked_probe_count >= 4 else 0.28
		var color := xray_material.albedo_color
		color.a = alpha
		xray_material.albedo_color = color

	for geometry in player_meshes:
		if is_instance_valid(geometry):
			geometry.material_overlay = xray_material if enabled else null

func _hide_explanatory_caption(node: Node) -> void:
	# The bottom narration panel told the player what the spatial relationship was
	# supposed to mean. The playtest rejected that: companionship must be shown by
	# actual shared activity/staging, not asserted by prototype narration.
	for child in node.get_children():
		if child is PanelContainer:
			var panel := child as PanelContainer
			if panel.custom_minimum_size.x >= 770.0 and panel.custom_minimum_size.x <= 790.0:
				panel.visible = false
		_hide_explanatory_caption(child)
