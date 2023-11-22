"use client"

import { motion } from 'framer-motion'

import { slideInFromLeft } from '@/utils/motion'

const SkillText = () => {
    return (
        <div className='lg:w-[70%] h-auto flex flex-col items-center justify-center'>
            <motion.div
                variants={slideInFromLeft(0.5)}
                className='text-[20px] lg:text-[30px] text-white font-meduim mt-[10px] text-center mb-[15px]'
            >
                 From programming languages to frameworks, methodologies, and technical tools, these proficiencies have empowered me to craft innovative solutions and drive impactful outcomes.
            </motion.div>
        </div>
    )
}

export default SkillText