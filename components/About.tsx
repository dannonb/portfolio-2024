"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const stats = [
        { label: "Years of Experience", value: "5+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Technologies Mastered", value: "20+" },
        { label: "Happy Clients", value: "30+" }
    ]

    return (
        <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8' id='about'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6'>
                        About <span className='gradient-text'>Me</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed'>
                        I&apos;m a passionate full-stack developer based in Fresno, CA, with a love for creating 
                        digital experiences that make a difference. My journey in tech has been driven by 
                        curiosity and a commitment to continuous learning.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='space-y-6'
                    >
                        <div className='glass-effect p-6 sm:p-8 rounded-2xl'>
                            <h3 className='text-xl sm:text-2xl font-bold mb-4'>My Journey</h3>
                            <p className='text-gray-400 leading-relaxed mb-4'>
                                Started as a curious problem-solver, I&apos;ve evolved into a full-stack developer 
                                who thrives on turning complex challenges into elegant solutions. I believe 
                                in writing clean, maintainable code and creating user experiences that delight.
                            </p>
                            <p className='text-gray-400 leading-relaxed'>
                                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing 
                                to open source projects, or sharing knowledge with the developer community.
                            </p>
                        </div>

                        <div className='glass-effect p-6 sm:p-8 rounded-2xl'>
                            <h3 className='text-xl sm:text-2xl font-bold mb-4'>What I Do</h3>
                            <ul className='space-y-3 text-gray-400'>
                                <li className='flex items-center gap-3'>
                                    <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                                    Full-Stack Web Development
                                </li>
                                <li className='flex items-center gap-3'>
                                    <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
                                    Mobile App Development
                                </li>
                                <li className='flex items-center gap-3'>
                                    <div className='w-2 h-2 bg-cyan-400 rounded-full'></div>
                                    UI/UX Design & Prototyping
                                </li>
                                <li className='flex items-center gap-3'>
                                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                                    Technical Consulting
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Content - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='grid grid-cols-2 gap-6'
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className='glass-effect p-6 rounded-2xl text-center hover-lift'
                            >
                                <div className='text-3xl lg:text-4xl font-bold gradient-text mb-2'>
                                    {stat.value}
                                </div>
                                <div className='text-sm text-gray-400'>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About