import { useMemo } from 'react'
import * as THREE from 'three'

export default function WireframeCube() {
  const geometry = useMemo(() => {
    const size = 2.5
    const segments = 8
    const points = []
    
    // Calculate step size for grid
    const step = size / segments
    const halfSize = size / 2
    
    // Create wireframe grid on each face of the cube
    
    // Front face (z = halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x1 = -halfSize + j * step
        const x2 = -halfSize + (j + 1) * step
        const y = -halfSize + i * step
        points.push(new THREE.Vector3(x1, y, halfSize))
        points.push(new THREE.Vector3(x2, y, halfSize))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x = -halfSize + i * step
        const y1 = -halfSize + j * step
        const y2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(x, y1, halfSize))
        points.push(new THREE.Vector3(x, y2, halfSize))
      }
    }
    
    // Back face (z = -halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x1 = -halfSize + j * step
        const x2 = -halfSize + (j + 1) * step
        const y = -halfSize + i * step
        points.push(new THREE.Vector3(x1, y, -halfSize))
        points.push(new THREE.Vector3(x2, y, -halfSize))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x = -halfSize + i * step
        const y1 = -halfSize + j * step
        const y2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(x, y1, -halfSize))
        points.push(new THREE.Vector3(x, y2, -halfSize))
      }
    }
    
    // Left face (x = -halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const z1 = -halfSize + j * step
        const z2 = -halfSize + (j + 1) * step
        const y = -halfSize + i * step
        points.push(new THREE.Vector3(-halfSize, y, z1))
        points.push(new THREE.Vector3(-halfSize, y, z2))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const z = -halfSize + i * step
        const y1 = -halfSize + j * step
        const y2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(-halfSize, y1, z))
        points.push(new THREE.Vector3(-halfSize, y2, z))
      }
    }
    
    // Right face (x = halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const z1 = -halfSize + j * step
        const z2 = -halfSize + (j + 1) * step
        const y = -halfSize + i * step
        points.push(new THREE.Vector3(halfSize, y, z1))
        points.push(new THREE.Vector3(halfSize, y, z2))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const z = -halfSize + i * step
        const y1 = -halfSize + j * step
        const y2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(halfSize, y1, z))
        points.push(new THREE.Vector3(halfSize, y2, z))
      }
    }
    
    // Top face (y = halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x1 = -halfSize + j * step
        const x2 = -halfSize + (j + 1) * step
        const z = -halfSize + i * step
        points.push(new THREE.Vector3(x1, halfSize, z))
        points.push(new THREE.Vector3(x2, halfSize, z))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x = -halfSize + i * step
        const z1 = -halfSize + j * step
        const z2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(x, halfSize, z1))
        points.push(new THREE.Vector3(x, halfSize, z2))
      }
    }
    
    // Bottom face (y = -halfSize)
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x1 = -halfSize + j * step
        const x2 = -halfSize + (j + 1) * step
        const z = -halfSize + i * step
        points.push(new THREE.Vector3(x1, -halfSize, z))
        points.push(new THREE.Vector3(x2, -halfSize, z))
      }
    }
    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j < segments; j++) {
        const x = -halfSize + i * step
        const z1 = -halfSize + j * step
        const z2 = -halfSize + (j + 1) * step
        points.push(new THREE.Vector3(x, -halfSize, z1))
        points.push(new THREE.Vector3(x, -halfSize, z2))
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