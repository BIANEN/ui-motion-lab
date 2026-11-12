"""Build an offline Canvas particle study from the CC0 MakeHuman GLB.
Poisson-rejection ('blue-noise-style') surface sampling via trimesh.sample_surface_even.
No runtime external dependencies; generated index.html includes packed point coordinates.
"""
from pathlib import Path
import base64
import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "assets" / "makehuman_base_male.glb"
TEMPLATE = ROOT / "photon-template.html"
COUNT = 18_000
SEED = 263184
rng = np.random.default_rng(SEED)

scene = trimesh.load(SOURCE, force="scene", process=False)
mesh = scene.dump(concatenate=True) if isinstance(scene, trimesh.Scene) else scene
if isinstance(mesh, list):
    mesh = trimesh.util.concatenate(mesh)
assert isinstance(mesh, trimesh.Trimesh), type(mesh)
vertices = np.asarray(mesh.vertices, dtype=np.float64)
faces = np.asarray(mesh.faces, dtype=np.int64)
assert len(faces) > 3_000, "Expected the detailed MakeHuman geometry."

mins, maxs = vertices.min(axis=0), vertices.max(axis=0)
span = maxs - mins
up = int(np.argmax(span)) if span[1] < span.max() * .72 else 1
x_axis = 0 if up != 0 else 1
z_axis = next(k for k in range(3) if k not in (up, x_axis))
axes = [x_axis, up, z_axis]
center = (mins[axes] + maxs[axes]) * .5
height = span[up]
assert height > 0.001

# Minimum spacing is estimated from true 3D surface area. The trimesh routine
# oversamples the triangle surface and rejects close pairs (approximate blue noise).
# We adapt spacing if the first pass yields fewer than exactly 18,000 samples.
base_radius = float(np.sqrt(mesh.area / (3.0 * COUNT)))
points = face_ids = None
used_radius = None
for pass_number, factor in enumerate((.95, .80, .65, .53, .43), start=1):
    candidate, candidate_face = trimesh.sample.sample_surface_even(
        mesh, count=COUNT * 2, radius=base_radius * factor, seed=SEED + pass_number
    )
    if len(candidate) >= COUNT:
        keep = rng.choice(len(candidate), COUNT, replace=False)
        points = np.asarray(candidate[keep], dtype=np.float64)
        face_ids = np.asarray(candidate_face[keep], dtype=np.int64)
        used_radius = base_radius * factor
        break
if points is None:
    raise RuntimeError("Could not generate enough separated mesh-surface samples.")

coord = (points[:, axes] - center) / height
assert len(coord) == COUNT
assert np.max(np.abs(coord)) < .96
assert np.isfinite(coord).all()

tri = vertices[faces[face_ids]][:, :, axes]
norm = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
norm /= np.maximum(np.linalg.norm(norm, axis=1, keepdims=True), 1e-10)
luminance = np.clip(
    .57 + np.abs(norm[:, 2]) * .32 + rng.uniform(-.06, .06, COUNT), .24, 1
)

# Three little-endian uint16s + uint8 luminance per photon, exact offline payload.
packed_xyz = np.round((coord + 1) * 32767.5).clip(0, 65535).astype("<u2")
packet = np.empty((COUNT, 7), dtype=np.uint8)
packet[:, :6] = np.ascontiguousarray(packed_xyz).view(np.uint8).reshape(COUNT, 6)
packet[:, 6] = np.round(luminance * 255).astype(np.uint8)
payload = base64.b64encode(packet.tobytes()).decode("ascii")

template = TEMPLATE.read_text(encoding="utf-8")
assert template.count("{{PHOTON_DATA}}") == 1
assert template.count("{{PHOTON_COUNT}}") == 1
html = template.replace("{{PHOTON_DATA}}", payload).replace("{{PHOTON_COUNT}}", str(COUNT))
assert "{{PHOTON_" not in html
assert 'https://' not in html, "Runtime must remain network-independent."
(ROOT / "index.html").write_text(html, encoding="utf-8")

print("Model triangles:", len(faces))
print("Sample algorithm: Poisson-rejection/blue-noise-style")
print("Minimum sample spacing:", round(used_radius, 6), "model units")
print("Normalized xyz bounds:", coord.min(axis=0).round(3), coord.max(axis=0).round(3))
print("Built photons:", COUNT)
print("Offline HTML size:", len(html))
