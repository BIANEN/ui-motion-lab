# Museum of Fields — Interactive Art Laboratory

A collection of web-based particle and spatial interaction experiments.

## Live pages

- [V1.2 — Isolated Light](https://bianen.github.io/ui-motion-lab/) — original light sculpture.
- [Human Mesh Photon Study](https://bianen.github.io/ui-motion-lab/experiments/human-mesh/) — a real 3D human mesh sampled into tens of thousands of dynamic luminous particles.

## Human mesh experiment

The **primary mesh** is locally hosted as `experiments/human-mesh/assets/makehuman_base_male.glb` (4.5 MB, ~109k triangles), a MakeHuman-derived neutral adult male base model from Innerscene, published CC0:
https://www.innerscene.com/tools/library/3d-parts/male-base-mesh-3d-person-rigged-a-pose-380e6d89

The **local fallback** in `experiments/human-mesh/assets/human_posed.glb` is the CC0 Quaternius humanoid prepared by UMRAM-Bilkent:
https://github.com/UMRAM-Bilkent/supine-human-model

Model is sampled by triangle area using Three.js `MeshSurfaceSampler`, not by drawing ellipses or stick-figure proportions.

The scene uses self-contained original particle shaders, and only the top heading is shown.

Controls:
- Move pointer: disturb local photons
- Hold: gather and stabilize photons
- Release: ripple dispersion, then re-form
- Mouse wheel: zoom
- On mobile: touch/hold/release

The 3D body models are stored in this repository. Three.js modules are loaded from jsDelivr and require network access.

## Publishing

`.github/workflows/pages.yml` publishes the root of `main` via GitHub Pages.

## License notes

The locally bundled fallback model is CC0-1.0 (source above).
Original site layout, particle logic, and code are experimental.
