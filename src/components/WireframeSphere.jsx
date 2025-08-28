import { useMemo } from 'react'
import * as THREE from 'three'

export default function WireframeSphere() {
  const geometry = useMemo(() => {
    const radius = 1.5
    const segments = 16
    const points = []
    
    // Create horizontal circles (latitude lines)
    for (let i = 0; i <= segments; i++) {
      const phi = (i / segments) * Math.PI
      const y = radius * Math.cos(phi)
      const ringRadius = radius * Math.sin(phi)
      
      // Create circle at this latitude
      for (let j = 0; j < segments * 2; j++) {
        const theta = (j / (segments * 2)) * Math.PI * 2
        const x = ringRadius * Math.cos(theta)
        const z = ringRadius * Math.sin(theta)
        
        points.push(new THREE.Vector3(x, y, z))
        
        // Connect to next point in ring
        const nextTheta = ((j + 1) / (segments * 2)) * Math.PI * 2
        const nextX = ringRadius * Math.cos(nextTheta)
        const nextZ = ringRadius * Math.sin(nextTheta)
        points.push(new THREE.Vector3(nextX, y, nextZ))
      }
    }
    
    // Create vertical lines (longitude lines)
    for (let j = 0; j < segments * 2; j++) {
      const theta = (j / (segments * 2)) * Math.PI * 2
      
      for (let i = 0; i < segments; i++) {
        const phi1 = (i / segments) * Math.PI
        const phi2 = ((i + 1) / segments) * Math.PI
        
        const y1 = radius * Math.cos(phi1)
        const ringRadius1 = radius * Math.sin(phi1)
        const x1 = ringRadius1 * Math.cos(theta)
        const z1 = ringRadius1 * Math.sin(theta)
        
        const y2 = radius * Math.cos(phi2)
        const ringRadius2 = radius * Math.sin(phi2)
        const x2 = ringRadius2 * Math.cos(theta)
        const z2 = ringRadius2 * Math.sin(theta)
        
        points.push(new THREE.Vector3(x1, y1, z1))
        points.push(new THREE.Vector3(x2, y2, z2))
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial 
        color="#20C20E" 
        transparent 
        opacity={1} 
      />
    </lineSegments>
  )
}