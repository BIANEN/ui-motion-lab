# 01 · 蓝色网光体 / Blue Wireframe Light Body

**Version:** A — 忠实复刻 (faithful-reference stage)  
**Status:** 3D modeling reference set prepared; binary PNG files still pending repository upload.

This numbered asset is part of the **11-figure spirit body reconstruction** series. The goal is a reusable Blender/Three.js model, not a static collage.

## Individual images prepared
- `source/01-original-reference.jpg`
- `version-A/views/01-front.png`
- `version-A/views/02-right-side.png`
- `version-A/views/03-back.png`
- `version-A/views/04-three-quarter.png`
- `version-A/views/05-top-oblique.png`
- `version-A/layers/01-wireframe-only.png`
- `version-A/layers/02-energy-nodes.png`
- `version-A/layers/03-head-beam.png`

**Important:** The eight independent image-generation outputs are visual references only, *not calibrated orthographic views generated from a shared 3D mesh*. Their body proportions, joint placement and photometric details must be reconciled in one canonical mesh before 3D work. The top-oblique image is **not** an orthographic top view. The source artwork is user-supplied; the generated images are reinterpretations.

## Planned 3D pipeline
1. Fix world scale, origin, symmetrical A-pose and body reference.
2. Rebuild unified mesh and align camera orientations.
3. Separate mesh, wireframe, luminous nodes, head beam and postprocessing.
4. Render true orthographic views from the *same* mesh.
5. Export GLB for interactive Three.js and Blender-native asset.

The corresponding 9 images and checksums have been packaged in a downloadable local ZIP, ready for insertion under the above paths. Once uploaded, update the **Status** line and preserve the manifest for source traceability.
