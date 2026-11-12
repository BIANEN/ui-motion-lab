# Museum of Fields — Interactive Art Laboratory

A set of independent interactive web-art experiments. The project root and the human-mesh experiment are separate.

## Live pages

- [Original V1.2 — Isolated Light](https://bianen.github.io/ui-motion-lab/) — original standalone light field; unaffected by V1.7.
- [V1.7.1 — Human Photon Field](https://bianen.github.io/ui-motion-lab/experiments/human-mesh/) — anatomically sourced 3D particle sculpture in one offline-capable HTML page.

## V1.7.1 approved configuration

| Parameter | Selection |
|---|---|
| 3D source | MakeHuman |
| Photons | 18,000 |
| Surface distribution | Approximate blue noise (Poisson-rejection) |
| Particle size | Fine |
| Lighting / color | Halo; cool white and violet |
| Move | Scatter outward velocity |
| Hold | Charge energy |
| Release | Expanding Shockwave |
| Return | Slow, inertia-based |
| Trails | Short, translucent Canvas history |
| Rotation | 360° orbit (Shift + left drag, or right drag) |
| Background | Ambient violet-black |
| Renderer | Offline Canvas 2D |

Normal pointer movement scatters particles. Hold the **left mouse button** to accumulate charge; releasing launches a travelling shockwave. To keep orbit separate from Charge, **Shift + left drag** or **right drag** rotates the body; mouse wheel zooms. Touch supports Move / Hold / Release.

The viewer is generated, not hand-edited. The bake_points.py script loads a real CC0 MakeHuman-derived GLB, samples its triangle surface with trimesh.sample.sample_surface_even using approximate blue-noise spacing, then packs all 18,000 photon positions and surface-luminance bytes into the experimental index.html. The page needs no runtime model file, WebGL, Three.js, npm, or network requests.

The implementation exposes modular CONFIG, PHYSICS, and VISUALS, plus dedicated applyScatter, applyCharge, applyShockwave, applyReturn, project, and renderPhotons functions. It reports an inspectable window.photonDebug object.

### Sources and licenses

- Primary local GLB: experiments/human-mesh/assets/makehuman_base_male.glb (4.5 MB, approximately 109,064 triangles), a CC0 MakeHuman-derived male A-pose mesh from [Innerscene](https://www.innerscene.com/tools/library/3d-parts/male-base-mesh-3d-person-rigged-a-pose-380e6d89).
- Backup mesh: experiments/human-mesh/assets/human_posed.glb, a CC0 Quaternius humanoid from [UMRAM-Bilkent](https://github.com/UMRAM-Bilkent/supine-human-model).

### Build and deployment

The build-photons.yml GitHub workflow bakes positions, checks syntax, simulates pointer physics with smoke_test.cjs, then commits the independent experiment page. The pages.yml workflow publishes the entire repository on GitHub Pages. The root index.html is never changed by the experiment build.

### V1.7 release verification

The standalone renderer is baked to 18,000 points and has passed GitHub Actions syntax and pointer-physics smoke checks. The physics module bounds displacement to 0.38 normalized body-height units; CI's scripted interaction measured approximately 177 px maximum displacement in a 1440×900 test view. The original root/index.html is unchanged.

### V1.7.1 interaction refinement — 2026-11-12

The model, 18,000 blue-noise photon samples, palette, Canvas renderer, slow return and original main page remain unchanged.

- **Soft contact:** a per-photon exponential contact envelope ramps outward force in over **220 ms** instead of applying a full impulse on initial contact; fade-out takes 95 ms.
- **Pointer velocity filtering:** measured pointer speed is frame-rate normalized and smoothed by a **95 ms** exponential filter; raw movement is not applied directly. Stale motion starts decaying after 75 ms without an event.
- **Move scatter:** radius **130 px**, outward speed impulse **0.0032**, smoother radial influence.
- **Release shockwave:** maximum impact radius **220 px**, speed **11 px / 60-Hz reference frame**, annular width **28 px**, velocity strength **0.004**. A strict 220-pixel boundary prevents force beyond that radius.
- **Displacement limit:** reduced from 0.38 to **0.26** normalized model height, keeping the figure intact after repeated gestures.
- **Return:** existing slow spring and damping rates preserved.
- CI tests exercise contact onset versus steady contact, cursor idle decay, local shockwave radius, orbit, original body data and standalone offline rendering.

To inspect running diagnostics, use `window.photonDebug` in a browser's developer console.
