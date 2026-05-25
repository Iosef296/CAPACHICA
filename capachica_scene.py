"""
╔══════════════════════════════════════════════════════════════╗
║   CAPACHICA TURISMO — Generador de escena 3D para Blender   ║
║                                                              ║
║  INSTRUCCIONES (5 pasos):                                    ║
║  1. Abre Blender                                             ║
║  2. Clic en la pestaña "Scripting" (arriba del todo)         ║
║  3. Clic en "+ New" para crear un script nuevo               ║
║  4. Pega todo este código                                    ║
║  5. Clic en ▶ "Run Script"                                   ║
║                                                              ║
║  El script genera toda la escena y exporta capachica.glb     ║
║  automáticamente a ~/SISTEMAS/CAPACHICA/frontend/            ║
╚══════════════════════════════════════════════════════════════╝
"""

import bpy
import bmesh
import math
import random
import os

random.seed(42)

# ── Limpiar escena ────────────────────────────────────────────────────────────
print("\n🌍 Generando mundo Capachica...")
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
for block in list(bpy.data.meshes):    bpy.data.meshes.remove(block)
for block in list(bpy.data.materials): bpy.data.materials.remove(block)

# ── Constantes (iguales al Three.js) ─────────────────────────────────────────
WORLD   = 150
WATER_Y = -1.5
SEGS    = 80   # resolución del terreno (80 = buen detalle, 120 = ultra)

# ── Función de altura idéntica al Three.js ────────────────────────────────────
def get_h(x, z):
    ex, ez = x / 60, z / 52
    d2 = ex*ex + ez*ez
    if d2 >= 1.0:
        return WATER_Y - 0.5
    mask = 1.0 - d2
    mask = mask * mask * (3 - 2 * mask)

    h  = math.sin(x*0.18 + z*0.13) * 1.9
    h += math.sin(x*0.34 - z*0.26) * 0.95
    h += math.sin(x*0.60 + z*0.49) * 0.52
    h += math.sin(x*1.10 - z*0.82) * 0.24
    h += math.cos(x*0.22 + z*0.31) * 0.85
    h += math.cos(x*0.45 - z*0.55) * 0.40

    mx, mz = x + 5, z + 16
    h += max(0, 5.0 - math.sqrt(mx*mx + mz*mz) * 0.40)
    r2x, r2z = x - 18, z + 4
    h += max(0, 2.4 - math.sqrt(r2x*r2x + r2z*r2z) * 0.24)

    h *= mask
    h += max(0, 1.0 - d2 * 1.7) * 0.22
    return h

# Nota de coordenadas:
# Blender usa Z-arriba. Al exportar a GLTF (Y-arriba para Three.js):
#   Blender (x, -z_three, h) → Three.js (x, h, z_three)
# Por eso usamos location=(x, -z, h) en todo el script.

# ── Materiales Principled BSDF ────────────────────────────────────────────────
def make_mat(name, rgb, roughness=0.8, metallic=0.0, emission_rgb=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    out  = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value  = (*rgb, 1.0)
    bsdf.inputs['Roughness'].default_value   = roughness
    bsdf.inputs['Metallic'].default_value    = metallic
    if emission_rgb:
        # Blender 4.x renombró 'Emission' → 'Emission Color'
        emit_key = 'Emission Color' if 'Emission Color' in bsdf.inputs else 'Emission'
        bsdf.inputs[emit_key].default_value        = (*emission_rgb, 1.0)
        bsdf.inputs['Emission Strength'].default_value = emission_strength
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

# Paleta dark-teal (igual al Three.js)
M = {
    'water':   make_mat('water',   (0.02,0.16,0.13), roughness=0.05, metallic=0.15),
    'sand':    make_mat('sand',    (0.72,0.58,0.33)),
    'grass':   make_mat('grass',   (0.12,0.36,0.16)),
    'high':    make_mat('high',    (0.09,0.24,0.10)),
    'rock':    make_mat('rock',    (0.23,0.21,0.20)),
    'trunk':   make_mat('trunk',   (0.29,0.18,0.09)),
    'foliage': make_mat('foliage', (0.14,0.42,0.14)),
    'wall':    make_mat('wall',    (0.77,0.63,0.40)),
    'roof':    make_mat('roof',    (0.55,0.23,0.10)),
    'door':    make_mat('door',    (0.36,0.18,0.06)),
    'window':  make_mat('window',  (0.83,0.90,0.95), roughness=0.05),
    'dock':    make_mat('dock',    (0.55,0.42,0.08)),
    'boat':    make_mat('boat',    (0.83,0.66,0.20)),
    'reed':    make_mat('reed',    (0.55,0.68,0.13)),
    'poi':     make_mat('poi',     (0.98,0.75,0.14), roughness=0.15, metallic=0.6,
                        emission_rgb=(0.98,0.65,0.04), emission_strength=1.2),
}

# ── 1. TERRENO con vertex colors ──────────────────────────────────────────────
print("  → Terreno...")

bm = bmesh.new()
color_layer = bm.loops.layers.color.new("Col")
verts = []

for iz in range(SEGS + 1):
    row = []
    for ix in range(SEGS + 1):
        x  = (ix / SEGS - 0.5) * WORLD
        z  = (iz / SEGS - 0.5) * WORLD
        h  = get_h(x, z)
        # location=(x, -z, h) → Three.js (x, h, z) tras exportar
        v = bm.verts.new((x, -z, h))
        row.append(v)
    verts.append(row)

bm.verts.ensure_lookup_table()

for iz in range(SEGS):
    for ix in range(SEGS):
        v0 = verts[iz][ix]
        v1 = verts[iz][ix+1]
        v2 = verts[iz+1][ix+1]
        v3 = verts[iz+1][ix]
        try:
            face = bm.faces.new([v0,v1,v2,v3])
            avg_h = (v0.co.z + v1.co.z + v2.co.z + v3.co.z) / 4
            if avg_h < WATER_Y + 0.35: c = (0.72,0.58,0.33,1)
            elif avg_h < 0.55:         c = (0.72,0.58,0.33,1)
            elif avg_h < 1.9:          c = (0.12,0.36,0.16,1)
            elif avg_h < 3.4:          c = (0.09,0.24,0.10,1)
            else:                      c = (0.23,0.21,0.20,1)
            for loop in face.loops:
                loop[color_layer] = c
        except Exception:
            pass

bm.normal_update()
terrain_mesh = bpy.data.meshes.new("terrain_mesh")
bm.to_mesh(terrain_mesh)
bm.free()

terrain_obj = bpy.data.objects.new("Terrain", terrain_mesh)
bpy.context.collection.objects.link(terrain_obj)

# Material con vertex colors para que se exporte en el GLB
mat_vc = bpy.data.materials.new("terrain_vc")
mat_vc.use_nodes = True
n = mat_vc.node_tree.nodes
l = mat_vc.node_tree.links
n.clear()
out  = n.new('ShaderNodeOutputMaterial')
bsdf = n.new('ShaderNodeBsdfPrincipled')
vc   = n.new('ShaderNodeVertexColor')
vc.layer_name = "Col"
bsdf.inputs['Roughness'].default_value = 0.85
l.new(vc.outputs['Color'],  bsdf.inputs['Base Color'])
l.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
terrain_obj.data.materials.append(mat_vc)

# ── 2. AGUA ───────────────────────────────────────────────────────────────────
print("  → Agua...")
bpy.ops.mesh.primitive_plane_add(size=240, location=(0, 0, WATER_Y))
water_obj = bpy.context.active_object
water_obj.name = "Water"
water_obj.data.materials.append(M['water'])

# ── 3. ÁRBOLES ────────────────────────────────────────────────────────────────
print("  → Árboles...")

def add_tree(x, z):
    h = get_h(x, z)
    if h < 0.35 or h > 4.2:
        return
    tree_h = 0.75 + random.random() * 0.55
    ry     = random.random() * math.pi * 2
    fs     = 0.85 + random.random() * 0.3

    # Tronco
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.09, depth=tree_h, vertices=5,
        location=(x, -z, h + tree_h/2),
        rotation=(0, 0, ry)
    )
    t = bpy.context.active_object
    t.name = "Tree_trunk"
    t.data.materials.append(M['trunk'])

    # Copa
    bpy.ops.mesh.primitive_cone_add(
        radius1=0.55*fs, depth=1.2*fs, vertices=5,
        location=(x, -z, h + tree_h + 0.3*fs),
        rotation=(0, 0, ry)
    )
    f = bpy.context.active_object
    f.name = "Tree_foliage"
    f.data.materials.append(M['foliage'])

spots = []
for _ in range(22): spots.append((-32+random.random()*22, -24+random.random()*48))
for _ in range(18): spots.append(( 12+random.random()*22, -22+random.random()*44))
for _ in range(15): spots.append((-14+random.random()*22, -34+random.random()*22))
for sx, sz in spots:
    add_tree(sx, sz)

# ── 4. CASAS ─────────────────────────────────────────────────────────────────
print("  → Pueblo...")

def add_house(x, z, ry):
    h = get_h(x, z)
    if h < 0.2:
        return
    # Cuerpo
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, -z, h + 0.5))
    body = bpy.context.active_object
    body.scale = (1.4, 1.1, 1.0)
    body.rotation_euler.z = ry
    bpy.ops.object.transform_apply(scale=True, rotation=False, location=False)
    body.name = "House_body"
    body.data.materials.append(M['wall'])

    # Techo
    bpy.ops.mesh.primitive_cone_add(
        radius1=1.12, depth=0.72, vertices=4,
        location=(x, -z, h + 1.35),
        rotation=(0, 0, ry + math.pi/4)
    )
    roof = bpy.context.active_object
    roof.name = "House_roof"
    roof.data.materials.append(M['roof'])

    # Puerta
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, -z + 0.565, h + 0.19))
    door = bpy.context.active_object
    door.scale    = (0.22, 0.06, 0.38)
    door.rotation_euler.z = ry
    bpy.ops.object.transform_apply(scale=True, rotation=False, location=False)
    door.name = "House_door"
    door.data.materials.append(M['door'])

    # Ventana
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x + 0.45, -z + 0.565, h + 0.42))
    win = bpy.context.active_object
    win.scale   = (0.28, 0.06, 0.22)
    win.rotation_euler.z = ry
    bpy.ops.object.transform_apply(scale=True, rotation=False, location=False)
    win.name = "House_window"
    win.data.materials.append(M['window'])

houses = [
    ( 2,  8,  0.3), ( 5, 10, -0.5), (-2, 10,  1.1), ( 8,  6, -0.8),
    (-5,  6,  0.6), ( 2, 14,  1.5), ( 7, 14,  0.1), (-3, 14, -0.4),
]
for hx, hz, ry in houses:
    add_house(hx, hz, ry)

# ── 5. MUELLE, BOTE, TOTORAS ─────────────────────────────────────────────────
print("  → Muelle y bote...")

# Muelle
bpy.ops.mesh.primitive_cube_add(size=1, location=(36, -2, get_h(36,2)+0.06))
pier = bpy.context.active_object
pier.scale = (0.3, 4.0, 0.12)
pier.rotation_euler.z = 0.22
bpy.ops.object.transform_apply(scale=True, rotation=False, location=False)
pier.name = "Pier"
pier.data.materials.append(M['dock'])

# Bote
bpy.ops.mesh.primitive_cube_add(size=1, location=(38, -3, WATER_Y+0.12))
boat = bpy.context.active_object
boat.scale = (1.7, 0.65, 0.35)
boat.rotation_euler.z = 0.5
bpy.ops.object.transform_apply(scale=True, rotation=False, location=False)
boat.name = "Boat"
boat.data.materials.append(M['boat'])

# Mástil
bpy.ops.mesh.primitive_cylinder_add(
    radius=0.04, depth=1.5, vertices=5,
    location=(38, -3, WATER_Y + 0.9)
)
mast = bpy.context.active_object
mast.name = "Mast"
mast.data.materials.append(M['dock'])

# Totoras
for _ in range(14):
    rx = 24 + random.random()*12
    rz = -6 + random.random()*12
    rh = 0.4 + random.random()*0.9
    tilt = (random.random()-0.5)*0.28
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.05, depth=rh, vertices=4,
        location=(rx, -rz, WATER_Y + rh/2),
        rotation=(tilt, 0, random.random()*math.pi*2)
    )
    reed = bpy.context.active_object
    reed.name = "Reed"
    reed.data.materials.append(M['reed'])

# ── 6. MARCADORES POI ─────────────────────────────────────────────────────────
print("  → Marcadores POI...")

POIS = [
    {'x': 33,  'z': 4,   'n': 'Llachon'},
    {'x': -5,  'z': -18, 'n': 'Mirador'},
    {'x': 2,   'z': 10,  'n': 'Capachica'},
    {'x': 0,   'z': -42, 'n': 'Ticonata'},
    {'x': -28, 'z': 18,  'n': 'Atardecer'},
]
for p in POIS:
    ty = max(get_h(p['x'], p['z']) + 0.55, WATER_Y + 1.8)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.45, minor_radius=0.12,
        major_segments=22, minor_segments=8,
        location=(p['x'], -p['z'], ty)
    )
    poi = bpy.context.active_object
    poi.name = f"POI_{p['n']}"
    poi.data.materials.append(M['poi'])

# ── 7. LUZ AMBIENTE ───────────────────────────────────────────────────────────
bpy.ops.object.light_add(type='SUN', location=(30, -20, 25))
sun = bpy.context.active_object
sun.data.energy = 3.0
sun.data.color  = (1.0, 0.93, 0.70)
sun.name = "Sun"

bpy.ops.object.light_add(type='POINT', location=(0, 0, WATER_Y+1))
wglow = bpy.context.active_object
wglow.data.energy = 800
wglow.data.color  = (0.05, 0.58, 0.52)
wglow.name = "WaterGlow"

# ── 8. EXPORTAR GLB ──────────────────────────────────────────────────────────
print("  → Exportando GLB...")

export_path = os.path.expanduser("~/SISTEMAS/CAPACHICA/frontend/capachica.glb")
os.makedirs(os.path.dirname(export_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath        = export_path,
    export_format   = 'GLB',
    export_colors   = True,          # vertex colors del terreno
    export_materials= 'EXPORT',
    export_apply    = True,          # aplica transformaciones
    export_yup      = True,          # Z-up → Y-up para Three.js
    export_normals  = True,
    export_lights   = False,         # luces las maneja Three.js
)

print(f"\n✅ Exportado: {export_path}")
print("   Ahora abre http://localhost:3000/world.html para verlo.\n")
