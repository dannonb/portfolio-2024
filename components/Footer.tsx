import React from 'react'
import { RxGithubLogo, RxTwitterLogo, RxLinkedinLogo } from 'react-icons/rx'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Dannon Bigham</h3>
                        <p className="text-sm sm:text-base text-gray-400">Full-Stack Developer</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 sm:gap-6">
                        <Link 
                            href='https://github.com/dannonb'
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <RxGithubLogo size={24} />
                        </Link>
                        <Link 
                            href='https://twitter.com/devbydannon'
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <RxTwitterLogo size={24} />
                        </Link>
                        <Link 
                            href='https://linkedin.com/in/dannonbigham'
                            target="_blank"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <RxLinkedinLogo size={24} />
                        </Link>
                    </div>

                    {/* Contact */}
                    <div className="text-center md:text-right">
                        <a 
                            href="mailto:dannonbigham@gmail.com"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            dannonbigham@gmail.com
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Dannon Bigham. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer