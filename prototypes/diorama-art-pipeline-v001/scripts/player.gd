extends CharacterBody3D

@export var move_speed: float = 4.2
@export var acceleration: float = 18.0

var last_move_dir: Vector3 = Vector3(0.0, 0.0, -1.0)
var planar_speed: float = 0.0
var visual_root: Node3D
var body_mesh: MeshInstance3D
var xray_material: StandardMaterial3D

func _ready() -> void:
	collision_layer = 2
	collision_mask = 1
	_build_body()

func _physics_process(delta: float) -> void:
	var input_2d: Vector2 = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var wasd: Vector2 = Vector2(
		(1.0 if Input.is_physical_key_pressed(KEY_D) else 0.0) - (1.0 if Input.is_physical_key_pressed(KEY_A) else 0.0),
		(1.0 if Input.is_physical_key_pressed(KEY_S) else 0.0) - (1.0 if Input.is_physical_key_pressed(KEY_W) else 0.0)
	)
	if wasd.length_squared() > 0.001:
		input_2d = wasd.normalized()

	var active_camera: Camera3D = get_viewport().get_camera_3d()
	var camera_forward: Vector3 = Vector3(0.0, 0.0, -1.0)
	var camera_right: Vector3 = Vector3(1.0, 0.0, 0.0)
	if active_camera != null:
		camera_forward = -active_camera.global_transform.basis.z
		camera_forward.y = 0.0
		if camera_forward.length_squared() > 0.001:
			camera_forward = camera_forward.normalized()
		camera_right = active_camera.global_transform.basis.x
		camera_right.y = 0.0
		if camera_right.length_squared() > 0.001:
			camera_right = camera_right.normalized()

	var direction: Vector3 = camera_right * input_2d.x + camera_forward * -input_2d.y
	if direction.length_squared() > 0.001:
		direction = direction.normalized()
		last_move_dir = direction

	var desired: Vector3 = direction * move_speed
	velocity.x = move_toward(velocity.x, desired.x, acceleration * delta)
	velocity.z = move_toward(velocity.z, desired.z, acceleration * delta)
	if not is_on_floor():
		velocity.y -= 24.0 * delta
	else:
		velocity.y = -0.5

	planar_speed = Vector2(velocity.x, velocity.z).length()
	move_and_slide()

	if direction.length_squared() > 0.001:
		visual_root.rotation.y = lerp_angle(visual_root.rotation.y, atan2(direction.x, direction.z), minf(1.0, delta * 12.0))

func set_xray(enabled: bool, strong: bool = false) -> void:
	if body_mesh == null:
		return
	if enabled:
		var c: Color = xray_material.albedo_color
		c.a = 0.38 if strong else 0.28
		xray_material.albedo_color = c
		body_mesh.material_overlay = xray_material
	else:
		body_mesh.material_overlay = null

func _build_body() -> void:
	var collision: CollisionShape3D = CollisionShape3D.new()
	var shape: CapsuleShape3D = CapsuleShape3D.new()
	shape.radius = 0.34
	shape.height = 1.58
	collision.shape = shape
	collision.position.y = 0.79
	add_child(collision)

	visual_root = Node3D.new()
	visual_root.name = "Visual"
	add_child(visual_root)

	body_mesh = MeshInstance3D.new()
	var mesh: CapsuleMesh = CapsuleMesh.new()
	mesh.radius = 0.32
	mesh.height = 1.48
	body_mesh.mesh = mesh
	body_mesh.position.y = 0.74
	body_mesh.material_override = _material(Color("#335f72"))
	visual_root.add_child(body_mesh)

	var head: MeshInstance3D = MeshInstance3D.new()
	var head_mesh: SphereMesh = SphereMesh.new()
	head_mesh.radius = 0.25
	head_mesh.height = 0.50
	head.mesh = head_mesh
	head.position = Vector3(0.0, 1.52, 0.0)
	head.material_override = _material(Color("#c89d79"))
	visual_root.add_child(head)

	xray_material = StandardMaterial3D.new()
	xray_material.albedo_color = Color(0.97, 0.82, 0.32, 0.28)
	xray_material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	xray_material.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	xray_material.no_depth_test = true
	xray_material.cull_mode = BaseMaterial3D.CULL_DISABLED

func _material(color: Color) -> StandardMaterial3D:
	var material: StandardMaterial3D = StandardMaterial3D.new()
	material.albedo_color = color
	material.roughness = 0.82
	return material
