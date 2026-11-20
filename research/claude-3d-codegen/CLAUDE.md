# CLAUDE.md — Claude 3D Codegen Research Entry

> Scope: this directory and any work derived from it.
> Purpose: build *working, inspectable, reusable* 3D graphics software and video pipelines from visual briefs.

## 1. Mandatory reading order

1. Read [README.md](README.md) for file map and links to existing `ui-motion-lab` experiments.
2. Read [docs/reading-guide.md](docs/reading-guide.md).
3. Read the matching full engineering prompt from [docs/engineering-prompts-and-workflows.md](docs/engineering-prompts-and-workflows.md): A1/A2 for interactive 3D web, B1/B2/B3 for deterministic code-to-video, C1/C2/C3 for Blender Python, D for hybrid, E for QA.
4. Inspect [data/open-source-case-database.md](data/open-source-case-database.md) for candidates, evidence levels and license warnings. Do **not** assume every listed case can be copied commercially.
5. Instantiate [scene-brief.template.md](scene-brief.template.md) and record user-specific scene requirements.
6. For multi-view reconstruction, read [../../assets/spiritual-bodies/3D-ASSET-REVIEW-V1.md](../../assets/spiritual-bodies/3D-ASSET-REVIEW-V1.md) before approving a model. Preserve links/credit to the original asset references.

## 2. Choose exactly one primary production track

- **A — Interactive 3D web:** Vite + TypeScript + Three.js + shader modules. Build procedural geometry/particles and local pointer interaction. Provide source files, run commands and smoke tests. Must be an actual 3D scene, not a 2D perspective fake.
- **B — Deterministic code-to-video:** Three.js + explicit `seek(t)`/renderAt(frame) + screenshot frames + FFmpeg. Render 3–5 checkpoints before all frames. Do not assert the MP4 exists until verified.
- **C — Offline cinematic 3D:** Blender Python (`bpy`) with scene/model/material/light/camera generation and background frame rendering. Produce `scene.py`, `.blend`, preview stills, frame sequence and MP4 when execution permits.
- **D — Hybrid:** shared scene-spec.json; Blender optional asset generation, glTF handoff and Three.js runtime plus independently validated video. No guarantee of pixel equivalence.

Ask for essential reference inputs only if truly required; otherwise choose reasonable documented defaults and proceed with a minimal demonstrable scene.

## 3. Non-negotiable build and quality contract

- Deliver a **complete project**, not just pseudo-code, screenshots or general advice.
- Keep implementation modular; configurable `seed`, particle count/detail, lighting, bloom, camera, interaction and export settings.
- Make the temporal render reproducible: compute states from explicit time and fixed seed; don't claim determinism from `Math.random` seeding alone when stateful physics is involved.
- Verify 3D depth with **front, side and three-quarter** viewpoints. For reference reconstruction include a comparison ledger: what is matched, approximate or missing.
- For interaction: bounded local mouse/touch response, smooth eased contact, shockwave, reconstruction, orbit and mobile quality fallback as appropriate.
- Record **actual** build commands, console results, keyframes, test captures, performance measurements and limitations. A target such as 60 FPS is not an observed benchmark.
- Keep source links and license notes. Differentiate **learning a technique** from reproducing protected artistic expression; do not copy unlicensed assets.
- Work in a new experiment directory unless explicitly told to modify existing work; **do not replace the root `index.html` or existing `experiments/human-mesh`**.
- For Blender MCP, assume AI can execute Python: sandbox, inspect commands, and protect credentials/private files.

## 4. Standard iterative delivery

1. `scene-brief.md`: clear visual specification, interaction and export contract.
2. `src/` with all runnable files and pinned dependencies or `scene.py` with a tested Blender invocation.
3. Preview checkpoint(s), screenshot evidence and short deviation analysis.
4. Fix morphologies and camera first; materials second; interaction/timing third.
5. `README.md`: exact installation and use, parameter guide, source licenses.
6. `QA.md`: tested vs untested, real output paths, known limitations, next iteration.

## 5. Copy-paste instruction for a new task

```text
Follow research/claude-3d-codegen/CLAUDE.md. Study the full prompt A1/B1/C1
from docs/engineering-prompts-and-workflows.md according to the output I want.
Read the case database for techniques and rights constraints.
Use scene-brief.template.md to formalize my visual reference.
Build the actual code project and show verified screenshots/tests.
Do not modify unrelated existing experiments.
```

## 6. Existing examples and status

- `assets/spiritual-bodies/02-rainbow-flow-body/prototype/`: 3D code-ready pilot, **not** a final fidelity-certified replica.
- `experiments/human-mesh/`: existing particle-body experiment; review its own README and architecture first.
- The archived research materials are research, templates and source indexes. They are **not** proof that the described B/C rendering pipelines have been built.

Version: V1.0 guidance authored 2026-11-21, based on the 2026-11-20 archived research.
