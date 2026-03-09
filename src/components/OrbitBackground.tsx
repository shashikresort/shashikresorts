"use client"

import React from 'react';
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { ParticleSphere } from "./ui/3d-orbit-gallery"

export const OrbitBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full overflow-hidden bg-black/95">
      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 w-full h-full z-0 opacity-40">
        <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleSphere />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  )
}
