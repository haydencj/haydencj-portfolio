import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralCube from './components/NeuralSphere'
import { HUD, ClusterLegend, Controls, CustomCursor } from './components/UIComponents'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)

  const handleHover = (project) => {
    setHoveredProject(project)
    // Clear selection when hovering over a new project
    if (project && selectedProject) {
      setSelectedProject(null)
    }
  }

  const handleSelect = (project) => {
    // Navigate to project link
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
    // Clear hover when clicking
    setHoveredProject(null)
  }

  return (
    <div className="app">
      <CustomCursor hovered={hoveredProject} />
      
      <HUD />
      <ClusterLegend />
      <Controls />
      
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <NeuralCube
          onHover={handleHover}
          onSelect={handleSelect}
        />
      </Canvas>
    </div>
  )
}

export default App