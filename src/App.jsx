import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralSphere from './components/NeuralSphere'
import { HUD, ClusterLegend, Controls, ProjectInfo, CustomCursor } from './components/UIComponents'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <div className="app">
      <CustomCursor hovered={hoveredProject} />
      
      <HUD />
      <ClusterLegend />
      <Controls />
      
      <ProjectInfo 
        project={hoveredProject || selectedProject} 
        isVisible={!!(hoveredProject || selectedProject)}
      />
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <NeuralSphere
          onHover={setHoveredProject}
          onSelect={setSelectedProject}
        />
      </Canvas>
    </div>
  )
}

export default App