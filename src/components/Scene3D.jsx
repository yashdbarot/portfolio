import { Float, Sparkles, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/theme'

const NEON = new THREE.Color('#22d3ee')
const PULSE = new THREE.Color('#a78bfa')

// shared pointer state — updated from window mousemove (canvas itself ignores pointer events)
const mouse = { x: 0, y: 0 }

/**
 * Holographic data bars — a living bar chart floating in space.
 * Very on-brand for a data analyst.
 */
function DataBars() {
  const group = useRef()
  const bars = useMemo(() => {
    const count = 16
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1)
      return {
        x: (i - (count - 1) / 2) * 0.42,
        phase: i * 0.55,
        color: NEON.clone().lerp(PULSE, t),
      }
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current?.children.forEach((bar, i) => {
      const h = 0.35 + Math.abs(Math.sin(t * 0.9 + bars[i].phase)) * 2.1
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, h, 0.12)
      bar.material.opacity = 0.55 + Math.sin(t * 1.4 + bars[i].phase) * 0.2
    })
  })

  return (
    <group ref={group} position={[0, -1.4, -1]}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, 0, 0]}>
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={1.6}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Floating neon geometry — the "space junk" of the scene. */
function FloatingShapes() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh position={[-3.4, 1.4, -2]} rotation={[0.4, 0.2, 0]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#22d3ee" wireframe emissive="#22d3ee" emissiveIntensity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.6} floatIntensity={1.2}>
        <mesh position={[3.6, 0.9, -2.5]}>
          <torusKnotGeometry args={[0.55, 0.16, 90, 14]} />
          <meshStandardMaterial color="#a78bfa" wireframe emissive="#a78bfa" emissiveIntensity={0.7} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2.6, 2.2, -3.5]}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#34d399" wireframe emissive="#34d399" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={1.8}>
        <mesh position={[-2.4, -0.6, -1.5]}>
          <torusGeometry args={[0.5, 0.07, 12, 48]} />
          <meshStandardMaterial color="#22d3ee" wireframe emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </>
  )
}

/** Camera rig — eases toward the pointer for a buttery parallax. */
function Rig({ children }) {
  const group = useRef()

  useEffect(() => {
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.12, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.08 + Math.sin(t * 0.25) * 0.02,
      0.05,
    )
  })

  return <group ref={group}>{children}</group>
}

export default function Scene3D() {
  const { theme } = useTheme()

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={30} color="#22d3ee" />
      <pointLight position={[-6, -4, 2]} intensity={22} color="#a78bfa" />

      <Rig>
        {/* dark sky stars vanish on a light page — swap for floating steel motes */}
        {theme === 'dark' ? (
          <Stars radius={60} depth={40} count={2600} factor={4} saturation={0.6} fade speed={0.6} />
        ) : (
          <Sparkles count={160} scale={[16, 10, 10]} size={3} speed={0.2} color="#0891b2" opacity={0.55} />
        )}
        <Sparkles count={90} scale={[14, 8, 8]} size={2.2} speed={0.25} color="#22d3ee" opacity={0.5} />
        <DataBars />
        <FloatingShapes />
      </Rig>
    </Canvas>
  )
}
