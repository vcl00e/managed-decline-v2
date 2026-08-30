"""Generate Managed Decline diorama-art-pipeline-v001 modular prototype assets.

Run from the prototype root:
    blender --background --factory-startup --python assets/source/blender/generate_art_kit.py

The script saves a .blend source file beside itself and exports one embedded glTF per reusable asset.
"""
from __future__ import annotations

import math
from pathlib import Path
import bpy

ROOT = Path(__file__).resolve().parents[2]
EXPORT = ROOT / "export"
SOURCE = Path(__file__).resolve().parent
EXPORT.mkdir(parents=True, exist_ok=True)

PALETTE = {
    "brick": (0.50, 0.25, 0.18, 1.0),
    "brick_light": (0.64, 0.34, 0.24, 1.0),
    "cream": (0.79, 0.72, 0.58, 1.0),
    "shop_green": (0.20, 0.34, 0.30, 1.0),
    "glass": (0.32, 0.50, 0.55, 1.0),
    "dark": (0.12, 0.14, 0.15, 1.0),
    "roof": (0.22, 0.20, 0.18, 1.0),
    "asphalt": (0.18, 0.19, 0.20, 1.0),
    "pavement": (0.49, 0.47, 0.43, 1.0),
    "kerb": (0.66, 0.64, 0.60, 1.0),
    "grass": (0.27, 0.42, 0.23, 1.0),
    "wood": (0.33, 0.22, 0.13, 1.0),
    "metal": (0.23, 0.25, 0.25, 1.0),
    "bin_green": (0.12, 0.27, 0.18, 1.0),
    "leaf": (0.22, 0.38, 0.18, 1.0),
    "leaf2": (0.30, 0.46, 0.22, 1.0),
    "yellow": (0.78, 0.57, 0.10, 1.0),
}


def reset() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for collection in list(bpy.data.collections):
        if collection.name != "Collection":
            bpy.data.collections.remove(collection)
    base = bpy.data.collections.get("Collection")
    if base:
        base.name = "WORK"


def material(name: str, roughness: float = 0.85, metallic: float = 0.0, emission=None):
    key = f"MD_{name}_{roughness:.2f}_{metallic:.2f}"
    existing = bpy.data.materials.get(key)
    if existing:
        return existing
    m = bpy.data.materials.new(key)
    m.diffuse_color = PALETTE[name]
    m.use_nodes = True
    m.use_backface_culling = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = PALETTE[name]
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
        if emission is not None:
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = emission
                bsdf.inputs["Emission Strength"].default_value = 1.0
    return m


def collection(name: str):
    c = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(c)
    return c


def move_to_collection(obj, c) -> None:
    for old in list(obj.users_collection):
        old.objects.unlink(obj)
    c.objects.link(obj)


def cube(c, name, size, loc, mat_name, rot=(0,0,0), rough=0.85, metallic=0.0):
    bpy.ops.mesh.primitive_cube_add(location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(material(mat_name, rough, metallic))
    move_to_collection(o, c)
    return o


def cylinder(c, name, radius, depth, loc, mat_name, vertices=16, metallic=0.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    o = bpy.context.object
    o.name = name
    o.data.materials.append(material(mat_name, 0.78, metallic))
    move_to_collection(o, c)
    return o


def ico(c, name, radius, loc, mat_name, scale=(1,1,1)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=radius, location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(material(mat_name, 0.95))
    move_to_collection(o, c)
    return o


def create_corner_shop():
    c = collection("corner_shop")
    cube(c,"ShopShell",(6.8,4.8,3.4),(0,0,1.7),"cream")
    cube(c,"FlatRoof",(6.95,4.95,0.32),(0,0,3.48),"roof")
    cube(c,"Fascia",(6.95,0.16,0.72),(0,-2.48,2.45),"shop_green")
    cube(c,"Awning",(5.8,0.8,0.16),(0,-2.82,2.04),"shop_green")
    cube(c,"WindowL",(2.55,0.10,1.45),(-1.55,-2.44,1.18),"glass",rough=0.22)
    cube(c,"WindowR",(1.65,0.10,1.45),(1.08,-2.44,1.18),"glass",rough=0.22)
    cube(c,"Door",(0.98,0.12,2.15),(2.55,-2.45,1.18),"dark")
    for x in (-2.83,-0.27,0.26,1.91,3.07):
        cube(c,"Frame",(0.08,0.12,1.62),(x,-2.51,1.18),"dark")
    cube(c,"ShopSignPanel",(3.3,0.10,0.26),(-0.5,-2.57,2.55),"cream",rough=0.6)
    cube(c,"SideExtension",(1.1,4.9,2.6),(3.85,0,1.30),"brick_light")
    cylinder(c,"Drainpipe",0.07,3.2,(3.38,-2.45,1.6),"metal",12,0.25)
    cylinder(c,"Vent1",0.12,0.42,(-1.6,0.8,3.85),"metal",12,0.3)
    cylinder(c,"Vent2",0.12,0.42,(1.3,1.4,3.85),"metal",12,0.3)
    return c


def create_terrace():
    c = collection("terrace_end")
    cube(c,"TerraceBody",(4.8,5.2,3.2),(0,0,1.6),"brick")
    cube(c,"RoofA",(5.15,3.15,0.22),(0,-1.1,3.78),"roof",rot=(math.radians(31),0,0))
    cube(c,"RoofB",(5.15,3.15,0.22),(0,1.1,3.78),"roof",rot=(math.radians(-31),0,0))
    for x in (-1.25,1.05):
        cube(c,"UpperWindow",(1.0,0.10,0.95),(x,-2.64,2.15),"glass",rough=0.25)
        cube(c,"LowerWindow",(1.0,0.10,1.05),(x,-2.64,0.95),"glass",rough=0.25)
    cube(c,"FrontDoor",(0.95,0.12,2.0),(0.1,-2.65,1.02),"shop_green")
    for x in (-1.25,1.05):
        for z in (0.38,1.62):
            cube(c,"WindowSill",(1.18,0.24,0.10),(x,-2.73,z),"cream")
    cube(c,"Chimney",(0.52,0.62,1.15),(-1.4,0.55,4.15),"brick")
    cylinder(c,"SatelliteDish",0.28,0.08,(2.15,0.8,3.25),"metal",18,0.3)
    cube(c,"FrontWall",(4.9,0.28,0.65),(0,-3.35,0.32),"brick_light")
    return c


def arc_mesh(c, name, r0, r1, a0, a1, z, mat_name, segments=36):
    verts=[]; faces=[]
    for i in range(segments+1):
        a=a0+(a1-a0)*i/segments
        verts += [(math.cos(a)*r0, math.sin(a)*r0, z),(math.cos(a)*r1,math.sin(a)*r1,z)]
    for i in range(segments):
        j=i*2
        faces += [(j,j+1,j+3),(j,j+3,j+2)]
    mesh=bpy.data.meshes.new(name+"Mesh")
    mesh.from_pydata(verts,[],faces); mesh.update()
    o=bpy.data.objects.new(name,mesh); c.objects.link(o)
    o.data.materials.append(material(mat_name))
    return o


def create_street():
    c=collection("street_bend")
    a0=math.radians(-115); a1=math.radians(20)
    arc_mesh(c,"Road",6.2,10.0,a0,a1,0.04,"asphalt")
    arc_mesh(c,"InnerPavement",4.7,6.2,a0,a1,0.08,"pavement")
    arc_mesh(c,"OuterPavement",10.0,11.8,a0,a1,0.08,"pavement")
    arc_mesh(c,"InnerKerb",6.05,6.2,a0,a1,0.10,"kerb")
    arc_mesh(c,"OuterKerb",10.0,10.15,a0,a1,0.10,"kerb")
    arc_mesh(c,"YellowLine1",9.55,9.62,a0,a1,0.105,"yellow")
    arc_mesh(c,"YellowLine2",9.35,9.42,a0,a1,0.105,"yellow")
    return c


def create_green():
    c=collection("green_edge")
    cube(c,"GrassPatch",(11.0,7.0,0.16),(0,0,0.08),"grass")
    cube(c,"LowWall",(11.0,0.26,0.48),(0,-3.38,0.24),"brick_light")
    for x in [(-5.1+i*10.2/8) for i in range(9)]:
        cube(c,"RailPost",(0.10,0.10,0.92),(x,-3.38,0.78),"metal",metallic=0.25)
    cube(c,"RailTop",(10.4,0.10,0.10),(0,-3.38,1.14),"metal",metallic=0.25)
    return c


def create_bench():
    c=collection("bench")
    cube(c,"Seat",(2.2,0.46,0.16),(0,0,0.62),"wood")
    cube(c,"Back1",(2.2,0.14,0.18),(0,0.22,1.08),"wood")
    cube(c,"Back2",(2.2,0.14,0.18),(0,0.22,1.32),"wood")
    for x in (-0.85,0.85): cube(c,"Leg",(0.14,0.14,0.72),(x,0,0.36),"metal",metallic=0.35)
    return c


def create_bin():
    c=collection("wheelie_bin")
    cube(c,"BinBody",(0.62,0.68,0.92),(0,0,0.48),"bin_green")
    cube(c,"BinLid",(0.68,0.75,0.12),(0,-0.03,0.99),"dark")
    for x in (-0.24,0.24):
        cylinder(c,"Wheel",0.10,0.12,(x,0.31,0.12),"dark",14)
    return c


def create_lamp():
    c=collection("lamp_post")
    cylinder(c,"Pole",0.09,3.7,(0,0,1.85),"metal",16,0.55)
    cube(c,"LampHousing",(0.52,0.28,0.18),(0.20,0,3.52),"metal",metallic=0.55)
    cube(c,"LampLens",(0.34,0.22,0.07),(0.28,0,3.42),"cream",rough=0.35)
    return c


def create_tree():
    c=collection("tree")
    cylinder(c,"Trunk",0.22,2.2,(0,0,1.1),"wood",12)
    ico(c,"CrownA",1.25,(0,0,2.8),"leaf",(1.0,0.95,0.82))
    ico(c,"CrownB",0.90,(0.75,0.15,3.0),"leaf2",(1.0,1.0,0.9))
    ico(c,"CrownC",0.78,(-0.68,-0.15,2.95),"leaf2",(0.9,1.0,0.95))
    return c


def export_collection(c, filename):
    bpy.ops.object.select_all(action="DESELECT")
    for o in c.all_objects:
        o.select_set(True)
    bpy.context.view_layer.objects.active = next(iter(c.all_objects), None)
    bpy.ops.export_scene.gltf(
        filepath=str(EXPORT / filename),
        export_format="GLTF_EMBEDDED",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_normals=True,
        export_cameras=False,
        export_lights=False,
    )


def main():
    reset()
    creators = [
        (create_corner_shop, "corner_shop.gltf"),
        (create_terrace, "terrace_end.gltf"),
        (create_street, "street_bend.gltf"),
        (create_green, "green_edge.gltf"),
        (create_bench, "bench.gltf"),
        (create_bin, "wheelie_bin.gltf"),
        (create_lamp, "lamp_post.gltf"),
        (create_tree, "tree.gltf"),
    ]
    built=[]
    for create, filename in creators:
        c=create(); built.append((c,filename))
    bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE / "managed_decline_art_kit.blend"))
    for c,filename in built:
        export_collection(c,filename)
    print(f"Generated {len(built)} Managed Decline prototype assets in {EXPORT}")

if __name__ == "__main__":
    main()
