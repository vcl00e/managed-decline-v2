extends CharacterBody3D

@export var move_speed: float = 4.2
@export var acceleration: float = 18.0

var last_move_dir := Vector3(0.0, 0.0, -1.0)
var planar_speed: float = 0.0

func _ready() -> void:
	name = "Player"
	collision_layer = 2
	collision_mask = 1
	_build_body()

func _physics_process(delta: float) -> void:
	var input_2d := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var wasd := Vector2(
		(1.0 if Input.is_physical_key_pressed(KEY_D) else 0.0) - (1.0 if Input.is_physical_key_pressed(KEY_A) else 0.0),
		(1.0 if Input.is_physical_key_pressed(KEY_S) else 0.0) - (1.0 if Input.is_physical_key_pressed(KEY_W) else 0.0)
	)
	if wasd.length_squared() > 0.001:
		input_2d = wasd.normalized()

	# Movement is screen-relative for the fixed isometric-ish camera.
	var camera_forward := Vector3(-0.656, 0.0, -0.755)
	var camera_right := Vector3(0.755, 0.0, -0.656)
	var direction := camera_right * input_2d.x + camera_forward * -input_2d.y
	if direction.length_squared() > 0.001:
		direction = direction.normalized()
		last_move_dir = direction

	var desired := direction * move_speed
	velocity.x = move_toward(velocity.x, desired.x, acceleration * delta)
	velocity.z = move_toward(velocity.z, desired.z, acceleration * delta)
	if not is_on_floor():
		velocity.y -= 24.0 * delta
	else:
		velocity.y = -0.5

	planar_speed = Vector2(velocity.x, velocity.z).length()
	move_and_slide()

	if direction.length_squared() > 0.001:
		rotation.y = lerp_angle(rotation.y, atan2(direction.x, direction.z), minf(1.0, delta * 12.0))

func _build_body() -> void:
	var collision := CollisionShape3D.new()
	var shape := CapsuleShape3D.new()
	shape.radius = 0.38
	shape.height = 1.65
	collision.shape = shape
	collision.position.y = 0.83
	add_child(collision)

	var body := MeshInstance3D.new()
	var mesh := CapsuleMesh.new()
	mesh.radius = 0.34
	mesh.height = 1.55
	body.mesh = mesh
	body.position.y = 0.78
	body.material_override = _material(Color("#2f5d73"))
	add_child(body)

	var marker := MeshInstance3D.new()
	var marker_mesh := BoxMesh.new()
	marker_mesh.size = Vector3(0.16, 0.12, 0.48)
	marker.mesh = marker_mesh
	marker.position = Vector3(0.0, 1.42, 0.30)
	marker.material_override = _material(Color("#f4eee2"))
	add_child(marker)

func _material(color: Color) -> StandardMaterial3D:
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.9
	return mat
