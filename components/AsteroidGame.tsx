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

const AsteroidGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [shipPosition, setShipPosition] = useState<Position>({ x: 200, y: 350 })
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [keys, setKeys] = useState<{[key: string]: boolean}>({})
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const asteroidIdRef = useRef(0)
  const particleIdRef = useRef(0)
  
  const GAME_WIDTH = 400
  const GAME_HEIGHT = 400
  const SHIP_SIZE = 20
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }))
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }))
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  // Create explosion particles
  const createExplosion = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const speed = 2 + Math.random() * 3
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
  
  // Spawn asteroids
  const spawnAsteroid = useCallback(() => {
    const newAsteroid: Asteroid = {
      id: asteroidIdRef.current++,
      x: Math.random() * GAME_WIDTH,
      y: -50,
      size: 15 + Math.random() * 25,
      speed: 1 + Math.random() * 2,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 4
    }
    setAsteroids(prev => [...prev, newAsteroid])
  }, [])
  
  // Check collision between ship and asteroid
  const checkCollision = useCallback((ship: Position, asteroid: Asteroid) => {
    const dx = ship.x - asteroid.x
    const dy = ship.y - asteroid.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (SHIP_SIZE / 2 + asteroid.size / 2)
  }, [])
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return
    
    const gameLoop = () => {
      // Move ship based on keys
      setShipPosition(prev => {
        let newX = prev.x
        let newY = prev.y
        
        if (keys['a'] || keys['arrowleft']) newX -= 5
        if (keys['d'] || keys['arrowright']) newX += 5
        if (keys['w'] || keys['arrowup']) newY -= 5
        if (keys['s'] || keys['arrowdown']) newY += 5
        
        // Keep ship in bounds
        newX = Math.max(SHIP_SIZE / 2, Math.min(GAME_WIDTH - SHIP_SIZE / 2, newX))
        newY = Math.max(SHIP_SIZE / 2, Math.min(GAME_HEIGHT - SHIP_SIZE / 2, newY))
        
        return { x: newX, y: newY }
      })
      
      // Update asteroids
      setAsteroids(prev => {
        const updated = prev.map(asteroid => ({
          ...asteroid,
          y: asteroid.y + asteroid.speed,
          rotation: asteroid.rotation + asteroid.rotationSpeed
        })).filter(asteroid => asteroid.y < GAME_HEIGHT + 50)
        
        // Check collisions
        updated.forEach(asteroid => {
          if (checkCollision(shipPosition, asteroid)) {
            createExplosion(shipPosition.x, shipPosition.y)
            setGameOver(true)
          }
        })
        
        return updated
      })
      
      // Update particles
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1
        })).filter(particle => particle.life > 0)
      )
      
      // Spawn new asteroids
      if (Math.random() < 0.02) {
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
  }, [gameStarted, gameOver, keys, shipPosition, checkCollision, spawnAsteroid, createExplosion])
  
  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setShipPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 })
    setAsteroids([])
    setParticles([])
  }
  
  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setAsteroids([])
    setParticles([])
  }
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl blur-3xl" />
      
      {/* Game container */}
      <div 
        ref={gameAreaRef}
        className="relative bg-black/20 border border-blue-400/30 rounded-lg overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Game area background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10" />
        
        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Asteroid Dodge</h3>
              <p className="text-gray-300 text-sm mb-4">Use WASD or Arrow Keys to move</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Start Game
              </button>
            </motion.div>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-2">Game Over!</h3>
              <p className="text-white text-lg">Score: {Math.floor(score / 10)}</p>
              <div className="flex gap-2">
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {gameStarted && !gameOver && (
          <>
            {/* Score */}
            <div className="absolute top-4 left-4 text-white font-mono text-sm">
              Score: {Math.floor(score / 10)}
            </div>
            
            {/* Ship */}
            <motion.div
              className="absolute"
              style={{
                left: shipPosition.x - SHIP_SIZE / 2,
                top: shipPosition.y - SHIP_SIZE / 2,
                width: SHIP_SIZE,
                height: SHIP_SIZE
              }}
              animate={{
                rotate: keys['a'] || keys['arrowleft'] ? -15 : keys['d'] || keys['arrowright'] ? 15 : 0
              }}
              transition={{ duration: 0.1 }}
            >
              {/* Ship body */}
              <svg width={SHIP_SIZE} height={SHIP_SIZE} viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,2 6,16 10,14 14,16"
                  fill="url(#shipGradient)"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </svg>
              
              {/* Engine glow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="w-2 h-4 bg-gradient-to-t from-orange-400 to-transparent rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scaleY: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 0.2,
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
                  <polygon
                    points="15,2 25,8 28,18 20,26 10,26 2,18 5,8"
                    fill="#8b7355"
                    stroke="#a0906b"
                    strokeWidth="1"
                  />
                  <polygon
                    points="15,5 22,9 24,16 19,22 11,22 6,16 8,9"
                    fill="#6b5d4a"
                  />
                </svg>
              </motion.div>
            ))}
            
            {/* Particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-orange-400 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  opacity: particle.life / particle.maxLife
                }}
              />
            ))}
          </>
        )}
        
        {/* Instructions */}
        {gameStarted && !gameOver && (
          <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-mono">
            WASD / Arrows to move
          </div>
        )}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  )
}

export default AsteroidGame