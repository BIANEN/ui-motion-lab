"""Bake real 3D human mesh as self-contained Canvas photons; CC0 source noted in README."""
from pathlib import Path
import base64
import numpy as np
import trimesh

root=Path(__file__).resolve().parent
src=root/"assets"/"makehuman_base_male.glb"
scene=trimesh.load(src,force="scene",process=False)
mesh=scene.dump(concatenate=True) if isinstance(scene,trimesh.Scene) else scene
if isinstance(mesh,list): mesh=trimesh.util.concatenate(mesh)
assert isinstance(mesh,trimesh.Trimesh)
v=np.asarray(mesh.vertices,dtype=np.float64)
f=np.asarray(mesh.faces,dtype=np.int64)
assert len(f)>3000, "Expected detailed anatomically-sourced mesh"
mins=v.min(axis=0);maxs=v.max(axis=0);span=maxs-mins
up=int(np.argmax(span)) if span[1]<span.max()*.72 else 1
axis_x=0 if up!=0 else (1 if up!=1 else 2)
axis_z=next(j for j in range(3) if j not in (up,axis_x))
axes=[axis_x,up,axis_z]
tri=v[f][:,:,axes]
edges_a=tri[:,1]-tri[:,0]
edges_b=tri[:,2]-tri[:,0]
area=np.linalg.norm(np.cross(edges_a,edges_b),axis=1)*.5
area=np.where(np.isfinite(area),area,0)
assert area.sum()>0
rng=np.random.default_rng(263184)
N=42000
idx=rng.choice(len(f),size=N,p=area/area.sum())
a=np.sqrt(rng.random(N));b=rng.random(N)
p=tri[idx,0]*(1-a)[:,None]+tri[idx,1]*(a*(1-b))[:,None]+tri[idx,2]*(a*b)[:,None]
center=(mins[axes]+maxs[axes])*.5
height=(maxs[axes]-mins[axes])[1]
coord=(p-center)/height
assert np.max(np.abs(coord))<.96, coord.max(axis=0)
norm=np.cross(edges_a[idx],edges_b[idx])
norm/=np.maximum(np.linalg.norm(norm,axis=1,keepdims=True),1e-8)
lum=np.clip(.54+np.abs(norm[:,2])*.35+rng.uniform(-.08,.08,N),.3,1)
q=np.round((coord+1)*32767.5).clip(0,65535).astype('<u2')
packet=np.empty((N,7),dtype=np.uint8)
packet[:,:6]=q.view(np.uint8).reshape(N,6)
packet[:,6]=(lum*255).astype(np.uint8)
payload=base64.b64encode(packet.tobytes()).decode("ascii")
template=(root/"photon-template.html").read_text()
assert "{{PHOTON_DATA}}" in template
html=template.replace("{{PHOTON_DATA}}",payload).replace("{{PHOTON_COUNT}}",str(N))
(root/"index.html").write_text(html)
print("Mesh triangles:",len(f),"source size:",src.stat().st_size)
print("Original bounds:",mins.round(3).tolist(),maxs.round(3).tolist(),"axis map:",axes)
print("Normalized bounds:",coord.min(axis=0).round(3).tolist(),coord.max(axis=0).round(3).tolist())
print("Baked self-contained photons:",N,"HTML bytes:",len(html))
