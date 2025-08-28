import { useState, useEffect } from 'react'

export function HUD() {
  return (
    <div className="hud">
      <div className="hud-title">Hayden Johnson</div>
      <div className="hud-line">Software Engineer</div>
      <div className="hud-line">UT Arlington • JPMorgan Chase</div>
      <div className="hud-line">Neural Matrix v2.5.1</div>
      <div className="hud-line">Status: Online</div>
    </div>
  )
}

export function ClusterLegend() {
  return (
    <div className="cluster-legend">
      <div className="legend-item">
        <div className="legend-color projects"></div>
        <span>PROJECTS</span>
      </div>
      <div className="legend-item">
        <div className="legend-color internships"></div>
        <span>INTERNSHIPS</span>
      </div>
      <div className="legend-item">
        <div className="legend-color skills"></div>
        <span>SKILLS</span>
      </div>
    </div>
  )
}

export function Controls() {
  return (
    <div className="controls">
      <div className="controls-line">DRAG: Rotate Matrix</div>
      <div className="controls-line">SCROLL: Zoom In/Out</div>
      <div className="controls-line">CLICK: Access Node</div>
    </div>
  )
}

export function ProjectInfo({ project, isVisible }) {
  if (!project) return null
  
  return (
    <div className={`project-info ${isVisible ? 'active' : ''}`}>
      <div className="project-title">{project.title}</div>
      <div className="project-category">{project.category}</div>
      <div className="project-description">{project.description}</div>
      <div className="project-tech">
        {project.tech.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      {project.link && (
        <a 
          href={project.link} 
          className="project-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Details
        </a>
      )}
    </div>
  )
}

export function CustomCursor({ hovered }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    let animationFrame
    
    const handleMouseMove = (e) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      
      animationFrame = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])
  
  return (
    <div 
      className={`custom-cursor ${hovered ? 'hover' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  )
}

// Export individual components
export default function UIComponents() {
  return null // This file just exports components
}