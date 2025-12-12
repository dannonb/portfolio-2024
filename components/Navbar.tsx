"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Socials } from '@/constants'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='fixed top-0 w-full z-50 glass-effect'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <a href='#about-me' className='text-lg sm:text-xl font-bold hover:text-blue-400 transition-colors'>
                        <span className='hidden sm:inline'>Dannon Bigham</span>
                        <span className='sm:hidden'>DB</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <a href='#about-me' className='hover:text-blue-400 transition-colors'>Home</a>
                        <a href='#about' className='hover:text-blue-400 transition-colors'>About</a>
                        <a href='#skills' className='hover:text-blue-400 transition-colors'>Skills</a>
                        <a href='#projects' className='hover:text-blue-400 transition-colors'>Projects</a>
                        <a href='#contact' className='hover:text-blue-400 transition-colors'>Contact</a>
                        <a href='/Dannon_Resume.pdf' target='_blank' className='btn-primary'>
                            Resume
                        </a>
                    </div>

                    {/* Desktop Social Links */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {Socials.map((social) => (
                            <a 
                                href={social.href} 
                                target='_blank' 
                                key={social.name}
                                className='w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform'
                            >
                                <Image
                                    src={social.src}
                                    alt={social.name}
                                    width={20}
                                    height={20}
                                />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className='md:hidden w-10 h-10 flex items-center justify-center glass-effect rounded-lg'
                    >
                        <div className='w-5 h-5 flex flex-col justify-center space-y-1'>
                            <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className='md:hidden mt-4 p-4 glass-effect rounded-lg space-y-4'>
                        <a href='#about-me' onClick={() => setIsOpen(false)} className='block hover:text-blue-400 transition-colors'>Home</a>
                        <a href='#about' onClick={() => setIsOpen(false)} className='block hover:text-blue-400 transition-colors'>About</a>
                        <a href='#skills' onClick={() => setIsOpen(false)} className='block hover:text-blue-400 transition-colors'>Skills</a>
                        <a href='#projects' onClick={() => setIsOpen(false)} className='block hover:text-blue-400 transition-colors'>Projects</a>
                        <a href='#contact' onClick={() => setIsOpen(false)} className='block hover:text-blue-400 transition-colors'>Contact</a>
                        <a href='/Dannon_Resume.pdf' target='_blank' className='block btn-primary text-center'>Resume</a>
                        
                        <div className='flex justify-center space-x-4 pt-4 border-t border-white/10'>
                            {Socials.map((social) => (
                                <a 
                                    href={social.href} 
                                    target='_blank' 
                                    key={social.name}
                                    className='w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform'
                                >
                                    <Image
                                        src={social.src}
                                        alt={social.name}
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar