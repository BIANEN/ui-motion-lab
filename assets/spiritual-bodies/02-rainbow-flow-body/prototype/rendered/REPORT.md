# Procedural renderer smoke report

- Environment: GitHub Actions Ubuntu + Playwright Chromium 141.0.7390.37
- Verified same scene camera presets: FRONT, RIGHT, BACK, 45°, TOP
- Verified 16 3D curve paths / 32 core+halo meshes, 6 energy nodes, 18 body mesh components, 5 crown rings
- Verified independent layer toggles: body, flow, nodes, crown, Bloom
- Verified flow speed input and animation pause controls
- Generated 5 source-code-rendered PNG views from one live WebGL scene
- **Does NOT establish accuracy against the source artwork or performance acceptability. Stage A/B still DRAFT.**
