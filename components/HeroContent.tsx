"use client"

import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'

const HeroContent = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className='flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]'
        >
            <div className='h-full w-full flex flex-col gap-5 justify-center items-center m-auto'>
                <motion.div
                    variants={slideInFromTop}
                    className='Welcome-box py-[8px] px-[7px] border border-[#405CB8] opacity-[0.9]'
                >
                    <SparklesIcon className='text-[#3c4b8f] mr-[10px] h-5 w-5' />
                    <h1 className='Welcome-text text-[13px]'>Software Engineer Portfolio</h1>
                </motion.div>
                <motion.div
                    variants={slideInFromLeft(0.5)}
                    className='flex flex-col gap-6 mt-6 text-xl text-center md:text-left lg:text-6xl font-bold text-white max-w-[600px] w-auto h-auto'
                >
                    Hello, I&apos;m Dannon.
                </motion.div>
                <motion.p
                    variants={slideInFromLeft(0.8)}
                    className='md:text-lg text-gray-400 my-5 max-w-[600px] text-center md:text-left'
                >
                    Welcome to my portfolio! I&apos;m a passionate and versatile creative professional with a focus on software engineering and web design. With a keen eye for aesthetics and a love for problem-solving, I strive to bring innovative and user-friendly experiences to life.
                </motion.p>
                <motion.a
                    variants={slideInFromLeft(1)}
                    className='py-2 button-primary text-center text-white cursor-pointer rounded-lg w-[200px] max-w-[200px]'
                    href='#skills'
                >
                    Learn More
                </motion.a>
            </div>
            <motion.div
                variants={slideInFromRight(0.8)}
                className='w-full h-full justify-center items-center hidden md:flex'
            >
                <Image
                    src='/mainIconsdark.svg'
                    alt='work icons'
                    height={650}
                    width={650}
                    priority
                />
            </motion.div>
        </motion.div>
    )
}

export default HeroContent