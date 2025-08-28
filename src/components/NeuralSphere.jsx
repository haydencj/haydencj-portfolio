import { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { clusters, clusterPositions } from '../data/portfolioData'
import HologramSquare from './HologramSquare'
import WireframeCube from './WireframeSphere'

export default function NeuralCube({ onHover, onSelect }) {
  const groupRef = useRef()
  const { camera } = useThree()
  
  // Create all hologram squares
  const hologramSquares = useMemo(() => {
    const squares = []
    
    Object.keys(clusters).forEach(clusterType => {
      clusters[clusterType].forEach((item, index) => {
        const pos = clusterPositions[clusterType][index]
        if (pos) {
          squares.push({
            ...item,
            position: pos,
            clusterType
          })
        }
      })
    })
    
    return squares
  }, [])

  return (
    <group ref={groupRef}>
      {/* Wireframe cube */}
      <WireframeCube />
      
      {/* Hologram squares */}
      {hologramSquares.map((square, index) => (
        <HologramSquare
          key={square.id}
          item={square}
          position={square.position}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
      
      {/* Controls for mouse interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={5}
        autoRotate={false}
      />
    </group>
  )
}