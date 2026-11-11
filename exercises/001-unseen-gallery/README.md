# Day 01 — The Unseen Gallery

## Goal / 目标
Build a cinematic, dark 3D gallery in which the user's pointer controls a soft spotlight.
The objects are not external models — all three are procedural Three.js geometries.

## Interaction / 交互
- MOVE: A warm spotlight tracks the cursor with a slight lag.
- HOVER: The sculpture lifts slightly and its emissive highlight rises.
- CLICK: The camera moves toward the selected sculpture over 1.6 seconds.
- RETURN: Press Esc or click RETURN TO GALLERY.
- MOBILE: Use the accessible object buttons to select a sculpture.
- REDUCED MOTION: Camera moves immediately and passive object rotation stops.

## Files / 文件
Implementation: src/exercises/001-unseen-gallery/UnseenGallery.jsx
Visual UI: src/styles.css

## Practice checklist / 练习清单
1. Change the spotlight's color and cone angle in ResponsiveLighting.
2. Replace one of the geometric primitives in ArtifactGeometry.
3. Change camera motion duration from 1.6s to 2.5s.
4. Try a stronger dark-to-light contrast.
5. Write down your intended custom element before adding any new assets.

## Acceptance / 验收
- Local dev server starts without errors.
- Three sculptures appear above plinths in a dark gallery.
- Pointer changes the spotlight; hover has visible feedback.
- Click and Return work from both scene and control buttons.
- There are no console errors on desktop.
- Mobile buttons and the reduced-motion preference work.

## Development / 启动
Run npm install, then npm run dev. For a production smoke test run npm run build.

This is an original practice implementation of common spatial interaction principles, not a copy of third-party site code or assets.
