// Animated favicon utility for hacker-themed portfolio
class AnimatedFavicon {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = 32
    this.canvas.height = 32
    this.frame = 0
    this.isAnimating = false
    
    // Hacker characters for random generation
    this.hackerChars = '01ABCDEFabcdef!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    this.matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    
    // Grid for character positions
    this.gridSize = 4
    this.charGrid = []
    this.initializeGrid()
    
    // Create or get existing favicon link element
    this.favicon = document.querySelector('link[rel="icon"]')
    if (!this.favicon) {
      this.favicon = document.createElement('link')
      this.favicon.rel = 'icon'
      this.favicon.type = 'image/x-icon'
      document.head.appendChild(this.favicon)
    }
  }

  // Initialize character grid
  initializeGrid() {
    const gridCount = Math.floor(32 / this.gridSize)
    for (let y = 0; y < gridCount; y++) {
      this.charGrid[y] = []
      for (let x = 0; x < gridCount; x++) {
        this.charGrid[y][x] = {
          char: this.getRandomChar(),
          opacity: Math.random(),
          changeTimer: Math.random() * 10
        }
      }
    }
  }

  // Get random character
  getRandomChar() {
    const allChars = this.hackerChars + this.matrixChars + this.symbols
    return allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Draw a single frame of the animated favicon
  drawFrame(frame) {
    const { ctx } = this
    const size = 32
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size)
    
    // Black background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, size, size)
    
    // Set font for characters
    ctx.font = '6px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Update and draw character grid
    const gridCount = Math.floor(size / this.gridSize)
    for (let y = 0; y < gridCount; y++) {
      for (let x = 0; x < gridCount; x++) {
        const cell = this.charGrid[y][x]
        
        // Update character periodically
        cell.changeTimer -= 0.3
        if (cell.changeTimer <= 0) {
          cell.char = this.getRandomChar()
          cell.changeTimer = 2 + Math.random() * 8
          cell.opacity = 0.3 + Math.random() * 0.7
        }
        
        // Flickering effect
        const flicker = 0.7 + 0.3 * Math.sin(frame * 0.5 + x * 2 + y * 3)
        const finalOpacity = cell.opacity * flicker
        
        // Draw character
        ctx.fillStyle = `rgba(32, 194, 14, ${finalOpacity})`
        ctx.fillText(
          cell.char,
          x * this.gridSize + this.gridSize / 2,
          y * this.gridSize + this.gridSize / 2
        )
      }
    }
    
    // Add occasional bright flashes
    if (Math.random() < 0.05) {
      const flashX = Math.floor(Math.random() * gridCount)
      const flashY = Math.floor(Math.random() * gridCount)
      ctx.fillStyle = `rgba(64, 255, 64, 0.9)`
      ctx.fillText(
        this.getRandomChar(),
        flashX * this.gridSize + this.gridSize / 2,
        flashY * this.gridSize + this.gridSize / 2
      )
    }
  }

  // Update favicon with current frame
  updateFavicon() {
    this.drawFrame(this.frame)
    const dataURL = this.canvas.toDataURL('image/png')
    this.favicon.href = dataURL
    this.frame++
  }

  // Start animation
  start(fps = 10) {
    if (this.isAnimating) return
    
    this.isAnimating = true
    const interval = 1000 / fps
    
    this.animationInterval = setInterval(() => {
      this.updateFavicon()
    }, interval)
  }

  // Stop animation
  stop() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
      this.animationInterval = null
    }
    this.isAnimating = false
  }

  // Create a static favicon (for when animation is disabled)
  createStatic() {
    this.frame = 0
    this.drawFrame(0)
    const dataURL = this.canvas.toDataURL('image/png')
    this.favicon.href = dataURL
  }
}

// Export singleton instance
export const animatedFavicon = new AnimatedFavicon()