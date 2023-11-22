import React from 'react'
import {
    RxGithubLogo,
    RxTwitterLogo,
    RxLinkedinLogo
} from 'react-icons/rx'

import Link from 'next/link'

const Footer = () => {
    return (
        <div className="w-full bg-transparent text-gray-200 shadow-lg p-[15px] mt-20 z-[20]">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="lg:w-[50%] h-full flex flex-col lg:flex-row justify-around">
                    <div className="min-w-[200px] h-auto w-full flex flex-row items-center gap-10 justify-start">
                        <Link className="flex flex-row items-center my-[15px] cursor-pointer z-[20]" href='https://github.com/dannonb'>
                            <RxGithubLogo />
                            <span className="text-[15px] ml-[6px]">Github</span>
                        </Link>
                        <Link className="flex flex-row items-center my-[15px] cursor-pointer z-[20]" href='https://twitter.com/devbydannon'>
                            <RxTwitterLogo />
                            <span className="text-[15px] ml-[6px]">Twitter</span>
                        </Link>
                        <Link className="flex flex-row items-center my-[15px] cursor-pointer z-[20]" href='https://linkedin.com/in/dannonbigham'>
                            <RxLinkedinLogo />
                            <span className="text-[15px] ml-[6px]">Linkedin</span>
                        </Link>
                    </div>
                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start z-[20]">
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <span className="text-[15px] ml-[6px]">dannonbigham@gmail.com</span>
                        </p>
                    </div>
                </div>

                <div className="my-[20px] text-[15px] text-center">
                    Dannon Bigham Portfolio {new Date().getFullYear()}
                </div>
            </div>
        </div>
    )
}

export default Footer