import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HologramSquare({ item, position, onHover, onSelect }) {
  const meshRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [svgContent, setSvgContent] = useState(null)
  
  // Load SVG for experience items
  useEffect(() => {
    if (item.category && item.category.includes('Stack Developer') || item.category.includes('Engineering Intern')) {
      // Map item IDs to SVG files
      const svgMap = {
        'jpmorgan': '/src/public/jpmorgan-logo.svg',
        'oncor': '/src/public/oncor-logo.svg', 
        'hennge': '/src/public/hennge-logo.svg'
      }
      
      const svgPath = svgMap[item.id]
      if (svgPath) {
        fetch(svgPath)
          .then(response => response.text())
          .then(svg => {
            // Convert SVG to white by replacing fill colors
            const whiteSvg = svg
              .replace(/fill="[^"]*"/g, 'fill="white"')
              .replace(/fill:[^;"]*/g, 'fill:white')
              .replace(/#[0-9a-fA-F]{6}/g, 'white')
              .replace(/#[0-9a-fA-F]{3}/g, 'white')
            setSvgContent(whiteSvg)
          })
          .catch(console.error)
      }
    }
  }, [item.id, item.category])
  
  const { squarePosition, squareRotation, cellSize } = useMemo(() => {
    const cubeSize = 2.5
    const segments = 8
    const halfSize = cubeSize / 2
    const step = cubeSize / segments
    
    // Use the new face-based positioning system
    const faceIndex = position.face
    const gridX = position.gridX
    const gridY = position.gridY
    
    // Position within the face grid (aligned with grid lines for 2x2 squares)
    // For 2x2 squares, position at the center of a 2x2 grid area
    const u = (-halfSize + (gridX + 1) * step) // Center of 2x2 area
    const v = (-halfSize + (gridY + 1) * step) // Center of 2x2 area
    
    let x, y, z, rotationX = 0, rotationY = 0, rotationZ = 0
    
    // Position on specific cube face
    switch (faceIndex) {
      case 0: // Front face - Projects
        x = u; y = v; z = halfSize + 0.02
        break
      case 1: // Right face - Experience
        x = halfSize + 0.02; y = v; z = -u
        rotationY = Math.PI / 2
        break
      case 2: // Top face - Skills
        x = u; y = halfSize + 0.02; z = -v
        rotationX = -Math.PI / 2
        break
      case 3: // Left face
        x = -halfSize - 0.02; y = v; z = u
        rotationY = -Math.PI / 2
        break
      case 4: // Bottom face
        x = u; y = -halfSize - 0.02; z = v
        rotationX = Math.PI / 2
        break
      case 5: // Back face
        x = -u; y = v; z = -halfSize - 0.02
        rotationY = Math.PI
        break
      default:
        x = u; y = v; z = halfSize + 0.02
    }
    
    const cellSize = step // Exactly one grid cell size
    
    return {
      squarePosition: [x, y, z],
      squareRotation: [rotationX, rotationY, rotationZ],
      cellSize
    }
  }, [position])
  
  const texture = useMemo(() => {
    // Create holographic texture with higher resolution for better readability
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.clearRect(0, 0, 512, 512)
    
    // Extract color components
    const r = (item.color >> 16) & 255
    const g = (item.color >> 8) & 255
    const b = item.color & 255
    
    // Draw darker background for better readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, 512, 512)
    
    // Add subtle color tint
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
    ctx.fillRect(0, 0, 512, 512)
    
    // Grid pattern removed for cleaner look
    
    // Draw simple borders
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`
    ctx.lineWidth = 6
    ctx.strokeRect(6, 6, 500, 500)
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 20, 472, 472)
    
    // Draw content based on hover state
    if (isHovered) {
      // Calculate total content height first to center everything vertically
      const totalContentHeight = 320 // Approximate total height of all content
      const canvasHeight = 512
      const verticalOffset = (canvasHeight - totalContentHeight) / 2
      
      // Draw decorative header section (centered)
      const headerGradient = ctx.createLinearGradient(40, verticalOffset, 472, verticalOffset)
      headerGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      headerGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`)
      headerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = headerGradient
      ctx.fillRect(40, verticalOffset, 432, 60)
      
      // Title perfectly centered
      ctx.fillStyle = 'white'
      ctx.font = 'bold 28px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      // Completely reset shadow properties
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillText(item.title, 256, verticalOffset + 30)
      
      // Category centered
      ctx.font = 'bold 16px monospace'
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`
      ctx.shadowBlur = 0
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('▸ ' + item.category.toUpperCase() + ' ◂', 256, verticalOffset + 55)
      
      // Decorative divider line (centered)
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(60, verticalOffset + 75)
      ctx.lineTo(452, verticalOffset + 75)
      ctx.stroke()
      
      // Description text (centered)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.font = '15px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowBlur = 0
      
      const words = item.description.split(' ')
      let line = ''
      let y = verticalOffset + 95 // Start after divider
      const lineHeight = 18
      const maxWidth = 420
      
      for (let i = 0; i < words.length && y < verticalOffset + 220; i++) {
        const testLine = line + words[i] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 256, y)
          line = words[i] + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }
      if (line && y < verticalOffset + 220) {
        ctx.fillText(line, 256, y)
      }
      
      // Tech stack section (centered)
      const techSectionY = y + 30
      ctx.textAlign = 'center'
      ctx.font = 'bold 13px monospace'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.shadowBlur = 0
      ctx.textBaseline = 'middle'
      ctx.fillText('TECHNOLOGIES', 256, techSectionY)
      
      // Tech stack as grid layout (3 per row)
      const techItems = item.tech.slice(0, 6)
      const badgeWidth = 110 // Fixed width for consistency
      const badgeHeight = 22
      const horizontalSpacing = 15 // Space between badges horizontally
      const verticalSpacing = 8 // Space between rows
      const itemsPerRow = 3
      
      // Calculate starting positions for centering
      const totalRowWidth = (itemsPerRow * badgeWidth) + ((itemsPerRow - 1) * horizontalSpacing)
      const startX = 256 - (totalRowWidth / 2)
      let startY = techSectionY + 25
      
      techItems.forEach((tech, index) => {
        const row = Math.floor(index / itemsPerRow)
        const col = index % itemsPerRow
        
        // Calculate position for this badge
        const x = startX + (col * (badgeWidth + horizontalSpacing))
        const y = startY + (row * (badgeHeight + verticalSpacing))
        
        // Draw badge background
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
        ctx.fillRect(x, y, badgeWidth, badgeHeight)
        
        // Draw badge border
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, badgeWidth, badgeHeight)
        
        // Draw tech text with proper sizing and perfect centering
        ctx.fillStyle = 'white'
        ctx.shadowBlur = 0
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle' // Center vertically
        
        // Adjust font size based on text length
        let fontSize = 10
        if (tech.length > 10) fontSize = 9
        if (tech.length > 15) fontSize = 8
        
        ctx.font = `bold ${fontSize}px monospace`
        
        // Truncate text if needed
        let displayText = tech
        const textWidth = ctx.measureText(displayText).width
        if (textWidth > badgeWidth - 10) { // 10px total padding
          while (ctx.measureText(displayText + '...').width > badgeWidth - 10 && displayText.length > 0) {
            displayText = displayText.slice(0, -1)
          }
          if (displayText !== tech) {
            displayText += '...'
          }
        }
        
        // Center both horizontally and vertically
        ctx.fillText(displayText, x + (badgeWidth/2), y + (badgeHeight/2))
      })
      
      
    } else {
      // Normal logo view - use SVG if available, otherwise text
      if (svgContent) {
        // For now, display company name as text until SVG renders properly
        // This is a simplified approach that works reliably
        ctx.fillStyle = 'white'
        ctx.font = 'bold 72px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Simple glow effect
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`
        ctx.shadowBlur = 20
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        
        // Display company name instead of abbreviated logo for experience items
        const companyNames = {
          'jpmorgan': 'JPMORGAN\nCHASE',
          'oncor': 'ONCOR\nELECTRIC', 
          'hennge': 'HENNGE\nINC'
        }
        
        const companyName = companyNames[item.id] || item.title.toUpperCase()
        const lines = companyName.split('\n')
        
        if (lines.length > 1) {
          // Multi-line company name
          ctx.font = 'bold 48px monospace'
          lines.forEach((line, index) => {
            const yOffset = (index - (lines.length - 1) / 2) * 60
            ctx.fillText(line, 256, 256 + yOffset)
          })
        } else {
          ctx.fillText(companyName, 256, 256)
        }
        
        // Main text (no shadow)
        ctx.shadowBlur = 0
        if (lines.length > 1) {
          lines.forEach((line, index) => {
            const yOffset = (index - (lines.length - 1) / 2) * 60
            ctx.fillText(line, 256, 256 + yOffset)
          })
        } else {
          ctx.fillText(companyName, 256, 256)
        }
      } else {
        // Fallback to text logo - check if it's a skill square with emoji
        const isSkillSquare = item.logo.match(/[☁⚡⚙🧠]/)
        
        ctx.fillStyle = 'white'
        ctx.font = isSkillSquare ? 'bold 140px monospace' : 'bold 96px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Simple glow effect
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`
        ctx.shadowBlur = 20
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.fillText(item.logo, 256, 256)
        
        // Main text (no shadow)
        ctx.shadowBlur = 0
        ctx.fillText(item.logo, 256, 256)
      }
    }
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    
    return texture
  }, [item, isHovered, svgContent])
  
  // Handle hover animations and expansion
  useFrame(() => {
    if (meshRef.current) {
      // Scale to perfectly fit grid cells
      const targetScaleX = isHovered ? 4.5 : 2 // 4.5 grid cells wide when hovered, 2x2 normally
      const targetScaleY = isHovered ? 3 : 2   // 3 grid cells tall when hovered, 2x2 normally
      const targetOpacity = isHovered ? 1 : 0.95
      
      // Calculate expansion offset to prevent overlap
      let offsetX = 0, offsetY = 0
      
      if (isHovered) {
        // Determine expansion direction based on grid position and face
        const gridX = position.gridX
        const gridY = position.gridY
        
        // Simpler expansion logic - just move away from cube center
        const faceIndex = position.face
        
        // Use a more reliable approach: move squares away from cube center when expanded
        if (faceIndex === 0) { // Front face - Projects (works fine)
          if (gridX <= 2) {
            offsetX = cellSize * 1.75
          } else if (gridX >= 5) {
            offsetX = -cellSize * 1.75
          } else {
            offsetX = 0
          }
          
          if (gridY <= 2) {
            offsetY = cellSize * 1
          } else if (gridY >= 5) {
            offsetY = -cellSize * 1
          } else {
            offsetY = 0
          }
        } else {
          // For other faces, use minimal offset to prevent glitching
          offsetX = 0
          offsetY = 0
        }
      }
      
      meshRef.current.scale.lerp({ x: targetScaleX, y: targetScaleY, z: 1 }, 0.1)
      
      // Apply expansion offset - keep squares on cube surface
      const basePosition = squarePosition
      const targetPosition = [
        basePosition[0] + offsetX,
        basePosition[1] + offsetY, 
        basePosition[2] // No z-offset, stay on cube surface
      ]
      
      meshRef.current.position.lerp({ 
        x: targetPosition[0], 
        y: targetPosition[1], 
        z: targetPosition[2] 
      }, 0.1)
      
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
    // Click navigation completely disabled
    // Users can only view details on hover
  }
  
  return (
    <mesh
      ref={meshRef}
      position={squarePosition}
      rotation={squareRotation}
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