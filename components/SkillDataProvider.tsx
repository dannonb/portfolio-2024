"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}

const SkillDataProvider = ({ src, width, height, index } : Props) => {
    const { ref, inView } = useInView({
        triggerOnce: true
    }) 

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className='group'
        >
            <div className='w-16 h-16 glass-effect rounded-xl flex items-center justify-center hover-lift group-hover:border-blue-500/50'>
                <Image
                    src={src}
                    width={32}
                    height={32}
                    alt="Skill"
                    className='group-hover:scale-110 transition-transform duration-300'
                />
            </div>
        </motion.div>
    )
}

export default SkillDataProvider