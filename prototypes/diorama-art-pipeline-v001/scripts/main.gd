extends Node3D

const CAMERA_FOV: float = 34.0
const CAMERA_SIDE_LIMIT: float = 5.4
const CAMERA_DEPTH_LIMIT: float = 4.0
const OCCLUSION_MARGIN: float = 0.75
const MAX_OCCLUDER_TRANSPARENCY: float = 0.24

class OccluderEntry:
	var body: StaticBody3D
	var visual: Node3D
	var fade: float = 0.0
	var meshes: Array[GeometryInstance3D] = []

	func _init(new_body: StaticBody3D, new_visual: Node3D) -> void:
		body = new_body
		visual = new_visual

var player: CharacterBody3D
var camera: Camera3D
var camera_preset: int = 1
var camera_angle_index: int = 1
var camera_yaw: float = deg_to_rad(45.0)
var camera_target_yaw: float = deg_to_rad(45.0)
var camera_focus: Vector3 = Vector3.ZERO
var dead_zone_focus: Vector3 = Vector3.ZERO

var occluders: Array[OccluderEntry] = []
var narration_label: Label
var hud_label: Label
var debug_label: Label
var narration_seen: Array[String] = []
var hud_visible: bool = true

func _ready() -> void:
	player = get_node("Player") as CharacterBody3D
	_build_lighting()
	_build_collision()
	_build_camera()
	_build_ui()
	_set_narration("Late afternoon. The shop lights are already on, though the handwritten sign still insists it is morning.")

func _physics_process(delta: float) -> void:
	if player == null or camera == null:
		return
	_update_camera(delta)
	_update_occlusion(delta)
	_update_narration()
	_update_hud()

func _unhandled_key_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo:
		return
	if event.keycode == KEY_C:
		camera_preset = (camera_preset + 1) % 3
	elif event.keycode == KEY_Z:
		_rotate_camera(-1)
	elif event.keycode == KEY_X:
		_rotate_camera(1)
	elif event.keycode == KEY_F1:
		hud_visible = not hud_visible
		hud_label.visible = hud_visible
		debug_label.visible = hud_visible

func _build_lighting() -> void:
	var environment_node: WorldEnvironment = WorldEnvironment.new()
	var environment: Environment = Environment.new()
	environment.background_mode = Environment.BG_COLOR
	environment.background_color = Color("#b8c8cc")
	environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	environment.ambient_light_color = Color("#c7d4d5")
	environment.ambient_light_energy = 0.58
	environment.tonemap_mode = Environment.TONE_MAPPER_FILMIC
	environment_node.environment = environment
	add_child(environment_node)

	var key: DirectionalLight3D = DirectionalLight3D.new()
	key.name = "WarmKey"
	key.rotation_degrees = Vector3(-54.0, -38.0, 0.0)
	key.light_color = Color("#ffe5c5")
	key.light_energy = 1.25
	key.shadow_enabled = true
	add_child(key)

	var fill: DirectionalLight3D = DirectionalLight3D.new()
	fill.name = "CoolFill"
	fill.rotation_degrees = Vector3(-38.0, 140.0, 0.0)
	fill.light_color = Color("#bdd4e8")
	fill.light_energy = 0.38
	fill.shadow_enabled = false
	add_child(fill)

	var shop_glow: OmniLight3D = OmniLight3D.new()
	shop_glow.name = "ShopGlow"
	shop_glow.position = Vector3(6.8, 1.7, -5.5)
	shop_glow.light_color = Color("#ffc77c")
	shop_glow.light_energy = 1.4
	shop_glow.omni_range = 4.5
	shop_glow.shadow_enabled = false
	add_child(shop_glow)

func _build_collision() -> void:
	var ground: StaticBody3D = StaticBody3D.new()
	ground.name = "GroundCollision"
	ground.collision_layer = 1
	var ground_shape: CollisionShape3D = CollisionShape3D.new()
	var ground_box: BoxShape3D = BoxShape3D.new()
	ground_box.size = Vector3(30.0, 0.35, 28.0)
	ground_shape.shape = ground_box
	ground_shape.position = Vector3(0.0, -0.18, -2.0)
	ground.add_child(ground_shape)
	add_child(ground)

	_add_occluder("CornerShopCollision", Vector3(9.1, 1.8, -3.4), Vector3(7.4, 3.6, 5.2), get_node("Art/CornerShop") as Node3D, deg_to_rad(110.0))
	_add_occluder("TerraceEndCollision", Vector3(-2.0, 2.0, -10.2), Vector3(5.2, 4.0, 5.4), get_node("Art/TerraceEnd") as Node3D, deg_to_rad(10.0))

func _add_occluder(node_name: String, position: Vector3, size: Vector3, visual: Node3D, yaw: float) -> void:
	var body: StaticBody3D = StaticBody3D.new()
	body.name = node_name
	body.collision_layer = 1
	body.position = position
	body.rotation.y = yaw
	var shape_node: CollisionShape3D = CollisionShape3D.new()
	var shape: BoxShape3D = BoxShape3D.new()
	shape.size = size
	shape_node.shape = shape
	body.add_child(shape_node)
	add_child(body)
	var entry: OccluderEntry = OccluderEntry.new(body, visual)
	_collect_geometry(visual, entry.meshes)
	occluders.append(entry)

func _build_camera() -> void:
	camera = Camera3D.new()
	camera.name = "DioramaCamera"
	camera.projection = Camera3D.PROJECTION_PERSPECTIVE
	camera.fov = CAMERA_FOV
	camera.keep_aspect = Camera3D.KEEP_HEIGHT
	camera.near = 0.1
	camera.far = 120.0
	camera.current = true
	add_child(camera)
	dead_zone_focus = player.global_position
	dead_zone_focus.y = 0.95
	camera_focus = dead_zone_focus
	_apply_camera_transform()

func _update_camera(delta: float) -> void:
	var offset: Vector3 = player.global_position - dead_zone_focus
	offset.y = 0.0
	var right: Vector3 = Vector3(-sin(camera_target_yaw), 0.0, cos(camera_target_yaw))
	var forward: Vector3 = Vector3(-cos(camera_target_yaw), 0.0, -sin(camera_target_yaw))
	var side: float = offset.dot(right)
	var depth: float = offset.dot(forward)
	if absf(side) > CAMERA_SIDE_LIMIT:
		var side_sign: float = 1.0 if side > 0.0 else -1.0
		dead_zone_focus += right * (side - side_sign * CAMERA_SIDE_LIMIT)
	if absf(depth) > CAMERA_DEPTH_LIMIT:
		var depth_sign: float = 1.0 if depth > 0.0 else -1.0
		dead_zone_focus += forward * (depth - depth_sign * CAMERA_DEPTH_LIMIT)
	dead_zone_focus.y = 0.95
	camera_focus = dead_zone_focus
	camera_yaw = lerp_angle(camera_yaw, camera_target_yaw, clampf(delta * 8.5, 0.0, 1.0))
	_apply_camera_transform()

func _apply_camera_transform() -> void:
	var radius: float = _camera_radius()
	var height: float = _camera_height()
	camera.global_position = camera_focus + Vector3(cos(camera_yaw) * radius, height, sin(camera_yaw) * radius)
	camera.look_at(camera_focus + Vector3(0.0, 0.35, 0.0), Vector3.UP)

func _camera_radius() -> float:
	match camera_preset:
		0: return 14.5
		1: return 23.5
		2: return 31.5
	return 23.5

func _camera_height() -> float:
	match camera_preset:
		0: return 8.6
		1: return 14.0
		2: return 18.5
	return 14.0

func _camera_name() -> String:
	match camera_preset:
		0: return "Close"
		1: return "Standard"
		2: return "Wide"
	return "Standard"

func _rotate_camera(direction: int) -> void:
	camera_angle_index = (camera_angle_index + direction + 8) % 8
	camera_target_yaw = deg_to_rad(float(camera_angle_index) * 45.0)

func _update_occlusion(delta: float) -> void:
	var world: World3D = get_world_3d()
	var space: PhysicsDirectSpaceState3D = world.direct_space_state
	var camera_right: Vector3 = camera.global_transform.basis.x
	camera_right.y = 0.0
	if camera_right.length_squared() > 0.001:
		camera_right = camera_right.normalized()
	else:
		camera_right = Vector3.RIGHT

	var probes: Array[Vector3] = [
		player.global_position + Vector3(0.0, 1.36, 0.0),
		player.global_position + Vector3(0.0, 0.98, 0.0),
		player.global_position + camera_right * 0.28 + Vector3(0.0, 0.98, 0.0),
		player.global_position - camera_right * 0.28 + Vector3(0.0, 0.98, 0.0)
	]
	var blocked_count: int = 0
	var actual_counts: Array[int] = []
	var anticipated: Array[bool] = []
	for _entry: OccluderEntry in occluders:
		actual_counts.append(0)
		anticipated.append(false)

	for target: Vector3 in probes:
		var blocker_index: int = _ray_occluder_index(space, target)
		if blocker_index >= 0:
			blocked_count += 1
			actual_counts[blocker_index] += 1

	var corridor_targets: Array[Vector3] = [
		player.global_position + camera_right * OCCLUSION_MARGIN + Vector3(0.0, 1.08, 0.0),
		player.global_position - camera_right * OCCLUSION_MARGIN + Vector3(0.0, 1.08, 0.0)
	]
	for target: Vector3 in corridor_targets:
		var blocker_index: int = _ray_occluder_index(space, target)
		if blocker_index >= 0:
			anticipated[blocker_index] = true

	for index: int in range(occluders.size()):
		var count: int = actual_counts[index]
		var target_fade: float = 0.0
		if count >= 4:
			target_fade = 1.0
		elif count == 3:
			target_fade = 0.58
		elif anticipated[index]:
			target_fade = 0.32
		var entry: OccluderEntry = occluders[index]
		var speed: float = 7.0 if target_fade > entry.fade else 4.0
		entry.fade = move_toward(entry.fade, target_fade, speed * delta)
		for geometry: GeometryInstance3D in entry.meshes:
			geometry.transparency = entry.fade * MAX_OCCLUDER_TRANSPARENCY

	if player.has_method("set_xray"):
		player.call("set_xray", blocked_count >= 3, blocked_count >= 4)

func _ray_occluder_index(space: PhysicsDirectSpaceState3D, target: Vector3) -> int:
	var excluded: Array[RID] = [player.get_rid()]
	for _layer: int in range(4):
		var query: PhysicsRayQueryParameters3D = PhysicsRayQueryParameters3D.create(camera.global_position, target)
		query.collision_mask = 1
		query.exclude = excluded
		var hit: Dictionary = space.intersect_ray(query)
		if hit.is_empty():
			return -1
		var collider: Object = hit.get("collider") as Object
		if collider is StaticBody3D:
			var body: StaticBody3D = collider as StaticBody3D
			excluded.append(body.get_rid())
			for index: int in range(occluders.size()):
				if occluders[index].body == body:
					return index
		else:
			return -1
	return -1

func _collect_geometry(node: Node, output: Array[GeometryInstance3D]) -> void:
	for child: Node in node.get_children():
		if child is GeometryInstance3D:
			output.append(child as GeometryInstance3D)
		_collect_geometry(child, output)

func _build_ui() -> void:
	var layer: CanvasLayer = CanvasLayer.new()
	add_child(layer)
	var top: PanelContainer = PanelContainer.new()
	top.position = Vector2(24.0, 24.0)
	top.custom_minimum_size = Vector2(560.0, 0.0)
	layer.add_child(top)
	var margin: MarginContainer = MarginContainer.new()
	for side_name: String in ["margin_left", "margin_right", "margin_top", "margin_bottom"]:
		margin.add_theme_constant_override(side_name, 14 if "top" in side_name or "bottom" in side_name else 18)
	top.add_child(margin)
	hud_label = Label.new()
	hud_label.add_theme_font_size_override("font_size", 19)
	margin.add_child(hud_label)
	debug_label = Label.new()
	debug_label.position = Vector2(24.0, 145.0)
	debug_label.add_theme_font_size_override("font_size", 16)
	debug_label.add_theme_color_override("font_color", Color("#263238"))
	layer.add_child(debug_label)

	var narration_panel: PanelContainer = PanelContainer.new()
	narration_panel.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	narration_panel.position = Vector2(-390.0, -128.0)
	narration_panel.custom_minimum_size = Vector2(780.0, 88.0)
	layer.add_child(narration_panel)
	var narration_margin: MarginContainer = MarginContainer.new()
	narration_margin.add_theme_constant_override("margin_left", 24)
	narration_margin.add_theme_constant_override("margin_right", 24)
	narration_margin.add_theme_constant_override("margin_top", 16)
	narration_margin.add_theme_constant_override("margin_bottom", 16)
	narration_panel.add_child(narration_margin)
	narration_label = Label.new()
	narration_label.add_theme_font_size_override("font_size", 21)
	narration_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	narration_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	narration_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	narration_margin.add_child(narration_label)

func _update_hud() -> void:
	hud_label.text = "DIORAMA ART PIPELINE v001\nWASD / arrows — walk    C — %s\nZ / X — rotate 45°    F1 — hide test HUD" % _camera_name()
	debug_label.text = "Blender-source kit → glTF → Godot assembly   perspective 34°   angle %d/8" % (camera_angle_index + 1)

func _update_narration() -> void:
	var p: Vector3 = player.global_position
	_check_narration("shop", p, Vector3(6.8, 0.0, -5.7), 3.2, "The shop window has three layers of notices. The newest one has been taped directly over the old opening hours.")
	_check_narration("green", p, Vector3(-1.8, 0.0, 0.0), 3.3, "The grass has been cut around the bench rather than beneath it. A pale rectangle records where it has not moved in years.")
	_check_narration("terrace", p, Vector3(-2.0, 0.0, -8.8), 3.3, "One drainpipe has been replaced recently. It is the only thing on the frontage that is exactly vertical.")

func _check_narration(id: String, player_position: Vector3, point: Vector3, radius: float, text: String) -> void:
	if id in narration_seen:
		return
	if Vector2(player_position.x, player_position.z).distance_to(Vector2(point.x, point.z)) <= radius:
		narration_seen.append(id)
		_set_narration(text)

func _set_narration(text: String) -> void:
	if narration_label != null:
		narration_label.text = text
