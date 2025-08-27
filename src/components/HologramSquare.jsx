import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HologramSquare({ item, position, onHover, onSelect }) {
  const meshRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  
  const { texture, squarePosition, cellSize } = useMemo(() => {
    const radius = 1.5
    const segments = 16
    const phiStep = Math.PI / segments
    const thetaStep = (2 * Math.PI) / (segments * 2)
    
    // Position at the CENTER of the grid cell
    const phi = position.phiIndex * phiStep + (phiStep / 2)
    const theta = position.thetaIndex * thetaStep + (thetaStep / 2)
    
    // Calculate cell size
    const ringRadius = radius * Math.sin(phi)
    const cellHeight = radius * phiStep * 0.9
    const cellWidth = ringRadius * thetaStep * 0.9
    const cellSize = Math.min(cellHeight, cellWidth)
    
    // Position on sphere surface
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    
    // Create holographic texture
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, 256, 256)
    
    // Extract color components
    const r = (item.color >> 16) & 255
    const g = (item.color >> 8) & 255
    const b = item.color & 255
    
    // Draw holographic background with radial gradient
    const gradient = ctx.createRadialGradient(128, 128, 30, 128, 128, 128)
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
    gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.7)`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.4)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    
    // Draw grid pattern overlay for holographic effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    for (let i = 0; i < 256; i += 16) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 256)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(256, i)
      ctx.stroke()
    }
    
    // Draw outer glow border
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`
    ctx.lineWidth = 6
    ctx.strokeRect(3, 3, 250, 250)
    
    // Draw inner border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, 236, 236)
    
    // Draw logo/text with enhanced glow
    ctx.fillStyle = 'white'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Multiple shadow layers for glow effect
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.fillText(item.logo, 128, 128)
    
    // Secondary glow
    ctx.shadowBlur = 10
    ctx.fillText(item.logo, 128, 128)
    
    // Main text (no shadow)
    ctx.shadowBlur = 0
    ctx.fillText(item.logo, 128, 128)
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    
    return {
      texture,
      squarePosition: [x, y, z],
      cellSize
    }
  }, [item, position])
  
  // Handle hover animations
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.1 : 1
      const targetOpacity = isHovered ? 1 : 0.95
      
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        targetOpacity,
        0.1
      )
    }
  })
  
  const handlePointerEnter = () => {
    setIsHovered(true)
    onHover(item)
  }
  
  const handlePointerLeave = () => {
    setIsHovered(false)
    onHover(null)
  }
  
  const handleClick = () => {
    onSelect(item)
  }
  
  return (
    <mesh
      ref={meshRef}
      position={squarePosition}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <planeGeometry args={[cellSize, cellSize]} />
      <meshBasicMaterial 
        map={texture}
        transparent
        opacity={0.95}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}