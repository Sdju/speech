"""
Генератор стула для «планеты из стульев» (components/ChairPlanet.vue).

Запуск в Blender (через MCP или Scripting):
    exec(open('<repo>/universe/blender/chair.py').read())
    build()                        # один стул в коллекции `chair`
    planet()                       # превью планеты из связанных копий (не экспортируется)
    export('<repo>/universe/assets/chair.glb')

Единица длины — метр, стул обычный кухонный: сиденье на 0.45, спинка до 0.9.
Начало координат — центр ограничивающего объёма, чтобы стул крутился «вокруг себя».
Материалы по ролям (wood, seat): three.js подменяет их и тонирует каждый экземпляр.
Оси Blender: Z вверх. glTF → three.js: X→X, Z→Y, Y→−Z.
"""

import math
import random
import bpy
import bmesh
from mathutils import Matrix, Vector

SEAT_H = 0.45
SEAT_W = 0.42
SEAT_D = 0.40
SEAT_T = 0.035
LEG = 0.034
BACK_H = 0.90

PREVIEW = {
    'wood': ((0.55, 0.36, 0.20), 0.0, 0.6),
    'seat': ((0.85, 0.72, 0.52), 0.0, 0.5),
}


def material(name):
    mat = bpy.data.materials.get(name)
    if mat:
        return mat
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    color, metal, rough = PREVIEW[name]
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Metallic'].default_value = metal
    bsdf.inputs['Roughness'].default_value = rough
    return mat


def box(bm, size, at, mat=0, rot=None):
    """Брусок size=(x, y, z) с центром at; rot — матрица поворота вокруг центра."""
    m = Matrix.Translation(Vector(at))
    if rot:
        m = m @ rot
    m = m @ Matrix.Diagonal((*size, 1))
    geom = bmesh.ops.create_cube(bm, size=1, matrix=m)
    for f in {f for v in geom['verts'] for f in v.link_faces}:
        f.material_index = mat


def leg(bm, bottom, top, w):
    """Брусок между двумя точками (ножки чуть разведены и наклонены)."""
    a, b = Vector(bottom), Vector(top)
    d = b - a
    rot = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_matrix().to_4x4()
    box(bm, (w, w, d.length), (a + b) / 2, 0, rot)


def build():
    old = bpy.data.objects.get('chair')
    if old:
        bpy.data.objects.remove(old, do_unlink=True)

    bm = bmesh.new()
    hx, hy = SEAT_W / 2, SEAT_D / 2
    splay = 0.018  # ножки чуть шире внизу

    # передние ножки
    for sx in (-1, 1):
        leg(bm, (sx * (hx - LEG / 2 + splay), -hy + LEG / 2 - splay, 0),
            (sx * (hx - LEG / 2), -hy + LEG / 2, SEAT_H - SEAT_T), LEG)
    # задние ножки продолжаются в стойки спинки с лёгким завалом назад
    lean = 0.07
    for sx in (-1, 1):
        x = sx * (hx - LEG / 2)
        y = hy - LEG / 2
        leg(bm, (x + sx * splay, y + splay * 1.6, 0), (x, y, SEAT_H), LEG)
        leg(bm, (x, y, SEAT_H - 0.01), (x * 0.96, y + lean, BACK_H), LEG * 0.92)

    # царги под сиденьем
    z = SEAT_H - SEAT_T - 0.035
    box(bm, (SEAT_W - LEG, 0.018, 0.06), (0, -hy + LEG / 2, z))
    box(bm, (SEAT_W - LEG, 0.018, 0.06), (0, hy - LEG / 2, z))
    for sx in (-1, 1):
        box(bm, (0.018, SEAT_D - LEG, 0.06), (sx * (hx - LEG / 2), 0, z))
    # проножки
    for sx in (-1, 1):
        box(bm, (0.018, SEAT_D - LEG + splay, 0.018), (sx * (hx - LEG / 2 + splay * 0.6), 0, 0.16))
    box(bm, (SEAT_W - LEG + splay, 0.018, 0.018), (0, 0, 0.12))

    # сиденье: чуть скруглённая плита — отдельный материал
    box(bm, (SEAT_W + 0.02, SEAT_D + 0.02, SEAT_T), (0, 0, SEAT_H - SEAT_T / 2), 1)

    # спинка «лесенкой»: три перекладины между наклонными стойками
    for i, zz in enumerate((0.60, 0.71, 0.82)):
        t = (zz - SEAT_H) / (BACK_H - SEAT_H)
        yy = hy - LEG / 2 + lean * t
        tilt = Matrix.Rotation(-math.atan2(lean, BACK_H - SEAT_H), 4, 'X')
        box(bm, (SEAT_W - LEG * 1.2, 0.016, 0.07 if i == 2 else 0.045), (0, yy, zz), 0, tilt)

    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)

    # центр ограничивающего объёма в начало координат
    lo = Vector((min(v.co[k] for v in bm.verts) for k in range(3)))
    hi = Vector((max(v.co[k] for v in bm.verts) for k in range(3)))
    bmesh.ops.translate(bm, verts=bm.verts, vec=-(lo + hi) / 2)

    mesh = bpy.data.meshes.new('chair')
    bm.to_mesh(mesh)
    bm.free()
    mesh.materials.append(material('wood'))
    mesh.materials.append(material('seat'))
    obj = bpy.data.objects.new('chair', mesh)
    bpy.context.scene.collection.objects.link(obj)
    # фаска на рёбрах — иначе стул читается как набор кубиков
    bev = obj.modifiers.new('bevel', 'BEVEL')
    bev.width = 0.004
    bev.segments = 1
    bev.limit_method = 'ANGLE'
    return obj


def planet(count=900, radius=1.6, seed=4):
    """Превью: стулья свалены в шар, как в three.js (случайные, но детерминированные)."""
    coll = bpy.data.collections.get('chair_planet')
    if coll:
        for o in list(coll.objects):
            bpy.data.objects.remove(o, do_unlink=True)
    else:
        coll = bpy.data.collections.new('chair_planet')
        bpy.context.scene.collection.children.link(coll)
    src = bpy.data.objects['chair']
    rng = random.Random(seed)
    for i in range(count):
        # равномерно по сфере + разброс по глубине слоя
        u, v = rng.random() * 2 - 1, rng.random() * math.tau
        n = Vector((math.sqrt(1 - u * u) * math.cos(v), math.sqrt(1 - u * u) * math.sin(v), u))
        r = radius * (0.72 + 0.28 * rng.random() ** 0.6)
        o = src.copy()
        o.data = src.data
        o.location = n * r
        o.rotation_euler = (rng.random() * math.tau, rng.random() * math.tau, rng.random() * math.tau)
        o.scale = [0.9 + rng.random() * 0.2] * 3
        coll.objects.link(o)
    src.hide_set(True)


def export(path):
    src = bpy.data.objects['chair']
    bpy.ops.object.select_all(action='DESELECT')
    src.hide_set(False)
    src.select_set(True)
    bpy.context.view_layer.objects.active = src
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_normals=True,
        export_materials='EXPORT',
    )
