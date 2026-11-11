import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Object3D, Vector3 } from 'three';
import gsap from 'gsap';

const WORKS = [
  {
    id: '01',
    name: 'VESSEL',
    kind: 'stone',
    description: '光从形态的棱角开始出现。',
    x: -3.1,
    color: '#9d9b96',
    metalness: 0.12,
    roughness: 0.77
  },
  {
    id: '02',
    name: 'ORBIT',
    kind: 'metal',
    description: '环绕与缠绕构成一条连续路径。',
    x: 0,
    color: '#9c8e75',
    metalness: 0.84,
    roughness: 0.27
  },
  {
    id: '03',
    name: 'PRISM',
    kind: 'glass',
    description: '倾斜的平面截取了细微的光。',
    x: 3.1,
    color: '#777c83',
    metalness: 0.48,
    roughness: 0.19
  }
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function GalleryArchitecture() {
  return (
    <group>
      <color attach="background" args={['#060608']} />
      <fog attach="fog" args={['#060608', 12, 23]} />
      <mesh receiveShadow position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#171719" roughness={0.96} />
      </mesh>
      <mesh receiveShadow position={[0, 2.3, -4.6]}>
        <boxGeometry args={[20, 8.4, 0.2]} />
        <meshStandardMaterial color="#101013" roughness={0.93} />
      </mesh>
      {[-6.3, -2.1, 2.1, 6.3].map((x) => (
        <mesh key={x} receiveShadow position={[x, 2, -4.43]}>
          <boxGeometry args={[0.11, 8, 0.15]} />
          <meshStandardMaterial color="#242328" roughness={0.9} />
        </mesh>
      ))}
      {WORKS.map((work) => (
        <group key={work.id} position={[work.x, -1.35, 0]}>
          <mesh receiveShadow castShadow>
            <cylinderGeometry args={[0.85, 0.92, 0.54, 48]} />
            <meshStandardMaterial color="#343237" roughness={0.92} metalness={0.05} />
          </mesh>
          <mesh receiveShadow position={[0, 0.29, 0]}>
            <cylinderGeometry args={[0.81, 0.81, 0.045, 48]} />
            <meshStandardMaterial color="#545159" roughness={0.79} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ResponsiveLighting({ selected }) {
  const light = useRef();
  const lightTarget = useMemo(() => new Object3D(), []);
  const temp = useMemo(() => new Vector3(), []);

  useFrame(({ pointer }, dt) => {
    const ease = 1 - Math.exp(-3.5 * dt);
    let x = pointer.x * 5.8;
    let y = pointer.y * 2.7;
    if (selected !== null) {
      x = MathUtils.lerp(x, WORKS[selected].x, 0.58);
      y *= 0.4;
    }
    lightTarget.position.lerp(temp.set(x, y, 0), ease);
    lightTarget.updateMatrixWorld();

    if (light.current) {
      light.current.position.lerp(
        temp.set(x * 0.25 + 1.25, 4.9 + y * 0.1, 5.6),
        1 - Math.exp(-2.6 * dt)
      );
    }
  });

  return (
    <>
      <primitive object={lightTarget} />
      <ambientLight intensity={0.085} />
      <hemisphereLight args={['#d1d4ef', '#111015', 0.12]} />
      <spotLight
        ref={light}
        target={lightTarget}
        position={[1.25, 4.9, 5.6]}
        color="#fbf4e8"
        intensity={95}
        angle={0.55}
        penumbra={0.84}
        distance={17}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 4, -2.5]} color="#bac6e9" intensity={0.45} />
    </>
  );
}

function ArtifactGeometry({ kind }) {
  if (kind === 'stone') return <icosahedronGeometry args={[0.91, 1]} />;
  if (kind === 'metal') return <torusKnotGeometry args={[0.66, 0.19, 150, 18, 2, 5]} />;
  return <octahedronGeometry args={[0.98, 0]} />;
}

function Artifact({ work, index, selected, onSelect, reduced }) {
  const group = useRef();
  const material = useRef();
  const [hovered, setHovered] = useState(false);
  const active = selected === index;

  useFrame((_, dt) => {
    if (!group.current) return;
    if (!reduced) group.current.rotation.y += dt * (0.05 + index * 0.012);
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      hovered || active ? 0.12 : 0,
      4.8,
      dt
    );
    if (material.current) {
      material.current.emissiveIntensity = MathUtils.damp(
        material.current.emissiveIntensity,
        hovered || active ? 0.25 : 0.017,
        5.5,
        dt
      );
    }
  });

  return (
    <group
      ref={group}
      position={[work.x, 0, 0]}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={(event) => { event.stopPropagation(); setHovered(false); }}
      onClick={(event) => { event.stopPropagation(); onSelect(index); }}
    >
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <ArtifactGeometry kind={work.kind} />
        <meshPhysicalMaterial
          ref={material}
          color={work.color}
          metalness={work.metalness}
          roughness={work.roughness}
          clearcoat={0.44}
          clearcoatRoughness={0.16}
          emissive="#938778"
          emissiveIntensity={0.017}
        />
      </mesh>
      {work.kind === 'glass' && (
        <mesh rotation={[Math.PI / 2.7, 0.35, 0]} castShadow>
          <torusGeometry args={[1.17, 0.027, 9, 92]} />
          <meshStandardMaterial color="#a9afba" metalness={0.8} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
}

function CameraRig({ selected, reduced }) {
  const { camera } = useThree();
  const focus = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    const x = selected === null ? 0 : WORKS[selected].x;
    const y = selected === null ? 1.25 : 0.57;
    const z = selected === null ? 11.5 : 4.25;
    const targetY = selected === null ? 0 : 0.05;

    if (reduced) {
      camera.position.set(x, y, z);
      focus.current.set(x, targetY, 0);
      return;
    }

    const timeline = gsap.timeline({ defaults: { duration: 1.6, ease: 'power3.inOut' } });
    timeline.to(camera.position, { x, y, z }, 0);
    timeline.to(focus.current, { x, y: targetY, z: 0 }, 0);

    return () => timeline.kill();
  }, [camera, selected, reduced]);

  useFrame(() => {
    camera.lookAt(focus.current);
  });

  return null;
}

function GalleryScene({ selected, setSelected, reduced }) {
  return (
    <>
      <GalleryArchitecture />
      <ResponsiveLighting selected={selected} />
      <CameraRig selected={selected} reduced={reduced} />
      {WORKS.map((work, index) => (
        <Artifact
          key={work.id}
          work={work}
          index={index}
          selected={selected}
          onSelect={setSelected}
          reduced={reduced}
        />
      ))}
    </>
  );
}

export default function UnseenGallery() {
  const [selected, setSelected] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className="gallery">
      <div className="scene" aria-label="Interactive 3D gallery with three sculptures">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 1.25, 11.5], fov: 44, near: 0.1, far: 70 }}
          fallback={<div className="webgl-fallback">WebGL unavailable. Try a browser with 3D graphics enabled.</div>}
        >
          <GalleryScene selected={selected} setSelected={setSelected} reduced={reduced} />
        </Canvas>
      </div>

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">◈</span>
          <span>UI MOTION LAB</span>
          <span className="brand-divider" />
          <span className="brand-subtitle">EXP. 001</span>
        </div>
        <span className="top-right">AN INTERACTIVE LIGHT STUDY <span className="active-dot" /></span>
      </header>

      <div className="hero-caption">
        <p className="eyebrow">CHAPTER 001 / LIGHT AS INTERFACE</p>
        <h1>THE UNSEEN<br /><em>GALLERY.</em></h1>
        <p>Not everything is meant to be seen at once.<br />Move the light. Discover what remains.</p>
      </div>

      <section className="works" aria-label="Choose a gallery sculpture">
        {WORKS.map((work, index) => (
          <button
            key={work.id}
            type="button"
            className={'work-button' + (selected === index ? ' is-active' : '')}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <span className="work-id">{work.id} /</span>
            <span className="work-name">{work.name}</span>
            <span className="work-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </section>

      {selected !== null && (
        <aside className="detail-panel" aria-live="polite">
          <span className="eyebrow">OBJECT / {WORKS[selected].id}</span>
          <h2>{WORKS[selected].name}</h2>
          <p>{WORKS[selected].description}</p>
          <button type="button" onClick={() => setSelected(null)} className="return-button">
            ← RETURN TO GALLERY
          </button>
        </aside>
      )}

      <footer className="footer">
        <span>MOVE TO REVEAL · CLICK TO FOCUS · ESC TO RETURN</span>
        <span>{reduced ? 'REDUCED MOTION ENABLED' : 'THREE.JS / GSAP / R3F'}</span>
      </footer>
    </main>
  );
}
