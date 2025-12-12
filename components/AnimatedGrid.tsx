"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AnimatedGrid = () => {
    const [activeLines, setActiveLines] = useState<number[]>([])
    const [pulseNodes, setPulseNodes] = useState<{row: number, col: number}[]>([])
    
    // Grid dimensions
    const gridSize = 16
    const totalLines = gridSize * 2 - 1 // Diagonal lines from top-left to bottom-right
    
    useEffect(() => {
        const interval = setInterval(() => {
            // Create a cascading effect by activating lines in sequence
            const newActiveLines: number[] = []
            const newPulseNodes: {row: number, col: number}[] = []
            const currentTime = Date.now()
            
            for (let i = 0; i < totalLines; i++) {
                const delay = i * 80 // 80ms delay between each line
                const lineStartTime = currentTime % (totalLines * 80 + 1500) // Reset every cycle
                
                if (lineStartTime >= delay && lineStartTime < delay + 600) {
                    newActiveLines.push(i)
                    
                    // Add pulse nodes at intersections
                    if (Math.random() > 0.7) {
                        const row = Math.floor(Math.random() * gridSize)
                        const col = Math.floor(Math.random() * gridSize)
                        newPulseNodes.push({ row, col })
                    }
                }
            }
            
            setActiveLines(newActiveLines)
            setPulseNodes(newPulseNodes)
        }, 40)
        
        return () => clearInterval(interval)
    }, [totalLines])
    
    // Generate grid points
    const gridPoints = []
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            gridPoints.push({ row, col, id: `${row}-${col}` })
        }
    }
    
    // Generate diagonal lines
    const diagonalLines = []
    for (let lineIndex = 0; lineIndex < totalLines; lineIndex++) {
        const points = []
        
        // Calculate starting position for this diagonal
        let startRow, startCol
        if (lineIndex < gridSize) {
            startRow = lineIndex
            startCol = 0
        } else {
            startRow = gridSize - 1
            startCol = lineIndex - gridSize + 1
        }
        
        // Generate points along this diagonal
        let currentRow = startRow
        let currentCol = startCol
        while (currentRow >= 0 && currentCol < gridSize) {
            points.push({ row: currentRow, col: currentCol })
            currentRow--
            currentCol++
        }
        
        diagonalLines.push({ lineIndex, points })
    }
    
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-2xl blur-3xl" />
            
            {/* Grid container */}
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${gridSize * 25} ${gridSize * 25}`}
                    className="absolute inset-0"
                >
                    {/* Grid dots */}
                    {gridPoints.map((point) => {
                        const isPulsing = pulseNodes.some(node => node.row === point.row && node.col === point.col)
                        return (
                            <motion.circle
                                key={point.id}
                                cx={point.col * 25 + 12.5}
                                cy={point.row * 25 + 12.5}
                                r={isPulsing ? "3" : "1.5"}
                                fill={isPulsing ? "url(#nodeGradient)" : "rgba(255, 255, 255, 0.3)"}
                                animate={{
                                    r: isPulsing ? [1.5, 4, 1.5] : 1.5,
                                    opacity: isPulsing ? [0.3, 1, 0.3] : 0.3
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut"
                                }}
                            />
                        )
                    })}
                    
                    {/* Animated diagonal lines */}
                    {diagonalLines.map((line) => {
                        const isActive = activeLines.includes(line.lineIndex)
                        const pathData = line.points
                            .map((point, index) => 
                                `${index === 0 ? 'M' : 'L'} ${point.col * 25 + 12.5} ${point.row * 25 + 12.5}`
                            )
                            .join(' ')
                        
                        return (
                            <g key={line.lineIndex}>
                                <motion.path
                                    d={pathData}
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{
                                        pathLength: isActive ? 1 : 0,
                                        opacity: isActive ? [0, 1, 0.7, 0] : 0
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }}
                                />
                                {isActive && (
                                    <motion.path
                                        d={pathData}
                                        stroke="url(#glowGradient)"
                                        strokeWidth="4"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 1, 0],
                                            opacity: [0, 0.8, 0]
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeInOut"
                                        }}
                                    />
                                )}
                            </g>
                        )
                    })}
                    
                    {/* Gradient definitions */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
                        </linearGradient>
                        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                        </radialGradient>
                    </defs>
                </svg>
                
                {/* Central pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute w-8 h-8 border border-blue-400/30 rounded-full"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>
            
            {/* Corner accents with tech labels */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-8 h-8 border-l-2 border-t-2 border-blue-400/50" />
                <motion.span 
                    className="text-xs text-blue-400/70 font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    INIT
                </motion.span>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <motion.span 
                    className="text-xs text-purple-400/70 font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                    EXEC
                </motion.span>
                <div className="w-8 h-8 border-r-2 border-t-2 border-purple-400/50" />
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-8 h-8 border-l-2 border-b-2 border-purple-400/50" />
                <motion.span 
                    className="text-xs text-purple-400/70 font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                    PROC
                </motion.span>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <motion.span 
                    className="text-xs text-cyan-400/70 font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                    DONE
                </motion.span>
                <div className="w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
            </div>
        </div>
    )
}

export default AnimatedGrid