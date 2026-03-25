import { Suspense } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'

function LowPolyCar(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.7, 0.55, 1.25]} />
        <meshPhysicalMaterial
          color="#a855f7"
          metalness={0.7}
          roughness={0.22}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0.2, 1.15, 0]}>
        <boxGeometry args={[1.35, 0.65, 1.1]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          metalness={0.35}
          roughness={0.08}
          transmission={0.22}
          transparent
        />
      </mesh>

      <mesh position={[1.38, 0.72, 0]}>
        <boxGeometry args={[0.22, 0.18, 1.02]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={1.6} />
      </mesh>

      <mesh position={[-1.38, 0.72, 0]}>
        <boxGeometry args={[0.22, 0.18, 1.02]} />
        <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={1.4} />
      </mesh>

      {[
        [-0.95, 0.35, 0.82],
        [0.95, 0.35, 0.82],
        [-0.95, 0.35, -0.82],
        [0.95, 0.35, -0.82],
      ].map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.12, 20, 32]} />
            <meshStandardMaterial color="#020617" roughness={0.84} metalness={0.1} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 24]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.65} roughness={0.24} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function CarScene() {
  return (
    <div className="glass-panel overflow-hidden rounded-[2rem]">
      <div className="relative h-[24rem] w-full md:h-[34rem]">
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          camera={{ position: [4.8, 2.6, 6.2], fov: 40 }}
        >
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 7, 5]} intensity={2.2} color="#f5d0fe" />
          <pointLight position={[-4, 2, -4]} intensity={1.7} color="#22d3ee" />

          <Suspense fallback={null}>
            <group position={[0, -0.2, 0]}>
              <LowPolyCar rotation={[0, -0.55, 0]} />
              <ContactShadows
                position={[0, -0.3, 0]}
                scale={8}
                blur={2.6}
                opacity={0.55}
              />
            </group>
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-1}
            maxAzimuthAngle={0.2}
          />
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
      </div>
    </div>
  )
}
