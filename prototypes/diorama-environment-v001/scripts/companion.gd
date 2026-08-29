extends Node3D

@export var follow_distance: float = 1.75
@export var catchup_distance: float = 4.0
@export var normal_speed: float = 4.5
@export var catchup_speed: float = 6.2

var player
var current_speed: float = 0.0
var separation: float = 0.0

func _ready() -> void:
	name = "TabithaProxy"
	_build_body()

func _physics_process(delta: float) -> void:
	if player == null:
		return

	var move_dir: Vector3 = player.last_move_dir
	var side := Vector3(-move_dir.z, 0.0, move_dir.x) * 0.62
	var target: Vector3 = player.global_position - move_dir * follow_distance + side
	target.y = global_position.y

	var offset := target - global_position
	separation = global_position.distance_to(player.global_position)
	if offset.length() < 0.22:
		current_speed = move_toward(current_speed, 0.0, delta * 8.0)
		return

	var speed := normal_speed if separation < catchup_distance else catchup_speed
	current_speed = move_toward(current_speed, speed, delta * 8.0)
	var step := minf(offset.length(), current_speed * delta)
	var direction := offset.normalized()
	global_position += direction * step
	if direction.length_squared() > 0.001:
		rotation.y = lerp_angle(rotation.y, atan2(direction.x, direction.z), minf(1.0, delta * 10.0))

	# This is a spatial companionship experiment, not a pathfinding experiment.
	# If the proxy ever becomes genuinely detached, restore shared presence rather
	# than making the player chase it across a greybox.
	if separation > 8.0:
		global_position = player.global_position - move_dir * 2.1 + side

func _build_body() -> void:
	var body := MeshInstance3D.new()
	var mesh := CapsuleMesh.new()
	mesh.radius = 0.32
	mesh.height = 1.50
	body.mesh = mesh
	body.position.y = 0.75
	body.material_override = _material(Color("#8b5f78"))
	add_child(body)

	var hair := MeshInstance3D.new()
	var hair_mesh := SphereMesh.new()
	hair_mesh.radius = 0.37
	hair_mesh.height = 0.74
	hair.mesh = hair_mesh
	hair.position = Vector3(0.0, 1.47, 0.0)
	hair.material_override = _material(Color("#3c3135"))
	add_child(hair)

	var label := Label3D.new()
	label.text = "Tabitha"
	label.font_size = 32
	label.outline_size = 8
	label.position = Vector3(0.0, 2.20, 0.0)
	label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	add_child(label)

func _material(color: Color) -> StandardMaterial3D:
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.9
	return mat
