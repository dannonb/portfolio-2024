import { Frontend_skill, Backend_skill, Full_stack, Other_skill, Mobile_skill } from '@/constants'
import SkillDataProvider from './SkillDataProvider'

const Skills = () => {
    const skillCategories = [
        { title: "Frontend", skills: Frontend_skill },
        { title: "Backend", skills: Backend_skill },
        { title: "Full Stack", skills: Full_stack },
        { title: "Tools", skills: Other_skill }
    ]

    return (
        <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8' id="skills">
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12 sm:mb-16'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
                        Technical <span className='gradient-text'>Skills</span>
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto'>
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                {/* Desktop Skills Grid */}
                <div className='hidden md:block space-y-8 lg:space-y-12'>
                    {skillCategories.map((category) => (
                        <div key={category.title} className='space-y-4 lg:space-y-6'>
                            <h3 className='text-xl lg:text-2xl font-semibold text-center'>{category.title}</h3>
                            <div className='flex flex-wrap justify-center gap-4 lg:gap-6'>
                                {category.skills.map((skill, index) => (
                                    <SkillDataProvider
                                        key={index}
                                        src={skill.Image}
                                        width={skill.width}
                                        height={skill.height}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Skills Grid */}
                <div className='md:hidden w-full px-2'>
                    <div className='flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 max-w-full'>
                        {Mobile_skill.map((skill, index) => (
                            <SkillDataProvider
                                key={index}
                                src={skill.Image}
                                width={skill.width}
                                height={skill.height}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills