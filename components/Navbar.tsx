import Image from 'next/image'

import { Socials } from '@/constants'

const Navbar = () => {
    return (
        <header className='w-full h-[65px] fixed top-0 shadow-lg shadow-[#2a0e61] bg-[#03001417] backdrop-blur-md z-50 '>
            <div className='w-full h-full flex flex-row items-center justify-center lg:justify-between m-auto px-[10px]'>
                <a href='#about-me' className='h-auto w-auto flex flex-row items-center'>
                    <span className='font-bold ml-[10px] hidden md:block text-gray-300'>
                        Dannon Bigham
                    </span>
                </a>

                <nav className='w-full lg:w-[30%] h-full flex flex-row items-center justify-between md:mr-20'>
                    <div className='flex items-center justify-between w-full h-auto mr-[15px] px-[20px] py-[10px] text-gray-200'>
                        <a href='#about-me' className='cursor-pointer'>About Me</a>
                        <a href='#skills' className='cursor-pointer'>Skills</a>
                        <a href='#projects' className='cursor-pointer'>Projects</a>
                        <a href='/dannon_resume_2023.pdf' target='_blank' className='cursor-pointer'>Resume</a>
                    </div>
                </nav>

                <div className='hidden md:flex flex-row gap-5'>
                    {Socials.map((social) => (
                        <a href={social.href} target='_blank' key={social.name}>
                            <Image
                                src={social.src}
                                alt={social.name}
                                width={36}
                                height={36}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Navbar