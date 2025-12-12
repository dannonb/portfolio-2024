"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { freelance, mobileApps, personalProjects, professionalWebsites } from '@/constants'
import ProjectCard from './ProjectCard'

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const projectCategories = {
        all: [
            ...professionalWebsites.map(p => ({ ...p, category: 'professional' })),
            ...mobileApps.map(p => ({ ...p, category: 'mobile' })),
            ...freelance.map(p => ({ ...p, category: 'freelance' })),
            ...personalProjects.map(p => ({ ...p, category: 'personal' }))
        ],
        professional: professionalWebsites.map(p => ({ ...p, category: 'professional' })),
        mobile: mobileApps.map(p => ({ ...p, category: 'mobile' })),
        freelance: freelance.map(p => ({ ...p, category: 'freelance' })),
        personal: personalProjects.map(p => ({ ...p, category: 'personal' }))
    }

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'professional', label: 'Professional' },
        { key: 'mobile', label: 'Mobile Apps' },
        { key: 'freelance', label: 'Freelance' },
        { key: 'personal', label: 'Personal' }
    ]

    const filteredProjects = projectCategories[activeFilter as keyof typeof projectCategories]

    return (
        <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8' id='projects'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12 sm:mb-16'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
                        Featured <span className='gradient-text'>Projects</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8'>
                        A collection of work showcasing my skills and experience across different domains
                    </p>

                    {/* Filter Buttons */}
                    <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                                    activeFilter === filter.key
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'glass-effect text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {filteredProjects.map(({ src, href, name, stack }, index) => (
                        <motion.div
                            key={name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                src={src}
                                href={href}
                                name={name}
                                stack={stack}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-gray-400'>No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects