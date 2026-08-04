import React, { useState, useRef, useEffect, Suspense } from "react";
import { FurnitureProduct } from "../types";
import { RotateCcw } from "lucide-react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";

const SOFA_3_PLACES_PRODUCT = {
  id: "p-casbah-sofa",
  name: "Canapé de 3 Places",
  arabicName: "أريكة trois places",
  collection: "El Djazaïr",
  basePrice: 485000,
  description: "L'harmonie ultime entre luxe discret et confort absolu. Ce canapé trois places d'exception se pare d'un habillage en tissu bouclé blanc impérial de prestige. Une assise profonde reposant sur un socle robuste en noyer massif de l'Atlas, entièrement sculptée et façonnée par nos maîtres ébénistes.",
  materials: [
    {
      id: "m-boucle-blanc",
      name: "Bouclé Blanc Impérial",
      type: "Tissu de Prestige" as const,
      colorHex: "#f8fafc",
      extraPrice: 0
    }
  ]
};

function SofaModel(): React.ReactElement {
  const materials = useLoader(MTLLoader, "/assets/3D/HSM0012.mtl");

  const obj = useLoader(
    OBJLoader,
    "/assets/3D/HSM0012.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  const texture = useLoader(
    THREE.TextureLoader,
    "/assets/3D/CasualSofa_Diff.jpg"
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => {
            m.map = texture;
            m.needsUpdate = true;
          });
        } else {
          (child.material as any).map = texture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [obj, texture]);

  // Compute bounding box and center/scale once when obj is loaded
  const { scaleFactor, position, rotation } = React.useMemo(() => {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Camera settings used to project and scale the model
    const cameraPos = new THREE.Vector3(2.8, 1.4, 6.2);
    const targetPos = new THREE.Vector3(0, 0.15, 0);
    const cameraDistance = cameraPos.distanceTo(targetPos);
    const fov = 32;
    const vHeight = 2 * cameraDistance * Math.tan((fov * Math.PI) / 360);
    
    // Scale the model so its width (size.x) fills 72% of the viewport width/height
    const scale = (0.72 * vHeight) / size.x;

    return {
      scaleFactor: scale,
      position: [-center.x, -box.min.z, center.y] as [number, number, number],
      rotation: [-Math.PI / 2, 0, 0] as [number, number, number]
    };
  }, [obj]);

  return (
    <group 
      scale={scaleFactor} 
      position={[0, -0.41, 0]} 
      rotation={[0, THREE.MathUtils.degToRad(18), 0]}
    >
      <primitive
        object={obj}
        position={position}
        rotation={rotation}
      />
    </group>
  );
}

export default function ShowroomHero({ 
  onPlaceInPlanner,
  selectedProduct
}: { 
  onPlaceInPlanner: (productId: string) => void;
  selectedProduct?: FurnitureProduct;
}) {
  const product = SOFA_3_PLACES_PRODUCT;
  const selectedMaterial = product.materials[0];

  const [mouseLightPos, setMouseLightPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  // Mouse move over hero container affects light source coordinates
  const handleMouseMoveLight = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMouseLightPos({ x, y });
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section 
      id="hero-showroom-section"
      ref={containerRef}
      onMouseMove={handleMouseMoveLight}
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-gradient-to-b from-[#02040a] via-[#070b18] to-[#010205] transition-all duration-1000 px-6 lg:px-16 pt-24 pb-12"
    >
      {/* GLOWING AMBIENT LIGHT INDICATOR */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, rgba(0,0,0,0) 70%)",
          left: `${(mouseLightPos.x + 1) * 35}%`,
          top: `${(mouseLightPos.y + 1) * 35}%`,
        }}
      />

      {/* LEFT PANEL: LUXURY DETAILS */}
      <div className="w-full lg:w-5/12 z-10 text-white flex flex-col justify-center space-y-6 lg:pr-8">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-none text-stone-100">
            {product.name}
          </h1>
          <p className="text-xl sm:text-2xl text-amber-200/90 mt-2 font-arabic font-medium">
            {product.arabicName} — Collection {product.collection}
          </p>
        </div>

        <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
          {product.description}
        </p>

        {/* PRICING DETAILS */}
        <div className="p-5 rounded-2xl bg-stone-950/40 border border-white/5 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-stone-400 text-xs uppercase font-mono tracking-wider">Tarif de Prestige</span>
            <span className="text-2xl sm:text-3xl font-serif text-amber-200/95 font-bold">
              {product.basePrice.toLocaleString("fr-DZ")} DZD
            </span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1 border-t border-white/5">
            <span className="text-stone-400 uppercase font-mono tracking-wider">Revêtement</span>
            <span className="text-stone-200 font-medium">{selectedMaterial.name} ({selectedMaterial.type})</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
            className="flex-1 px-8 py-4 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/30 text-sky-200 hover:text-white font-medium text-sm rounded-xl transition-all shadow-lg hover:shadow-sky-500/10 cursor-pointer text-center font-mono tracking-wider uppercase text-[11px]"
          >
            Prendre Rendez-vous / Devis
          </button>
          
          <a
            href="#showroom-viewer"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("showroom-viewer");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-4 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-stone-200 hover:text-white font-medium text-sm rounded-xl transition-all cursor-pointer text-center font-mono"
          >
            Vue 3D Interactive
          </a>
        </div>
      </div>

      {/* RIGHT PANEL: IMMERSIVE 3D RENDER VIEWPORT */}
      <div id="showroom-viewer" className="w-full lg:w-6/12 relative mt-12 lg:mt-0 flex flex-col items-center">
        {/* VIEW SPEC CONTROLLERS */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Reset Camera Orbit */}
          <button
            id="reset-camera-orbit"
            onClick={resetCamera}
            className="p-3 rounded-xl bg-stone-950/60 border border-white/5 text-stone-400 hover:text-white backdrop-blur-md transition-all cursor-pointer"
            title="Réinitialiser l'Angle"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* 3D CANVAS CONTAINER */}
        <div className="relative w-full max-w-[500px] aspect-square">
          <div className="absolute inset-0 rounded-full overflow-hidden border border-white/5 shadow-2xl bg-stone-950">
            <Canvas
              shadows
              camera={{
                position: [2.8, 1.4, 6.2],
                fov: 32
              }}             
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.7} color="#ffffff" />
                <directionalLight
                  castShadow
                  position={[6, 8, 6]}
                  intensity={1.2}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-bias={-0.0001}
                />
                <directionalLight
                  position={[-6, 4, 2]}
                  intensity={0.5}
                />
                
                <SofaModel />

                {/* Soft floor shadow mesh */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.41, 0]} receiveShadow>
                  <planeGeometry args={[10, 10]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>

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
        </div>
      </div>
    </section>
  );
}
