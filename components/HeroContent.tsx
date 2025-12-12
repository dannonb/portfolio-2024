"use client"

import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/20/solid'
import AutoAsteroidGame from './AutoAsteroidGame'

import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'

const HeroContent = () => {
    return (
        <div className='min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full overflow-hidden pt-20 sm:pt-24'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center w-full'>
                {/* Left Content */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    className='space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left w-full overflow-hidden'
                >
                    <motion.div
                        variants={slideInFromTop}
                        className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 glass-effect rounded-full text-xs sm:text-sm'
                    >
                        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                        <span className='text-gray-300'>Available for work</span>
                    </motion.div>

                    <motion.div variants={slideInFromLeft(0.5)} className='space-y-4 lg:space-y-6'>
                        <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight break-words overflow-wrap-anywhere'>
                            Hello, I&apos;m{' '}
                            <span className='gradient-text'>Dannon</span>
                        </h1>
                        <div className='space-y-2 lg:space-y-3'>
                            <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-light text-gray-300'>
                                Full-Stack Developer
                            </p>
                            <p className='text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0'>
                                I craft exceptional digital experiences through clean code, 
                                thoughtful design, and innovative solutions that bring ideas to life.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={slideInFromLeft(0.8)}
                        className='flex flex-col sm:flex-row gap-4'
                    >
                        <a href='#projects' className='btn-primary group'>
                            View My Work
                            <svg className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                            </svg>
                        </a>
                        <a href='mailto:dannonbigham@gmail.com' className='btn-secondary group'>
                            Get In Touch
                            <svg className='w-4 h-4 ml-2 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                        </a>
                    </motion.div>

                    <motion.div 
                        variants={slideInFromLeft(1)}
                        className='flex flex-wrap items-center justify-center lg:justify-start gap-3 xs:gap-4 sm:gap-6 lg:gap-8 pt-4 px-2 sm:px-0'
                    >
                        <div className='text-center'>
                            <div className='text-lg xs:text-xl sm:text-2xl font-bold gradient-text'>5+</div>
                            <div className='text-xs text-gray-400'>Years Experience</div>
                        </div>
                        <div className='w-px h-6 xs:h-8 sm:h-12 bg-gray-600'></div>
                        <div className='text-center'>
                            <div className='text-lg xs:text-xl sm:text-2xl font-bold gradient-text'>50+</div>
                            <div className='text-xs text-gray-400'>Projects Completed</div>
                        </div>
                        <div className='w-px h-6 xs:h-8 sm:h-12 bg-gray-600'></div>
                        <div className='text-center'>
                            <div className='text-lg xs:text-xl sm:text-2xl font-bold gradient-text'>100%</div>
                            <div className='text-xs text-gray-400'>Client Satisfaction</div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        variants={slideInFromLeft(1.2)}
                        className='text-center lg:text-left pt-4 px-2 sm:px-0'
                    >
                        <p className='text-xs sm:text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2 flex-wrap'>
                            <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                            <span className='hidden sm:inline'>AI auto-pilot active - press WASD to take control! →</span>
                            <span className='sm:hidden'>Game coming soon! →</span>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                    variants={slideInFromRight(0.8)}
                    initial="hidden"
                    animate="visible"
                    className='flex justify-center mt-8 lg:mt-0 w-full overflow-hidden'
                >
                    <div className='relative w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden'>
                        <AutoAsteroidGame />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroContent