"""
Генератор модульной станции для HolyJS-доклада (universe/station.ts).

Запуск в Blender (через MCP или Scripting):
    exec(open('<repo>/universe/blender/station.py').read())
    build()                       # собрать сцену
    export('<repo>/universe/assets/station.glb')

Единица длины = радиус корпуса модуля (в three.js масштабируется на H = 0.05).
Оси Blender: Z вверх. glTF → three.js: X→X, Z→Y, Y→−Z.
  * модуль вдоль +X, стыковочный узел на −X, «верх» модуля — +Z;
  * хаб вертикален по Z, порты: +x, −x, +z(three) = −Y(blender), −z(three) = +Y, −y(three) = −Z.

Материалы называются по ролям (hull, foil, dark, truss, solar, radiator, window, accent,
portlight, navlight) — three.js подменяет их своими процедурными материалами.
Размеры хаба совпадают с константами station.ts: HUB_R = 1.35, HUB_LEN = 3.2, COLLAR = CONE = 0.35.
"""

import math
import bpy
import bmesh
from mathutils import Matrix, Vector

HUB_R = 1.35
HUB_LEN = 3.2
COLLAR = 0.35
CONE = 0.35

# id, длина корпуса, тип — синхронно с station.modules в scene.ts
MODULES = [
    ('catalog', 5.5, 'lab'),
    ('search', 4.5, 'lab'),
    ('cart', 3.6, 'hab'),
    ('checkout', 3.2, 'cargo'),
    ('profile', 2.8, 'hab'),
]

# цвета только для превью в Blender; в three.js материалы подменяются
PREVIEW = {
    'hull': ((0.80, 0.81, 0.83), 0.25, 0.55),
    'foil': ((0.75, 0.55, 0.20), 0.85, 0.30),
    'dark': ((0.10, 0.11, 0.13), 0.60, 0.45),
    'truss': ((0.62, 0.64, 0.68), 0.75, 0.35),
    'solar': ((0.08, 0.14, 0.35), 0.25, 0.38),
    'radiator': ((0.90, 0.90, 0.92), 0.05, 0.75),
    'window': ((1.00, 0.85, 0.60), 0.00, 0.20),
    'accent': ((0.20, 0.80, 0.60), 0.30, 0.40),
    'portlight': ((1.00, 0.65, 0.20), 0.00, 0.50),
    'navlight': ((1.00, 0.30, 0.30), 0.00, 0.50),
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


# ── примитивы в bmesh: всё собирается в один меш на объект ─────────────

class Builder:
    """Копит геометрию одного объекта; у каждой детали — свой материал."""

    def __init__(self):
        self.bm = bmesh.new()
        self.mats = []
        self.uv = self.bm.loops.layers.uv.new('UVMap')

    def slot(self, mat):
        if mat not in self.mats:
            self.mats.append(mat)
        return self.mats.index(mat)

    def _add(self, tmp, mat, matrix, smooth=True):
        tmp.transform(matrix)
        idx = self.slot(mat)
        # переносим через меш-посредник, чтобы сохранить UV
        me = bpy.data.meshes.new('tmp')
        tmp.to_mesh(me)
        tmp.free()
        before = set(self.bm.faces)
        self.bm.from_mesh(me)
        bpy.data.meshes.remove(me)
        for f in self.bm.faces:
            if f not in before:
                f.material_index = idx
                f.smooth = smooth

    def cylinder(self, mat, r1, r2, depth, matrix, segs=48, caps=True, smooth=True):
        tmp = bmesh.new()
        tmp.loops.layers.uv.new('UVMap')
        bmesh.ops.create_cone(tmp, cap_ends=caps, cap_tris=False, segments=segs,
                              radius1=r1, radius2=r2, depth=depth, calc_uvs=True)
        self._add(tmp, mat, matrix, smooth)

    def box(self, mat, size, matrix):
        tmp = bmesh.new()
        tmp.loops.layers.uv.new('UVMap')
        bmesh.ops.create_cube(tmp, size=1.0, calc_uvs=True)
        bmesh.ops.scale(tmp, vec=Vector(size), verts=tmp.verts)
        self._add(tmp, mat, matrix, smooth=False)

    def torus(self, mat, R, r, matrix, segs=48, ring=8):
        tmp = bmesh.new()
        tmp.loops.layers.uv.new('UVMap')
        verts = []
        for i in range(segs):
            a = 2 * math.pi * i / segs
            row = []
            for j in range(ring):
                b = 2 * math.pi * j / ring
                p = Vector(((R + r * math.cos(b)) * math.cos(a), (R + r * math.cos(b)) * math.sin(a), r * math.sin(b)))
                row.append(tmp.verts.new(p))
            verts.append(row)
        for i in range(segs):
            for j in range(ring):
                a, b = verts[i][j], verts[(i + 1) % segs][j]
                c, d = verts[(i + 1) % segs][(j + 1) % ring], verts[i][(j + 1) % ring]
                tmp.faces.new((a, b, c, d))
        self._add(tmp, mat, matrix)

    def sphere(self, mat, r, matrix, segs=24, rings=12):
        tmp = bmesh.new()
        tmp.loops.layers.uv.new('UVMap')
        bmesh.ops.create_uvsphere(tmp, u_segments=segs, v_segments=rings, radius=r, calc_uvs=True)
        self._add(tmp, mat, matrix)

    def rod(self, mat, a, b, r, segs=8):
        """цилиндр-перекладина между двумя точками"""
        a, b = Vector(a), Vector(b)
        d = b - a
        rot = Vector((0, 0, 1)).rotation_difference(d.normalized()).to_matrix().to_4x4()
        self.cylinder(mat, r, r, d.length, Matrix.Translation((a + b) / 2) @ rot, segs=segs, caps=False, smooth=True)

    def finish(self, name, parent=None):
        me = bpy.data.meshes.new(name)
        self.bm.normal_update()
        self.bm.to_mesh(me)
        self.bm.free()
        for m in self.mats:
            me.materials.append(material(m))
        obj = bpy.data.objects.new(name, me)
        bpy.context.collection.objects.link(obj)
        if parent:
            obj.parent = parent
        return obj


def T(x=0, y=0, z=0):
    return Matrix.Translation((x, y, z))


# цилиндр create_cone строится вдоль Z; вдоль X — поворот вокруг Y
ALONG_X = Matrix.Rotation(math.pi / 2, 4, 'Y')
ALONG_Y = Matrix.Rotation(-math.pi / 2, 4, 'X')


def handrail(b, x0, x1, angle, r=1.0):
    """поручень вдоль корпуса на заданном угле от верха, со стойками"""
    y = math.sin(angle) * (r + 0.12)
    z = math.cos(angle) * (r + 0.12)
    b.rod('radiator', (x0, y, z), (x1, y, z), 0.025)
    n = max(2, int((x1 - x0) / 0.6))
    for i in range(n + 1):
        x = x0 + (x1 - x0) * i / n
        b.rod('radiator', (x, math.sin(angle) * r, math.cos(angle) * r), (x, y, z), 0.02, segs=6)


def build_module(mid, length, kind):
    b = Builder()
    L = length
    skin = 'foil' if kind == 'cargo' else 'hull'

    # корпус, конусы, торцы
    b.cylinder(skin, 1, 1, L, ALONG_X, segs=64, caps=False)
    b.cylinder('hull', 1, 0.72, CONE, T(L / 2 + CONE / 2) @ ALONG_X, segs=64)
    b.cylinder('hull', 0.72, 1, CONE, T(-L / 2 - CONE / 2) @ ALONG_X, segs=64)
    # стыковочный узел: воротник + направляющие лепестки
    b.cylinder('dark', 0.6, 0.55, COLLAR, T(-L / 2 - CONE - COLLAR / 2) @ ALONG_X, segs=40)
    for k in range(3):
        a = 2 * math.pi * k / 3 + 0.3
        m = T(-L / 2 - CONE - COLLAR * 0.9, math.cos(a) * 0.48, math.sin(a) * 0.48) @ Matrix.Rotation(a, 4, 'X')
        b.box('truss', (0.28, 0.06, 0.16), m)
    # внешний люк с поручнем
    b.cylinder('dark', 0.34, 0.34, 0.1, T(L / 2 + CONE + 0.05) @ ALONG_X, segs=32)
    b.torus('radiator', 0.42, 0.03, T(L / 2 + CONE + 0.1) @ ALONG_X, segs=32, ring=6)

    # рёбра жёсткости
    rings = max(2, round(L / 1.4))
    for i in range(1, rings):
        b.torus('truss', 1.006, 0.03, T(-L / 2 + L / rings * i) @ ALONG_X, segs=64, ring=6)
    # цветной пояс команды у внешнего торца
    b.cylinder('accent', 1.018, 1.018, 0.45, T(L / 2 - 0.55) @ ALONG_X, segs=64, caps=False)

    # поручни по обе стороны от верха
    for ang in (-0.7, 0.7):
        handrail(b, -L / 2 + 0.3, L / 2 - 0.9, ang)
    # захват манипулятора
    b.box('dark', (0.35, 0.35, 0.12), T(0, -1.02, 0) @ Matrix.Rotation(math.pi / 2, 4, 'X'))
    b.cylinder('truss', 0.05, 0.05, 0.3, T(0, -1.2, 0) @ ALONG_Y, segs=8)

    if kind == 'lab':
        # платформы с полезной нагрузкой сверху
        for x in (-0.25 * L, 0.18 * L):
            b.box('dark', (0.8, 0.6, 0.12), T(x, 0, 1.06))
            b.box('foil', (0.55, 0.42, 0.35), T(x - 0.05, 0.02, 1.3))
            b.box('radiator', (0.2, 0.2, 0.2), T(x + 0.28, -0.12, 1.25))
            b.cylinder('truss', 0.03, 0.03, 0.6, T(x + 0.3, 0.15, 1.45), segs=6)
        # радиаторы: панели с рёбрами на штангах
        for s in (-1, 1):
            y = s * 1.55
            b.rod('truss', (0.05 * L, s * 0.98, 0), (0.05 * L, y - s * 0.4, 0), 0.04)
            b.box('radiator', (L * 0.32, 0.8, 0.025), T(0.05 * L, y, 0))
            for k in range(6):
                b.box('truss', (0.02, 0.8, 0.04), T(0.05 * L - L * 0.16 + L * 0.32 * (k + 0.5) / 6, y, 0.02))

    if kind == 'hab':
        # ряд иллюминаторов в рамках и купол обзора
        for i in range(4):
            x = -L * 0.32 + i * L * 0.2
            m = T(x, 0, 0.985)
            b.box('window', (0.2, 0.14, 0.04), m)
            b.box('dark', (0.28, 0.22, 0.02), T(x, 0, 0.975))
        b.cylinder('dark', 0.34, 0.3, 0.16, T(-L * 0.05, 0.62, 0.72) @ Matrix.Rotation(-0.7, 4, 'X'), segs=24)
        b.sphere('window', 0.26, T(-L * 0.05, 0.68, 0.79) @ Matrix.Rotation(-0.7, 4, 'X'), segs=20, rings=10)

    if kind == 'cargo':
        # силовые пояса на фольге и маленькие батареи
        for x in (-L / 2 + 0.4, 0, L / 2 - 1.1):
            b.cylinder('hull', 1.02, 1.02, 0.2, T(x) @ ALONG_X, segs=64, caps=False)
        for s in (-1, 1):
            b.rod('truss', (-0.2, s * 1.0, 0), (-0.2, s * 1.35, 0), 0.04)
            b.box('solar', (1.4, 1.8, 0.03), T(-0.2, s * 2.3, 0))
        b.cylinder('dark', 0.2, 0.2, 0.5, T(L * 0.2, 0, 1.2), segs=16)
        b.sphere('radiator', 0.18, T(L * 0.2, 0, 1.5), segs=16, rings=8)

    obj = b.finish(f'module_{mid}')

    # навигационный огонь — отдельный объект, в three.js красится цветом команды
    nav = Builder()
    nav.sphere('navlight', 0.09, T(0, 0, 0), segs=12, rings=6)
    n = nav.finish(f'nav_{mid}', obj)
    n.location = (L / 2 + CONE, 0, 0.55)
    return obj


# порт three.js → направление в Blender
PORTS = {
    '+x': Vector((1, 0, 0)),
    '-x': Vector((-1, 0, 0)),
    '+z': Vector((0, -1, 0)),
    '-z': Vector((0, 1, 0)),
    '-y': Vector((0, 0, -1)),
}


def build_hub():
    b = Builder()
    b.cylinder('hull', HUB_R, HUB_R, HUB_LEN, T(), segs=64, caps=False)
    b.sphere('hull', HUB_R, T(0, 0, HUB_LEN / 2) @ Matrix.Scale(1, 4), segs=48, rings=24)
    b.cylinder('hull', HUB_R, HUB_R * 0.8, 0.3, T(0, 0, -HUB_LEN / 2 - 0.15), segs=64)
    for k in range(3):
        b.torus('truss', HUB_R * 1.004, 0.03, T(0, 0, -HUB_LEN / 2 + HUB_LEN * (k + 1) / 4), segs=64, ring=6)
    for ang in (0.8, 2.4, 3.9, 5.5):
        handrail(b, -HUB_LEN / 2 + 0.3, HUB_LEN / 2 - 0.3, ang, r=HUB_R)

    # стыковочные воротники
    for port, d in PORTS.items():
        base = Vector((0, 0, -HUB_LEN / 2)) if port == '-y' else d * HUB_R
        rot = Vector((0, 0, 1)).rotation_difference(d).to_matrix().to_4x4()
        c = base + d * 0.15
        b.cylinder('dark', 0.6, 0.65, 0.3, T(*c) @ rot, segs=40)

    # мачта и ферма
    top = HUB_LEN / 2 + 5
    b.cylinder('truss', 0.22, 0.22, 5, T(0, 0, HUB_LEN / 2 + 2.5), segs=16)
    for x in (-0.25, 0.25):
        b.rod('truss', (x * 2, -0.5, HUB_LEN / 2 + 0.6), (0, 0, top - 0.4), 0.05)
    Lt = 22
    s = 0.7
    corners = [(s / 2, s / 2), (s / 2, -s / 2), (-s / 2, s / 2), (-s / 2, -s / 2)]
    for (y, z) in corners:
        b.rod('truss', (-Lt / 2, y, top + z), (Lt / 2, y, top + z), 0.045)
    bays = 22
    for i in range(bays + 1):
        x = -Lt / 2 + Lt / bays * i
        for (y0, z0), (y1, z1) in (((s / 2, s / 2), (s / 2, -s / 2)), ((-s / 2, s / 2), (-s / 2, -s / 2)),
                                   ((s / 2, s / 2), (-s / 2, s / 2)), ((s / 2, -s / 2), (-s / 2, -s / 2))):
            b.rod('truss', (x, y0, top + z0), (x, y1, top + z1), 0.03, segs=6)
        if i < bays:
            x1 = x + Lt / bays
            flip = 1 if i % 2 else -1
            b.rod('truss', (x, s / 2, top - flip * s / 2), (x1, s / 2, top + flip * s / 2), 0.025, segs=6)
            b.rod('truss', (x, -s / 2, top + flip * s / 2), (x1, -s / 2, top - flip * s / 2), 0.025, segs=6)

    # солнечные крылья: по два полотна на сторону, мачта-растяжка, поворотный узел
    for side in (-1, 1):
        wx = side * (Lt / 2 + 0.4)
        b.box('dark', (0.9, 0.5, 0.5), T(wx, 0, top))
        b.cylinder('truss', 0.25, 0.25, 0.5, T(wx - side * 0.5, 0, top) @ ALONG_X, segs=16)
        for dy in (-1, 1):
            cy = dy * (4.5 + 0.4)
            b.box('solar', (2.6, 9, 0.04), T(wx, cy, top))
            b.rod('truss', (wx, dy * 0.3, top + 0.06), (wx, dy * 9.4, top + 0.06), 0.05, segs=6)
            b.box('dark', (2.7, 0.12, 0.1), T(wx, dy * 9.4, top))
            for k in range(1, 5):
                b.box('truss', (2.62, 0.03, 0.05), T(wx, cy - 4.5 + 9 * k / 5, top + 0.02))

    # радиаторы на ферме
    for dy in (-1, 1):
        m = T(0, dy * 2.6, top - 0.4) @ Matrix.Rotation(dy * 0.35, 4, 'X')
        b.box('radiator', (1.8, 4.2, 0.03), m)
        for k in range(7):
            b.box('truss', (1.8, 0.02, 0.05), m @ T(0, -2.1 + 4.2 * (k + 0.5) / 7, 0.02))
        b.rod('truss', (0, dy * 0.35, top - 0.35), (0, dy * 0.8, top - 0.4), 0.05)

    # антенна
    b.cylinder('truss', 0.06, 0.06, 1.2, T(4, 0, top + 0.5), segs=8)
    dish = Matrix.Translation((4, 0, top + 1.1)) @ Matrix.Rotation(0.5, 4, 'Y')
    b.sphere('radiator', 0.9, dish @ Matrix.Scale(0.35, 4, Vector((0, 0, 1))), segs=24, rings=8)

    hub = b.finish('hub')

    # огни портов — отдельные объекты, анимируются в three.js
    for port, d in PORTS.items():
        base = Vector((0, 0, -HUB_LEN / 2)) if port == '-y' else d * HUB_R
        lb = Builder()
        lb.torus('portlight', 0.64, 0.05, T(), segs=32, ring=6)
        o = lb.finish(f'port_{port}', hub)
        o.location = base + d * 0.3
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d)
    return hub


def clear():
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o, do_unlink=True)
    for m in list(bpy.data.meshes):
        bpy.data.meshes.remove(m)


def build():
    clear()
    hub = build_hub()
    x = 0
    for i, (mid, length, kind) in enumerate(MODULES):
        o = build_module(mid, length, kind)
        # раскладка для превью: модули в ряд под хабом (в экспорт позиции не важны —
        # three.js ставит модули к портам сам)
        o.location = (-10 + i * 5.2, 8, -4)
    return hub


def export(path):
    for o in bpy.data.objects:
        o.select_set(False)
    saved = {}
    for o in bpy.data.objects:
        if o.parent is None:
            saved[o.name] = o.location.copy()
            o.location = (0, 0, 0)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=False,
                              export_apply=True, export_yup=True, export_materials='EXPORT')
    for name, loc in saved.items():
        bpy.data.objects[name].location = loc
