import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, Float, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. 3D SCENE COMPONENTS
// ==========================================

// A procedural 3D model representing the warmth of the hearth
function HearthCore() {
  const coreRef = useRef();

  // Idle rotation for the geometric hearth
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={coreRef}>
        {/* Inner Glowing Core (The Fire) */}
        <mesh scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ff5722" 
            emissive="#ff2a00" 
            emissiveIntensity={1.2} 
            wireframe 
          />
        </mesh>
        {/* Outer Stone Shell (The Oven) */}
        <mesh scale={1.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.9} 
            metalness={0.1} 
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      {/* Floating Embers/Sparks */}
      <Sparkles count={100} scale={5} size={2} speed={0.4} opacity={0.5} color="#ffb74d" />
    </Float>
  );
}

// ==========================================
// 2. MAIN APPLICATION (UI + 3D INTEGRATION)
// ==========================================

export default function App() {
  const mainRef = useRef();

  // GSAP Scroll Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out Hero Text as user scrolls down
      gsap.to(".hero-text", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        opacity: 0,
      });

      // Fade in Menu Items individually
      gsap.from(".menu-item", {
        scrollTrigger: {
          trigger: ".menu-section",
          start: "top center",
          end: "center center",
          scrub: false,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={mainRef} className="relative w-full bg-zinc-950 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* --- FIXED 3D BACKGROUND --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffa95c" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ff3300" distance={10} />
          
          {/* Interactive controls: Allows user to click and drag the 3D object */}
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]}>
            
            <HearthCore />
            
          </PresentationControls>
          
          {/* Studio lighting environment */}
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* --- SCROLLABLE HTML OVERLAY --- */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Hero Section */}
        <section className="hero-section flex items-center justify-center h-screen px-6">
          <div className="hero-text text-center text-white pointer-events-auto">
            <h1 className="text-5xl md:text-8xl font-serif mb-4 tracking-tight">Chimayo</h1>
            <p className="text-sm md:text-xl font-light tracking-[0.3em] uppercase text-orange-400">
              Stone Fired Kitchen
            </p>
            <p className="mt-8 max-w-md mx-auto italic text-zinc-400">
              Durango's premier stone fired kitchen. Where home is where the hearth is.
            </p>
            <button className="mt-10 px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300">
              Book a Table
            </button>
          </div>
        </section>

        {/* Menu Section */}
        <section className="menu-section min-h-screen bg-zinc-950/80 backdrop-blur-lg text-white py-24 px-6 md:px-20 pointer-events-auto border-t border-zinc-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4 text-orange-50">Spring Menu</h2>
              <div className="h-px w-24 bg-orange-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Menu Item 1 */}
              <div className="menu-item space-y-3">
                <h3 className="text-2xl font-bold text-orange-400">Apple Root Vegetable Soup</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Layered with seasonal sweetness and a smooth, comforting finish. Served with rustic hearth bread.
                </p>
                <span className="block text-zinc-500 font-serif">$12</span>
              </div>

              {/* Menu Item 2 */}
              <div className="menu-item space-y-3">
                <h3 className="text-2xl font-bold text-orange-400">Prosciutto-Wrapped Asparagus</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Fire-roasted and finished with Parmigiano-Reggiano and a drizzle of aged balsamic.
                </p>
                <span className="block text-zinc-500 font-serif">$16</span>
              </div>

              {/* Menu Item 3 */}
              <div className="menu-item space-y-3">
                <h3 className="text-2xl font-bold text-orange-400">Artisanal Hearth Pizza</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Hand-tossed dough, San Marzano tomatoes, fresh mozzarella, and torn basil. Blistered at 800 degrees.
                </p>
                <span className="block text-zinc-500 font-serif">$22</span>
              </div>

              {/* Menu Item 4 */}
              <div className="menu-item space-y-3">
                <h3 className="text-2xl font-bold text-orange-400">Craft Cocktail: Ember & Smoke</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Mezcal, burnt orange peel, agave, and a dash of habanero bitters.
                </p>
                <span className="block text-zinc-500 font-serif">$14</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-zinc-950 text-center py-10 text-zinc-600 pointer-events-auto border-t border-zinc-900">
          <p>862 Main Avenue — Durango, CO — (970) 259-2749</p>
          <p className="mt-2 text-sm">© 2026 Chimayo Stone Fired Kitchen.</p>
        </footer>
      </div>
    </div>
  );
}