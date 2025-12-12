"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const contactMethods = [
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
            ),
            title: 'Email',
            value: 'dannonbigham@gmail.com',
            href: 'mailto:dannonbigham@gmail.com'
        },
        {
            icon: (
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
            ),
            title: 'Location',
            value: 'Fresno, CA',
            href: null
        },
        {
            icon: (
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                </svg>
            ),
            title: 'LinkedIn',
            value: 'Connect with me',
            href: 'https://linkedin.com/in/dannonbigham'
        }
    ]

    return (
        <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8' id='contact'>
            <div className='max-w-5xl mx-auto'>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6'>
                        Let&apos;s <span className='gradient-text'>Connect</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto'>
                        Ready to bring your ideas to life? Let&apos;s discuss your next project 
                        and create something amazing together.
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12'>
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            {method.href ? (
                                <a
                                    href={method.href}
                                    target={method.href.startsWith('http') ? '_blank' : undefined}
                                    className='block glass-effect p-8 rounded-2xl text-center hover-lift group'
                                >
                                    <div className='w-12 h-12 mx-auto mb-4 text-blue-400 group-hover:text-blue-300 transition-colors'>
                                        {method.icon}
                                    </div>
                                    <h3 className='text-lg font-semibold mb-2'>{method.title}</h3>
                                    <p className='text-gray-400 group-hover:text-gray-300 transition-colors'>
                                        {method.value}
                                    </p>
                                </a>
                            ) : (
                                <div className='glass-effect p-8 rounded-2xl text-center'>
                                    <div className='w-12 h-12 mx-auto mb-4 text-blue-400'>
                                        {method.icon}
                                    </div>
                                    <h3 className='text-lg font-semibold mb-2'>{method.title}</h3>
                                    <p className='text-gray-400'>{method.value}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='text-center'
                >
                    <div className='glass-effect p-8 rounded-2xl'>
                        <h3 className='text-2xl font-bold mb-4'>Ready to Start a Project?</h3>
                        <p className='text-gray-400 mb-6 max-w-lg mx-auto'>
                            Whether you need a new website, mobile app, or technical consultation, 
                            I&apos;m here to help turn your vision into reality.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <a href='mailto:dannonbigham@gmail.com' className='btn-primary'>
                                Send Me an Email
                                <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                </svg>
                            </a>
                            <a href='/Dannon_Resume.pdf' target='_blank' className='btn-secondary'>
                                Download Resume
                                <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact