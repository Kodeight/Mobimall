import React, { useState, useRef, useEffect, Suspense } from "react";
import { FurnitureProduct } from "../types";
import { RotateCcw } from "lucide-react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";
import { useTheme } from "../ThemeContext";

/* ── Product data ──────────────────────────────────────────── */
const SOFA_3_PLACES_PRODUCT = {
  id: "p-casbah-sofa",
  name: "Canapé de 3 Places",
  arabicName: "أريكة trois places",
  collection: "El Djazaïr",
  basePrice: 485000,
  description:
    "L'harmonie ultime entre luxe discret et confort absolu. Ce canapé trois places d'exception se pare d'un habillage en tissu bouclé blanc impérial de prestige. Une assise profonde reposant sur un socle robuste en noyer massif de l'Atlas, entièrement sculptée et façonnée par nos maîtres ébénistes.",
  materials: [
    {
      id: "m-boucle-blanc",
      name: "Bouclé Blanc Impérial",
      type: "Tissu de Prestige" as const,
      colorHex: "#f8fafc",
      extraPrice: 0,
    },
  ],
};

/* ── Reduced motion detection ──────────────────────────────── */
function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── Sparkle element ───────────────────────────────────────── */
interface SparkleProps {
  style: React.CSSProperties;
  size: number;
  delay: number;
  duration: number;
  driftDuration: number;
  minOpacity: number;
  maxOpacity: number;
}

function Sparkle({ style, size, delay, duration, driftDuration, minOpacity, maxOpacity }: SparkleProps) {
  return (
    <div
      aria-hidden="true"
      className="sparkle"
      style={{
        ...style,
        width: size,
        height: size,
        "--sparkle-duration": `${duration}s`,
        "--sparkle-drift-duration": `${driftDuration}s`,
        "--sparkle-min-opacity": minOpacity,
        "--sparkle-max-opacity": maxOpacity,
        animationDelay: `${delay}s, ${delay * 0.7}s`,
      } as React.CSSProperties}
    >
      {/* 4-pointed star shape via CSS cross */}
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" />
      </svg>
    </div>
  );
}

interface SparkleConfigItem {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  driftDuration: number;
  minOpacity: number;
  maxOpacity: number;
}

/* Sparse sparkle positions around the sofa viewport */
const SPARKLE_CONFIG: SparkleConfigItem[] = [
  { top: "14%",  left: "12%",  size: 5,  delay: 0.0, duration: 3.8, driftDuration: 5.2, minOpacity: 0.08, maxOpacity: 0.45 },
  { top: "8%",   left: "68%",  size: 7,  delay: 1.1, duration: 4.6, driftDuration: 7.0, minOpacity: 0.12, maxOpacity: 0.55 },
  { top: "28%",  left: "88%",  size: 4,  delay: 0.6, duration: 5.2, driftDuration: 6.4, minOpacity: 0.07, maxOpacity: 0.38 },
  { top: "62%",  left: "90%",  size: 6,  delay: 2.0, duration: 3.5, driftDuration: 5.8, minOpacity: 0.10, maxOpacity: 0.42 },
  { top: "78%",  left: "76%",  size: 4,  delay: 0.4, duration: 4.9, driftDuration: 6.2, minOpacity: 0.08, maxOpacity: 0.35 },
  { top: "82%",  left: "18%",  size: 5,  delay: 1.7, duration: 4.2, driftDuration: 5.6, minOpacity: 0.09, maxOpacity: 0.40 },
  { top: "58%",  left: "6%",   size: 8,  delay: 0.9, duration: 5.8, driftDuration: 7.4, minOpacity: 0.06, maxOpacity: 0.50 },
  { top: "38%",  left: "4%",   size: 4,  delay: 2.4, duration: 3.2, driftDuration: 5.0, minOpacity: 0.07, maxOpacity: 0.32 },
  { top: "18%",  left: "46%",  size: 5,  delay: 1.3, duration: 4.4, driftDuration: 6.8, minOpacity: 0.06, maxOpacity: 0.28 },
];

/* ── 3D Sofa Model with entrance animation ─────────────────── */
function SofaModel(): React.ReactElement {
  const materials = useLoader(MTLLoader, "/assets/3D/HSM0012.mtl");
  const obj = useLoader(OBJLoader, "/assets/3D/HSM0012.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  const texture = useLoader(THREE.TextureLoader, "/assets/3D/CasualSofa_Diff.jpg");

  const groupRef = useRef<THREE.Group>(null);
  const animDoneRef = useRef<boolean>(false);

  // Final resting Y rotation (18° offset that was in the original)
  const FINAL_Y = THREE.MathUtils.degToRad(18);
  // Entrance start: 180° past the final angle
  const START_Y = FINAL_Y + Math.PI;

  // Initialize rotation before first render frame
  useEffect(() => {
    if (!groupRef.current) return;
    if (prefersReducedMotion()) {
      // Reduced motion: skip rotation animation, settle immediately
      groupRef.current.rotation.y = FINAL_Y;
      animDoneRef.current = true;
    } else {
      groupRef.current.rotation.y = START_Y;
    }
  }, []);

  // Apply texture to all meshes
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => { m.map = texture; m.needsUpdate = true; });
        } else {
          (child.material as any).map = texture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [obj, texture]);

  // Compute bounding box centering/scaling
  const { scaleFactor, position, rotation } = React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const cameraPos = new THREE.Vector3(2.8, 1.4, 6.2);
    const targetPos = new THREE.Vector3(0, 0.15, 0);
    const cameraDistance = cameraPos.distanceTo(targetPos);
    const fov = 32;
    const vHeight = 2 * cameraDistance * Math.tan((fov * Math.PI) / 360);
    const scale = (0.72 * vHeight) / size.x;
    return {
      scaleFactor: scale,
      position: [-center.x, -box.min.z, center.y] as [number, number, number],
      rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    };
  }, [obj]);

  // Entrance animation — critically damped spring approximation via exponential decay
  // Apple spring reference: response ≈ 0.35s, damping = 1.0 (no overshoot)
  useFrame((_, delta) => {
    if (animDoneRef.current || !groupRef.current) return;

    const current = groupRef.current.rotation.y;
    // Exponential decay: time constant τ = 0.35s
    // Each frame: current += (target - current) * (1 - e^(-dt/τ))
    const tau = 0.38;
    const factor = 1 - Math.exp(-delta / tau);
    const next = current + (FINAL_Y - current) * factor;

    groupRef.current.rotation.y = next;

    // Stop when within 0.001 rad of target (~0.057°)
    if (Math.abs(next - FINAL_Y) < 0.001) {
      groupRef.current.rotation.y = FINAL_Y;
      animDoneRef.current = true;
    }
  });

  return (
    <group ref={groupRef} scale={scaleFactor} position={[0, -0.41, 0]}>
      <primitive object={obj} position={position} rotation={rotation} />
    </group>
  );
}

/* ── Negative-color grounding shadow ───────────────────────── */
function NegativeShadow({ theme }: { theme: "dark" | "light" }) {
  // Dark mode: warm amber/gold tones inverted against dark background
  // Light mode: cool shadow pressing into warm background
  const isDark = theme === "dark";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "70%",
        height: "18%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Outer diffuse halo */}
      <div
        style={{
          position: "absolute",
          inset: "-30% -20%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(120,100,60,0.09) 0%, rgba(80,100,180,0.05) 45%, transparent 75%)"
            : "radial-gradient(ellipse at center, rgba(80,60,30,0.08) 0%, rgba(40,60,120,0.04) 45%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />
      {/* Mid shadow */}
      <div
        style={{
          position: "absolute",
          inset: "-10% -5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(160,140,90,0.10) 0%, rgba(60,80,160,0.06) 50%, transparent 80%)"
            : "radial-gradient(ellipse at center, rgba(100,80,40,0.09) 0%, rgba(30,50,120,0.04) 50%, transparent 80%)",
          filter: "blur(14px)",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
      {/* Core contact shadow — tightest, most grounded */}
      <div
        style={{
          position: "absolute",
          inset: "20% 15%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(200,180,110,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(120,100,50,0.07) 0%, transparent 70%)",
          filter: "blur(8px)",
          mixBlendMode: isDark ? "color-dodge" : "color-burn",
        }}
      />
    </div>
  );
}

/* ── ShowroomHero ───────────────────────────────────────────── */
export default function ShowroomHero({
  onPlaceInPlanner,
  selectedProduct: _selectedProduct,
}: {
  onPlaceInPlanner: (productId: string) => void;
  selectedProduct?: FurnitureProduct;
}) {
  const product = SOFA_3_PLACES_PRODUCT;
  const selectedMaterial = product.materials[0];
  const { theme } = useTheme();

  const [mouseLightPos, setMouseLightPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const handleMouseMoveLight = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseLightPos({ x, y });
  };

  const resetCamera = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  const isDark = theme === "dark";

  return (
    <section
      id="hero-showroom-section"
      ref={containerRef}
      onMouseMove={handleMouseMoveLight}
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden px-6 lg:px-16 pt-24 pb-12"
      style={{ background: `linear-gradient(160deg, var(--bg-base) 0%, var(--bg-mid) 60%, var(--bg-base) 100%)` }}
    >
      {/* Ambient mouse-tracking glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(2,132,199,0.05) 0%, transparent 70%)",
          left: `${(mouseLightPos.x + 1) * 35}%`,
          top: `${(mouseLightPos.y + 1) * 35}%`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
          transition: "left 1s ease, top 1s ease",
        }}
      />

      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className="w-full lg:w-5/12 z-10 flex flex-col justify-center space-y-7 lg:pr-8" style={{ color: "var(--text-primary)" }}>
        <div>
          <h1
            className="type-display"
            style={{ color: "var(--text-primary)" }}
          >
            {product.name}
          </h1>
          <p
            className="text-xl sm:text-2xl mt-2 font-medium"
            style={{ fontFamily: "var(--font-serif)", color: "var(--text-accent)", fontStyle: "italic" }}
          >
            {product.arabicName} — Collection {product.collection}
          </p>
        </div>

        <p
          className="type-body-sm font-light leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.description}
        </p>

        {/* Pricing card */}
        <div
          className="p-5 rounded-2xl space-y-4"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex justify-between items-baseline">
            <span className="type-label" style={{ color: "var(--text-tertiary)" }}>
              Tarif de Prestige
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)",
                fontWeight: 700,
                color: "var(--text-accent)",
              }}
            >
              {product.basePrice.toLocaleString("fr-DZ")} DZD
            </span>
          </div>

          <div
            className="flex justify-between items-center text-xs pt-1"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <span className="type-label" style={{ color: "var(--text-tertiary)" }}>
              Revêtement
            </span>
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
              {selectedMaterial.name} ({selectedMaterial.type})
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            id="add-to-cart-hero-btn"
            onClick={() => {
              const el = document.getElementById("appointment-contact-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                onPlaceInPlanner(product.id);
              }
            }}
            className="btn-press flex-1 px-8 py-3.5 rounded-xl font-medium text-center transition-colors duration-200 cursor-pointer"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.70rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Prendre Rendez-vous / Devis
          </button>

          <a
            href="#showroom-viewer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("showroom-viewer")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-press px-6 py-3.5 rounded-xl font-medium text-center transition-colors duration-200 cursor-pointer"
            style={{
              background: "var(--surface-glass)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.70rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Vue 3D Interactive
          </a>
        </div>
      </div>

      {/* ── RIGHT PANEL: 3D VIEWPORT ────────────────────────── */}
      <div
        id="showroom-viewer"
        className="w-full lg:w-6/12 relative mt-12 lg:mt-0 flex flex-col items-center"
      >
        {/* Camera reset button */}
        <div className="absolute top-2 right-2 z-20">
          <button
            id="reset-camera-orbit"
            onClick={resetCamera}
            className="btn-press p-2.5 rounded-xl transition-colors cursor-pointer"
            title="Réinitialiser l'Angle"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-tertiary)",
              backdropFilter: "blur(12px)",
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 3D canvas container — no rounded-full, no bg-stone-950 */}
        <div className="relative w-full max-w-[520px]" style={{ aspectRatio: "1 / 1" }}>
          {/* Subtle outer ring — very light, not a solid black circle */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-lg), var(--shadow-glow)",
            }}
          />

          {/* Sparkles — around viewport area */}
          {SPARKLE_CONFIG.map((cfg, i) => (
            <Sparkle
              key={i}
              size={cfg.size}
              delay={cfg.delay}
              duration={cfg.duration}
              driftDuration={cfg.driftDuration}
              minOpacity={cfg.minOpacity}
              maxOpacity={cfg.maxOpacity}
              style={{ top: cfg.top, left: cfg.left }}
            />
          ))}

          {/* Negative-color grounding shadow */}
          <NegativeShadow theme={theme} />

          {/* Canvas — transparent background, no circular clip */}
          <Canvas
            shadows
            camera={{ position: [2.8, 1.4, 6.2], fov: 32 }}
            className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl"
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={isDark ? 0.65 : 0.9} color={isDark ? "#e8f0ff" : "#fff8f0"} />
              <directionalLight
                castShadow
                position={[6, 8, 6]}
                intensity={isDark ? 1.2 : 1.5}
                color={isDark ? "#ffffff" : "#fff5e0"}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
              />
              <directionalLight
                position={[-6, 4, 2]}
                intensity={isDark ? 0.45 : 0.6}
                color={isDark ? "#c0d0ff" : "#ffe8d0"}
              />
              <directionalLight
                position={[0, -2, 4]}
                intensity={isDark ? 0.15 : 0.25}
                color={isDark ? "#304060" : "#f0e8d8"}
              />

              <SofaModel />

              <OrbitControls
                ref={controlsRef}
                target={[0, 0.21, 0]}
                enablePan={false}
                enableZoom
                enableRotate
                minDistance={5.8}
                maxDistance={9}
                minPolarAngle={Math.PI / 2.35}
                maxPolarAngle={Math.PI / 2.05}
                makeDefault
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Label beneath viewport */}
        <p
          className="mt-4 type-label text-center"
          style={{ color: "var(--text-tertiary)" }}
        >
          Glisser pour faire pivoter · Pincer pour zoomer
        </p>
      </div>
    </section>
  );
}
