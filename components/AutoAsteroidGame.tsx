"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Position {
  x: number
  y: number
}

interface Asteroid {
  id: number
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

const AutoAsteroidGame = () => {
  const [score, setScore] = useState(0)
  const [shipPosition, setShipPosition] = useState<Position>({ x: 200, y: 350 })
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 200, y: 350 })
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [shipTilt, setShipTilt] = useState(0)
  const [isPlayerControlled, setIsPlayerControlled] = useState(false)
  const [keys, setKeys] = useState<{[key: string]: boolean}>({})
  const [gameOver, setGameOver] = useState(false)
  const [lastPlayerInput, setLastPlayerInput] = useState(0)
  
  const animationRef = useRef<number>()
  const asteroidIdRef = useRef(0)
  const particleIdRef = useRef(0)
  const gameTimeRef = useRef(0)
  
  // Responsive game dimensions
  const getGameDimensions = () => {
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 1024 // lg breakpoint
      const maxWidth = isDesktop ? 480 : 400 // Larger on desktop
      const width = Math.min(maxWidth, window.innerWidth - 32) // Account for padding
      const height = Math.min(maxWidth, Math.max(300, width)) // Keep it square-ish
      return { width: Math.max(280, width), height: Math.max(280, height) }
    }
    return { width: 480, height: 480 } // Default larger size
  }
  
  const [gameDimensions, setGameDimensions] = useState(getGameDimensions())
  const [isMobile, setIsMobile] = useState(false)
  const GAME_WIDTH = gameDimensions.width
  const GAME_HEIGHT = gameDimensions.height
  const SHIP_SIZE = 20
  
  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      setGameDimensions(getGameDimensions())
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Mobile touch controls
  const handleMobileControl = (direction: string) => {
    setKeys(prev => ({ ...prev, [direction]: true }))
    setIsPlayerControlled(true)
    setLastPlayerInput(Date.now())
    
    // Auto-release after short time
    setTimeout(() => {
      setKeys(prev => ({ ...prev, [direction]: false }))
    }, 150)
  }
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const controlKeys = ['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']
      
      if (controlKeys.includes(key)) {
        e.preventDefault()
        setKeys(prev => ({ ...prev, [key]: true }))
        setIsPlayerControlled(true)
        setLastPlayerInput(Date.now())
      }
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      setKeys(prev => ({ ...prev, [key]: false }))
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  // Auto-switch back to AI after inactivity
  useEffect(() => {
    if (isPlayerControlled) {
      const checkInactivity = setInterval(() => {
        const timeSinceLastInput = Date.now() - lastPlayerInput
        if (timeSinceLastInput > 3000) { // 3 seconds of no input
          setIsPlayerControlled(false)
        }
      }, 100)
      
      return () => clearInterval(checkInactivity)
    }
  }, [isPlayerControlled, lastPlayerInput])
  
  // Check collision between ship and asteroid
  const checkCollision = useCallback((ship: Position, asteroid: Asteroid) => {
    const dx = ship.x - asteroid.x
    const dy = ship.y - asteroid.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (SHIP_SIZE / 2 + asteroid.size / 2)
  }, [])
  
  // Create explosion particles
  const createExplosion = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const speed = 2 + Math.random() * 4
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        maxLife: 30
      })
    }
    setParticles(prev => [...prev, ...newParticles])
  }, [])
  
  // AI movement - ship automatically avoids asteroids
  const updateShipAI = (currentAsteroids: Asteroid[], currentShip: Position) => {
    // Find the closest threatening asteroid
    let closestThreat: Asteroid | null = null
    let minThreatDistance = Infinity
    
    currentAsteroids.forEach(asteroid => {
      // Only consider asteroids that are coming towards the ship
      if (asteroid.y > currentShip.y - 100 && asteroid.y < currentShip.y + 50) {
        const dx = asteroid.x - currentShip.x
        const dy = asteroid.y - currentShip.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < minThreatDistance && distance < 80) {
          minThreatDistance = distance
          closestThreat = asteroid
        }
      }
    })
    
    let newTargetX = currentShip.x
    let newTargetY = currentShip.y
    
    if (closestThreat !== null) {
      // Move away from the threat
      const threat = closestThreat as Asteroid
      const dx = currentShip.x - threat.x
      const avoidanceStrength = Math.max(0, 80 - minThreatDistance) / 80
      
      if (Math.abs(dx) < 40) {
        // Move horizontally away from asteroid
        newTargetX = dx > 0 ? 
          Math.min(GAME_WIDTH - 40, currentShip.x + 60 * avoidanceStrength) :
          Math.max(40, currentShip.x - 60 * avoidanceStrength)
      }
      
      // Slight vertical adjustment for more realistic movement
      newTargetY = Math.max(300, Math.min(380, currentShip.y + (Math.random() - 0.5) * 20))
    } else {
      // Gentle wandering when no threats
      const time = gameTimeRef.current * 0.01
      newTargetX = GAME_WIDTH / 2 + Math.sin(time) * 80
      newTargetY = 350 + Math.cos(time * 0.7) * 30
    }
    
    return { x: newTargetX, y: newTargetY }
  }
  
  // Spawn asteroids with varying patterns
  const spawnAsteroid = () => {
    const patterns = [
      // Random spawn
      () => ({ x: Math.random() * GAME_WIDTH, speed: 1 + Math.random() * 2 }),
      // Side spawns
      () => ({ x: Math.random() < 0.5 ? -20 : GAME_WIDTH + 20, speed: 1.5 + Math.random() * 1.5 }),
      // Cluster spawn
      () => {
        const centerX = Math.random() * GAME_WIDTH
        return { x: centerX + (Math.random() - 0.5) * 60, speed: 1 + Math.random() * 2 }
      }
    ]
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    const spawn = pattern()
    
    const newAsteroid: Asteroid = {
      id: asteroidIdRef.current++,
      x: spawn.x,
      y: -50,
      size: 15 + Math.random() * 25,
      speed: spawn.speed,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4
    }
    
    setAsteroids(prev => [...prev, newAsteroid])
  }
  
  // Create engine particles
  const createEngineParticles = (x: number, y: number) => {
    if (Math.random() < 0.3) {
      const newParticles: Particle[] = []
      for (let i = 0; i < 2; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x: x + (Math.random() - 0.5) * 8,
          y: y + 10,
          vx: (Math.random() - 0.5) * 2,
          vy: 1 + Math.random() * 2,
          life: 15,
          maxLife: 15
        })
      }
      setParticles(prev => [...prev, ...newParticles])
    }
  }
  
  // Game loop
  useEffect(() => {
    if (gameOver) return
    
    const gameLoop = () => {
      gameTimeRef.current += 1
      
      // Update ship position based on control mode
      setShipPosition(prev => {
        let newX = prev.x
        let newY = prev.y
        let tilt = 0
        
        if (isPlayerControlled) {
          // Player control
          const moveSpeed = 4
          if (keys['a'] || keys['arrowleft']) {
            newX -= moveSpeed
            tilt = -15
          }
          if (keys['d'] || keys['arrowright']) {
            newX += moveSpeed
            tilt = 15
          }
          if (keys['w'] || keys['arrowup']) newY -= moveSpeed
          if (keys['s'] || keys['arrowdown']) newY += moveSpeed
          
          // Update last input time if any key is pressed
          const anyKeyPressed = Object.values(keys).some(pressed => pressed)
          if (anyKeyPressed) {
            setLastPlayerInput(Date.now())
          }
        } else {
          // AI control
          const newTarget = updateShipAI(asteroids, prev)
          setTargetPosition(newTarget)
          
          const dx = newTarget.x - prev.x
          const dy = newTarget.y - prev.y
          
          // Smooth movement towards target
          const moveSpeed = 0.15
          newX = prev.x + dx * moveSpeed
          newY = prev.y + dy * moveSpeed
          
          // Calculate tilt based on horizontal movement
          tilt = Math.max(-20, Math.min(20, dx * 0.5))
        }
        
        setShipTilt(tilt)
        
        // Keep ship in bounds
        newX = Math.max(SHIP_SIZE / 2, Math.min(GAME_WIDTH - SHIP_SIZE / 2, newX))
        newY = Math.max(SHIP_SIZE / 2, Math.min(GAME_HEIGHT - SHIP_SIZE / 2, newY))
        
        // Create engine particles
        createEngineParticles(newX, newY)
        
        return { x: newX, y: newY }
      })
      
      // Update asteroids
      setAsteroids(prev => {
        const updated = prev.map(asteroid => ({
          ...asteroid,
          y: asteroid.y + asteroid.speed,
          rotation: asteroid.rotation + asteroid.rotationSpeed
        })).filter(asteroid => asteroid.y < GAME_HEIGHT + 50)
        
        // Check collisions only in player mode
        if (isPlayerControlled) {
          updated.forEach(asteroid => {
            if (checkCollision(shipPosition, asteroid)) {
              createExplosion(shipPosition.x, shipPosition.y)
              setGameOver(true)
            }
          })
        }
        
        return updated
      })
      
      // Update particles
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vx: particle.vx * 0.98, // Slight drag
          vy: particle.vy * 0.98
        })).filter(particle => particle.life > 0)
      )
      
      // Spawn new asteroids with varying frequency
      const spawnChance = 0.015 + Math.sin(gameTimeRef.current * 0.01) * 0.01
      if (Math.random() < spawnChance) {
        spawnAsteroid()
      }
      
      // Increase score
      setScore(prev => prev + 1)
      
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [asteroids, isPlayerControlled, keys, shipPosition, checkCollision, createExplosion, gameOver])
  
  const resetGame = () => {
    setGameOver(false)
    setScore(0)
    setShipPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 })
    setAsteroids([])
    setParticles([])
    gameTimeRef.current = 0
    asteroidIdRef.current = 0
    particleIdRef.current = 0
  }
  
  const startPlayerMode = () => {
    console.log('Starting player mode')
    resetGame()
    setIsPlayerControlled(true)
  }
  
  const startAIMode = () => {
    console.log('Starting AI mode')
    resetGame()
    setIsPlayerControlled(false)
  }
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden max-w-full">
      {/* Game Area Container */}
      <div className="relative flex justify-center w-full px-4 max-w-full overflow-hidden">
        <div 
          className="relative bg-black/30 border border-blue-400/30 rounded-lg overflow-hidden backdrop-blur-sm w-full max-w-full"
          style={{ maxWidth: GAME_WIDTH, width: '100%', height: GAME_HEIGHT }}
        >
        {/* Background glow for game area only */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-lg blur-2xl" />
        {/* Game area background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10" />
        
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
        
        {/* Score and status */}
        <div className="absolute top-6 left-6 space-y-1">
          <div className="text-white font-mono text-sm">
            Score: {Math.floor(score / 10)}
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isPlayerControlled ? 'bg-blue-400' : 'bg-green-400'
            }`}></div>
            <span className={`text-xs font-mono ${
              isPlayerControlled ? 'text-blue-400' : 'text-green-400'
            }`}>
              {isPlayerControlled ? 'PLAYER' : 'AUTO-PILOT'}
            </span>
          </div>
        </div>
        
        {/* Control instructions */}
        {!gameOver && (
          <div className="absolute top-6 right-6 text-right">
            <div className="text-xs text-gray-400 font-mono">
              {isPlayerControlled ? (
                isMobile ? 'Touch controls' : 'WASD / Arrows'
              ) : (
                isMobile ? 'Touch arrows to play' : 'Press WASD to play'
              )}
            </div>
            {isPlayerControlled && (
              <div className="text-xs text-gray-500 font-mono mt-1">
                Stop for 3s to return to AI
              </div>
            )}
          </div>
        )}
        
        {/* Game Over Screen */}
        {gameOver && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50"
            style={{ pointerEvents: 'all' }}
          >
            <div className="text-center space-y-4 p-8 bg-gray-900/90 rounded-xl border border-gray-600 shadow-2xl">
              <h3 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h3>
              <p className="text-white text-lg">Final Score: {Math.floor(score / 10)}</p>
              <p className="text-gray-400 text-sm">You lasted {Math.floor(score / 60)} seconds</p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Play Again clicked')
                    setGameOver(false)
                    setScore(0)
                    setShipPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 })
                    setAsteroids([])
                    setParticles([])
                    setIsPlayerControlled(true)
                    gameTimeRef.current = 0
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 cursor-pointer"
                  style={{ pointerEvents: 'all' }}
                >
                  Play Again
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Watch AI clicked')
                    setGameOver(false)
                    setScore(0)
                    setShipPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 })
                    setAsteroids([])
                    setParticles([])
                    setIsPlayerControlled(false)
                    gameTimeRef.current = 0
                  }}
                  className="px-6 py-3 border border-gray-400 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  style={{ pointerEvents: 'all' }}
                >
                  Watch AI
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Ship */}
        <motion.div
          className="absolute z-10"
          style={{
            left: shipPosition.x - SHIP_SIZE / 2,
            top: shipPosition.y - SHIP_SIZE / 2,
            width: SHIP_SIZE,
            height: SHIP_SIZE
          }}
          animate={{
            rotate: shipTilt
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Ship body */}
          <svg width={SHIP_SIZE} height={SHIP_SIZE} viewBox="0 0 20 20">
            <defs>
              <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <filter id="shipGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <polygon
              points="10,2 6,16 10,14 14,16"
              fill="url(#shipGradient)"
              stroke="#ffffff"
              strokeWidth="0.5"
              filter="url(#shipGlow)"
            />
          </svg>
          
          {/* Engine glow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-2 h-6 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent rounded-full"
              animate={{
                opacity: [0.6, 1, 0.6],
                scaleY: [0.8, 1.3, 0.8],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity
              }}
            />
          </div>
        </motion.div>
        
        {/* Asteroids */}
        {asteroids.map(asteroid => (
          <motion.div
            key={asteroid.id}
            className="absolute"
            style={{
              left: asteroid.x - asteroid.size / 2,
              top: asteroid.y - asteroid.size / 2,
              width: asteroid.size,
              height: asteroid.size
            }}
            animate={{
              rotate: asteroid.rotation
            }}
          >
            <svg width={asteroid.size} height={asteroid.size} viewBox="0 0 30 30">
              <defs>
                <filter id="asteroidShadow">
                  <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3"/>
                </filter>
              </defs>
              <polygon
                points="15,2 25,8 28,18 20,26 10,26 2,18 5,8"
                fill="#8b7355"
                stroke="#a0906b"
                strokeWidth="0.5"
                filter="url(#asteroidShadow)"
              />
              <polygon
                points="15,5 22,9 24,16 19,22 11,22 6,16 8,9"
                fill="#6b5d4a"
              />
              {/* Crater details */}
              <circle cx="12" cy="12" r="2" fill="#5a4d3a" opacity="0.6" />
              <circle cx="18" cy="16" r="1.5" fill="#5a4d3a" opacity="0.4" />
            </svg>
          </motion.div>
        ))}
        
        {/* Engine particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life / particle.maxLife,
              background: `linear-gradient(45deg, #f97316, #eab308)`
            }}
          />
        ))}
        
        {/* Game info */}
        <div className="absolute bottom-6 left-6 text-xs text-gray-400 font-mono">
          {isPlayerControlled ? 'Player Mode' : 'AI Demo'}
        </div>
        
        <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-mono">
          Asteroids: {asteroids.length}
        </div>
        
        {/* Corner accents - positioned relative to game area */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-blue-400/50" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-purple-400/50" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-purple-400/50" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
        </div>
        
        {/* Status indicators - positioned relative to game container, not extending beyond */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full hidden lg:block" style={{ left: '-24px' }}>
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Controls - Separate from game area */}
      {isMobile && !gameOver && (
        <div className="flex justify-center mt-4">
          <div className="glass-effect rounded-2xl p-3">
            <div className="grid grid-cols-3 gap-2 w-28 h-28">
              {/* Top row */}
              <div></div>
              <button
                onTouchStart={() => handleMobileControl('w')}
                onMouseDown={() => handleMobileControl('w')}
                className="w-7 h-7 glass-effect rounded-lg flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors text-sm"
              >
                ↑
              </button>
              <div></div>
              
              {/* Middle row */}
              <button
                onTouchStart={() => handleMobileControl('a')}
                onMouseDown={() => handleMobileControl('a')}
                className="w-7 h-7 glass-effect rounded-lg flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors text-sm"
              >
                ←
              </button>
              <div className="w-7 h-7 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <button
                onTouchStart={() => handleMobileControl('d')}
                onMouseDown={() => handleMobileControl('d')}
                className="w-7 h-7 glass-effect rounded-lg flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors text-sm"
              >
                →
              </button>
              
              {/* Bottom row */}
              <div></div>
              <button
                onTouchStart={() => handleMobileControl('s')}
                onMouseDown={() => handleMobileControl('s')}
                className="w-7 h-7 glass-effect rounded-lg flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors text-sm"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AutoAsteroidGame