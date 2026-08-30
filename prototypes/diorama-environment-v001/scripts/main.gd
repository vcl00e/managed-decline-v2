extends Node3D

const PlayerScript = preload("res://scripts/player.gd")
const CompanionScript = preload("res://scripts/companion.gd")

const CAMERA_FOV := 34.0
const CAMERA_SIDE_LIMIT := 5.4
const CAMERA_DEPTH_LIMIT := 4.0

var player
var companion
var camera: Camera3D
var hud_label: Label
var caption_label: Label
var debug_label: Label

var camera_preset := 1
var camera_angle_index := 1
var camera_yaw := deg_to_rad(45.0)
var camera_target_yaw := deg_to_rad(45.0)
var camera_focus := Vector3.ZERO
var dead_zone_focus := Vector3.ZERO

var hud_visible := true
var total_distance := 0.0
var previous_player_position := Vector3.ZERO
var max_companion_separation := 0.0
var together_seconds := 0.0
var elapsed_seconds := 0.0
var visited_shared_stops: Array[String] = []
var visited_landmarks: Array[String] = []
var last_export_path := ""

var shared_stops := [
	{"id": "bus_stop", "position": Vector3(16.4, 0.0, 11.4), "radius": 3.0, "caption": "Tabitha waits beside you at the bus stop. Neither of you has to lead."},
	{"id": "green_bench", "position": Vector3(-7.2, 0.0, -1.8), "radius": 3.1, "caption": "At the green, Tabitha stops with you instead of carrying on without you."},
	{"id": "corner_shop", "position": Vector3(7.8, 0.0, 3.0), "radius": 3.0, "caption": "You both pause at the corner-shop window. The shared activity is simply being here together."}
]

var landmarks := [
	{"id": "terraces", "position": Vector3(-17.0, 0.0, 1.0), "radius": 6.5},
	{"id": "green", "position": Vector3(-7.0, 0.0, -3.5), "radius": 5.5},
	{"id": "corner_shop", "position": Vector3(9.0, 0.0, 1.5), "radius": 5.0},
	{"id": "flats", "position": Vector3(9.5, 0.0, -12.0), "radius": 6.5},
	{"id": "side_passage", "position": Vector3(7.0, 0.0, 13.0), "radius": 4.0}
]

func _ready() -> void:
	_build_lighting()
	_build_diorama()
	_spawn_player_and_companion()
	_build_camera()
	_build_ui()
	previous_player_position = player.global_position
	_set_caption("Perspective miniature + large dead-zone. Walk normally; the camera should stay composed instead of constantly drifting after you.")

func _physics_process(delta: float) -> void:
	if player == null:
		return

	elapsed_seconds += delta
	total_distance += player.global_position.distance_to(previous_player_position)
	previous_player_position = player.global_position

	var separation: float = companion.separation
	max_companion_separation = maxf(max_companion_separation, separation)
	if separation <= 3.2:
		together_seconds += delta

	_update_camera(delta)
	_check_shared_stops()
	_check_landmarks()
	_update_hud()

func _unhandled_key_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo:
		return

	if event.keycode == KEY_C:
		camera_preset = (camera_preset + 1) % 3
		_set_caption("Framing: %s. These are discrete authored states, not analogue camera fiddling." % _camera_preset_name())
	elif event.keycode == KEY_Z:
		_rotate_camera(-1)
	elif event.keycode == KEY_X:
		_rotate_camera(1)
	elif event.keycode == KEY_F1:
		hud_visible = not hud_visible
		hud_label.visible = hud_visible
		debug_label.visible = hud_visible
	elif event.keycode == KEY_F8:
		_export_trace()

func _build_lighting() -> void:
	var world_environment := WorldEnvironment.new()
	var environment := Environment.new()
	environment.background_mode = Environment.BG_COLOR
	environment.background_color = Color("#cdd8d9")
	environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	environment.ambient_light_color = Color("#d9dfdc")
	environment.ambient_light_energy = 0.72
	environment.tonemap_mode = Environment.TONE_MAPPER_FILMIC
	world_environment.environment = environment
	add_child(world_environment)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-52.0, -35.0, 0.0)
	sun.light_energy = 1.15
	sun.shadow_enabled = true
	add_child(sun)

func _build_diorama() -> void:
	# Model-set base and a compressed, deliberately non-grid street plan.
	_box("DioramaBase", Vector3(0.0, -0.65, 0.0), Vector3(48.0, 1.2, 39.0), Color("#8b806e"), true)
	_box("Ground", Vector3(0.0, -0.02, 0.0), Vector3(46.0, 0.10, 37.0), Color("#b7b19d"), false)

	var main_road := [
		Vector3(19.0, 0.0, 15.0), Vector3(15.0, 0.0, 11.2), Vector3(9.0, 0.0, 7.0),
		Vector3(4.0, 0.0, 4.7), Vector3(-2.0, 0.0, 4.0), Vector3(-8.5, 0.0, 6.3), Vector3(-15.5, 0.0, 10.5)
	]
	_make_strip(main_road, 8.3, 0.07, Color("#c9c2ae"))
	_make_strip(main_road, 5.35, 0.11, Color("#65676a"))

	var side_route := [Vector3(3.0, 0.0, 4.5), Vector3(4.0, 0.0, 9.0), Vector3(6.8, 0.0, 13.2), Vector3(11.5, 0.0, 16.0)]
	_make_strip(side_route, 3.0, 0.09, Color("#c9c2ae"))
	_make_strip(side_route, 1.8, 0.12, Color("#8b887f"))

	# Small public green and social furniture.
	_box("Green", Vector3(-7.2, 0.08, -3.4), Vector3(11.0, 0.20, 8.0), Color("#7f9a74"), false)
	_box("GreenEdgePath", Vector3(-7.2, 0.18, 0.7), Vector3(11.8, 0.14, 1.2), Color("#c6bfaa"), false)
	_prop_box("BenchSeat", Vector3(-7.1, 0.55, -1.8), Vector3(2.4, 0.18, 0.55), Color("#765d45"))
	_prop_box("BenchBack", Vector3(-7.1, 1.03, -2.05), Vector3(2.4, 0.78, 0.16), Color("#765d45"))
	_tree(Vector3(-11.0, 0.0, -5.6), 1.0)
	_tree(Vector3(-3.1, 0.0, -5.7), 0.9)

	# Terraces: deliberately compressed frontage rhythm, not realistic plots.
	for i in range(5):
		var z := -4.5 + float(i) * 3.25
		_building("Terrace%02d" % i, Vector3(-19.2, 1.75, z), Vector3(5.0, 3.5, 2.7), Color("#a97f6c"), true)
		_prop_box("TerraceDoor%02d" % i, Vector3(-16.65, 0.92, z + 0.52), Vector3(0.10, 1.65, 0.68), Color("#4d625d"))

	# Corner shop and a small back/service mass make the bend legible.
	_building("CornerShop", Vector3(9.6, 1.55, 0.2), Vector3(7.2, 3.1, 5.4), Color("#b49b71"), true)
	_prop_box("ShopFascia", Vector3(5.95, 2.25, 0.2), Vector3(0.12, 0.72, 4.8), Color("#5e766f"))
	_prop_box("ShopWindow", Vector3(5.88, 1.10, 0.2), Vector3(0.10, 1.35, 2.5), Color("#9eb6b8"))
	_label_3d("CORNER SHOP", Vector3(5.72, 3.08, 0.2), 0.0)

	# Flats terminate the long sightline without turning the space into a square arena.
	_building("Flats", Vector3(10.2, 3.2, -12.8), Vector3(12.0, 6.4, 4.8), Color("#8d9392"), true)
	for floor_i in range(3):
		for bay in range(4):
			_prop_box("FlatWindow", Vector3(10.2 - 4.2 + bay * 2.8, 1.5 + floor_i * 1.55, -10.34), Vector3(1.0, 0.72, 0.10), Color("#adc0c5"))

	# A secondary low block helps the side passage read as somewhere you can go.
	_building("GarageBlock", Vector3(14.5, 1.2, 13.9), Vector3(6.2, 2.4, 5.0), Color("#908a7d"), true)
	for bay in range(3):
		_prop_box("GarageDoor", Vector3(12.5 + bay * 1.9, 1.02, 11.36), Vector3(1.55, 1.55, 0.10), Color("#6e746f"))

	# Bus stop landmark at the near end of the road.
	_prop_box("BusStopPole", Vector3(16.9, 1.45, 11.3), Vector3(0.16, 2.9, 0.16), Color("#394b50"))
	_prop_box("BusStopSign", Vector3(16.9, 2.72, 11.3), Vector3(0.72, 0.55, 0.12), Color("#c7d2cf"))
	_prop_box("BusShelterRoof", Vector3(15.2, 2.25, 13.0), Vector3(3.2, 0.16, 1.45), Color("#65777b"))
	_prop_box("BusShelterBack", Vector3(15.2, 1.18, 13.65), Vector3(3.2, 2.1, 0.12), Color("#9eafb0"))

	# Fences produce readable edges and a narrow side passage without invisible walls.
	_fence_line(Vector3(-13.2, 0.0, -7.8), Vector3(-1.0, 0.0, -7.8), 7)
	_fence_line(Vector3(0.0, 0.0, 11.1), Vector3(10.2, 0.0, 17.4), 7)

	# Two visibly active NPCs create a situation the player can notice from the map.
	_spawn_argument_pair(Vector3(3.1, 0.0, 1.4))

	# Low visible perimeter: the map should feel like a physical model, not an endless plane.
	_box("NorthEdge", Vector3(0.0, 0.35, -18.2), Vector3(47.0, 0.7, 0.45), Color("#716b5f"), true)
	_box("SouthEdge", Vector3(0.0, 0.35, 18.2), Vector3(47.0, 0.7, 0.45), Color("#716b5f"), true)
	_box("WestEdge", Vector3(-23.2, 0.35, 0.0), Vector3(0.45, 0.7, 37.0), Color("#716b5f"), true)
	_box("EastEdge", Vector3(23.2, 0.35, 0.0), Vector3(0.45, 0.7, 37.0), Color("#716b5f"), true)

func _spawn_player_and_companion() -> void:
	player = PlayerScript.new()
	player.position = Vector3(15.1, 0.15, 10.0)
	add_child(player)

	companion = CompanionScript.new()
	companion.player = player
	companion.position = Vector3(13.8, 0.15, 10.9)
	add_child(companion)

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
	dead_zone_focus.y = 0.9
	camera_focus = dead_zone_focus
	camera_yaw = camera_target_yaw
	_apply_camera_transform()

func _update_camera(delta: float) -> void:
	_update_dead_zone_focus()
	camera_focus = dead_zone_focus

	var rotation_blend := clampf(delta * 8.5, 0.0, 1.0)
	camera_yaw = lerp_angle(camera_yaw, camera_target_yaw, rotation_blend)
	_apply_camera_transform()

func _update_dead_zone_focus() -> void:
	var delta: Vector3 = player.global_position - dead_zone_focus
	delta.y = 0.0

	var right := Vector3(-sin(camera_target_yaw), 0.0, cos(camera_target_yaw))
	var forward := Vector3(-cos(camera_target_yaw), 0.0, -sin(camera_target_yaw))

	var side := delta.dot(right)
	var depth := delta.dot(forward)

	if absf(side) > CAMERA_SIDE_LIMIT:
		var side_sign := 1.0 if side > 0.0 else -1.0
		dead_zone_focus += right * (side - side_sign * CAMERA_SIDE_LIMIT)

	if absf(depth) > CAMERA_DEPTH_LIMIT:
		var depth_sign := 1.0 if depth > 0.0 else -1.0
		dead_zone_focus += forward * (depth - depth_sign * CAMERA_DEPTH_LIMIT)

	dead_zone_focus.y = 0.9

func _apply_camera_transform() -> void:
	var radius := _camera_radius()
	var height := _camera_height()
	camera.global_position = camera_focus + Vector3(
		cos(camera_yaw) * radius,
		height,
		sin(camera_yaw) * radius
	)
	camera.look_at(camera_focus + Vector3(0.0, 0.30, 0.0), Vector3.UP)

func _camera_radius() -> float:
	match camera_preset:
		0:
			return 16.5
		1:
			return 25.5
		2:
			return 34.0
	return 25.5

func _camera_height() -> float:
	match camera_preset:
		0:
			return 9.5
		1:
			return 15.2
		2:
			return 20.5
	return 15.2

func _camera_preset_name() -> String:
	match camera_preset:
		0:
			return "close"
		1:
			return "standard"
		2:
			return "wide"
	return "standard"

func _rotate_camera(direction: int) -> void:
	camera_angle_index = (camera_angle_index + direction + 8) % 8
	camera_target_yaw = deg_to_rad(float(camera_angle_index) * 45.0)
	_set_caption("Camera angle %d/8. Rotation is smooth; the destination is an exact 45° authored view." % (camera_angle_index + 1))

func _build_ui() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)

	var top_panel := PanelContainer.new()
	top_panel.position = Vector2(24.0, 24.0)
	top_panel.custom_minimum_size = Vector2(570.0, 0.0)
	layer.add_child(top_panel)

	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", 18)
	margin.add_theme_constant_override("margin_right", 18)
	margin.add_theme_constant_override("margin_top", 14)
	margin.add_theme_constant_override("margin_bottom", 14)
	top_panel.add_child(margin)

	hud_label = Label.new()
	hud_label.add_theme_font_size_override("font_size", 20)
	hud_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	margin.add_child(hud_label)

	debug_label = Label.new()
	debug_label.position = Vector2(24.0, 175.0)
	debug_label.add_theme_font_size_override("font_size", 17)
	debug_label.add_theme_color_override("font_color", Color("#233238"))
	layer.add_child(debug_label)

	var caption_panel := PanelContainer.new()
	caption_panel.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	caption_panel.position = Vector2(-390.0, -132.0)
	caption_panel.custom_minimum_size = Vector2(780.0, 92.0)
	layer.add_child(caption_panel)

	var caption_margin := MarginContainer.new()
	caption_margin.add_theme_constant_override("margin_left", 24)
	caption_margin.add_theme_constant_override("margin_right", 24)
	caption_margin.add_theme_constant_override("margin_top", 18)
	caption_margin.add_theme_constant_override("margin_bottom", 18)
	caption_panel.add_child(caption_margin)

	caption_label = Label.new()
	caption_label.add_theme_font_size_override("font_size", 22)
	caption_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	caption_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	caption_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	caption_margin.add_child(caption_label)

func _update_hud() -> void:
	hud_label.text = "DIORAMA ENVIRONMENT v001\nWASD / arrows — walk    C — framing: %s\nZ / X — rotate 45°    F1 — hide HUD    F8 — save trace" % _camera_preset_name()
	var together_ratio := 0.0 if elapsed_seconds <= 0.0 else together_seconds / elapsed_seconds
	debug_label.text = "perspective · dead-zone   angle %d/8   distance %.0fm   together %.0f%%   max separation %.1fm   landmarks %d/5" % [
		camera_angle_index + 1,
		total_distance,
		together_ratio * 100.0,
		max_companion_separation,
		visited_landmarks.size()
	]

func _set_caption(text: String) -> void:
	caption_label.text = text

func _check_shared_stops() -> void:
	for stop in shared_stops:
		var stop_id: String = stop["id"]
		if stop_id in visited_shared_stops:
			continue
		var point: Vector3 = stop["position"]
		var radius: float = stop["radius"]
		if _flat_distance(player.global_position, point) <= radius and _flat_distance(companion.global_position, point) <= radius + 0.8:
			visited_shared_stops.append(stop_id)
			_set_caption(stop["caption"])

func _check_landmarks() -> void:
	for landmark in landmarks:
		var landmark_id: String = landmark["id"]
		if landmark_id in visited_landmarks:
			continue
		var point: Vector3 = landmark["position"]
		var radius: float = landmark["radius"]
		if _flat_distance(player.global_position, point) <= radius:
			visited_landmarks.append(landmark_id)

func _export_trace() -> void:
	var together_ratio := 0.0 if elapsed_seconds <= 0.0 else together_seconds / elapsed_seconds
	var trace := {
		"prototype": "diorama-environment-v001",
		"elapsed_seconds": snappedf(elapsed_seconds, 0.01),
		"distance_travelled": snappedf(total_distance, 0.01),
		"camera_projection": "perspective",
		"camera_preset": camera_preset,
		"camera_preset_name": _camera_preset_name(),
		"camera_angle_index": camera_angle_index,
		"camera_angle_degrees": camera_angle_index * 45,
		"camera_dead_zone_side": CAMERA_SIDE_LIMIT,
		"camera_dead_zone_depth": CAMERA_DEPTH_LIMIT,
		"together_ratio": snappedf(together_ratio, 0.001),
		"max_companion_separation": snappedf(max_companion_separation, 0.01),
		"visited_shared_stops": visited_shared_stops,
		"visited_landmarks": visited_landmarks,
		"player_position": [player.global_position.x, player.global_position.y, player.global_position.z]
	}
	var stamp := int(Time.get_unix_time_from_system())
	last_export_path = "user://diorama-environment-v001-trace-%d.json" % stamp
	var file := FileAccess.open(last_export_path, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(trace, "  "))
		_set_caption("Trace saved. Godot path: %s" % last_export_path)
	else:
		_set_caption("Trace export failed; the playtest can still be reviewed from your feedback.")

func _flat_distance(a: Vector3, b: Vector3) -> float:
	return Vector2(a.x, a.z).distance_to(Vector2(b.x, b.z))

func _make_strip(points: Array, width: float, height: float, color: Color) -> void:
	for i in range(points.size() - 1):
		var a: Vector3 = points[i]
		var b: Vector3 = points[i + 1]
		var delta := b - a
		var length := Vector2(delta.x, delta.z).length()
		var midpoint := (a + b) * 0.5
		var segment := _mesh_box(midpoint + Vector3(0.0, height * 0.5, 0.0), Vector3(width, height, length + 0.35), color)
		segment.rotation.y = atan2(delta.x, delta.z)

func _building(node_name: String, position: Vector3, size: Vector3, color: Color, collision: bool) -> void:
	_box(node_name, position, size, color, collision)
	var roof := _mesh_box(position + Vector3(0.0, size.y * 0.5 + 0.18, 0.0), Vector3(size.x + 0.35, 0.28, size.z + 0.35), color.lightened(0.12))
	roof.name = node_name + "Roof"

func _box(node_name: String, position: Vector3, size: Vector3, color: Color, collision: bool) -> Node3D:
	if not collision:
		var mesh_only := _mesh_box(position, size, color)
		mesh_only.name = node_name
		return mesh_only

	var body := StaticBody3D.new()
	body.name = node_name
	body.collision_layer = 1
	body.collision_mask = 0
	body.position = position
	add_child(body)

	var mesh_instance := MeshInstance3D.new()
	var box_mesh := BoxMesh.new()
	box_mesh.size = size
	mesh_instance.mesh = box_mesh
	mesh_instance.material_override = _material(color)
	body.add_child(mesh_instance)

	var collision_shape := CollisionShape3D.new()
	var shape := BoxShape3D.new()
	shape.size = size
	collision_shape.shape = shape
	body.add_child(collision_shape)
	return body

func _mesh_box(position: Vector3, size: Vector3, color: Color) -> MeshInstance3D:
	var mesh_instance := MeshInstance3D.new()
	var mesh := BoxMesh.new()
	mesh.size = size
	mesh_instance.mesh = mesh
	mesh_instance.position = position
	mesh_instance.material_override = _material(color)
	add_child(mesh_instance)
	return mesh_instance

func _prop_box(node_name: String, position: Vector3, size: Vector3, color: Color) -> void:
	var prop := _mesh_box(position, size, color)
	prop.name = node_name

func _tree(position: Vector3, scale_factor: float) -> void:
	var trunk := _mesh_box(position + Vector3(0.0, 1.0, 0.0), Vector3(0.45, 2.0, 0.45) * scale_factor, Color("#665542"))
	trunk.name = "TreeTrunk"
	var crown := MeshInstance3D.new()
	var sphere := SphereMesh.new()
	sphere.radius = 1.25 * scale_factor
	sphere.height = 2.5 * scale_factor
	crown.mesh = sphere
	crown.position = position + Vector3(0.0, 2.55 * scale_factor, 0.0)
	crown.material_override = _material(Color("#66805f"))
	add_child(crown)

func _fence_line(a: Vector3, b: Vector3, posts: int) -> void:
	for i in range(posts):
		var t := float(i) / float(maxi(1, posts - 1))
		var p := a.lerp(b, t)
		_prop_box("FencePost", p + Vector3(0.0, 0.65, 0.0), Vector3(0.12, 1.3, 0.12), Color("#62645c"))
	var delta := b - a
	var length := Vector2(delta.x, delta.z).length()
	var rail := _mesh_box((a + b) * 0.5 + Vector3(0.0, 0.72, 0.0), Vector3(0.10, 0.12, length), Color("#62645c"))
	rail.rotation.y = atan2(delta.x, delta.z)

func _spawn_argument_pair(position: Vector3) -> void:
	var first := _dummy_npc("NPC_A", position + Vector3(-0.75, 0.0, 0.0), Color("#6f7b8c"))
	var second := _dummy_npc("NPC_B", position + Vector3(0.75, 0.0, 0.0), Color("#9a6f59"))
	first.look_at(second.global_position + Vector3(0.0, 1.0, 0.0), Vector3.UP)
	second.look_at(first.global_position + Vector3(0.0, 1.0, 0.0), Vector3.UP)
	var marker := Label3D.new()
	marker.text = "…"
	marker.font_size = 44
	marker.outline_size = 8
	marker.position = position + Vector3(0.0, 2.7, 0.0)
	marker.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	add_child(marker)

func _dummy_npc(node_name: String, position: Vector3, color: Color) -> Node3D:
	var root := Node3D.new()
	root.name = node_name
	root.position = position
	add_child(root)
	var body := MeshInstance3D.new()
	var capsule := CapsuleMesh.new()
	capsule.radius = 0.31
	capsule.height = 1.45
	body.mesh = capsule
	body.position.y = 0.73
	body.material_override = _material(color)
	root.add_child(body)
	return root

func _label_3d(text: String, position: Vector3, yaw_degrees: float) -> void:
	var label := Label3D.new()
	label.text = text
	label.font_size = 30
	label.outline_size = 7
	label.position = position
	label.rotation_degrees.y = yaw_degrees
	label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	add_child(label)

func _material(color: Color) -> StandardMaterial3D:
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.88
	return mat
