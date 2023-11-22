import { Frontend_skill, Backend_skill, Full_stack, Other_skill, Skill_data, Mobile_skill } from '@/constants'
import SkillDataProvider from './SkillDataProvider'
import SkillText from './SkillText'

const Skills = () => {
    return (
        <section
            className='flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20'
            id="skills"
            style={{ transform: 'scale(0.9)' }}
        >
            <SkillText />
            <div className='hidden lg:flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Frontend_skill.map((image, index) => (
                    <SkillDataProvider
                        key={index}
                        src={image.Image}
                        width={image.width}
                        height={image.height}
                        index={index}
                    />
                ))}
            </div>
            <div className='hidden lg:flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Backend_skill.map((image, index) => (
                    <SkillDataProvider
                        key={index}
                        src={image.Image}
                        width={image.width}
                        height={image.height}
                        index={index}
                    />
                ))}
            </div>
            <div className='hidden lg:flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Full_stack.map((image, index) => (
                    <SkillDataProvider
                        key={index}
                        src={image.Image}
                        width={image.width}
                        height={image.height}
                        index={index}
                    />
                ))}
            </div>
            <div className='hidden lg:flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Other_skill.map((image, index) => (
                    <SkillDataProvider
                        key={index}
                        src={image.Image}
                        width={image.width}
                        height={image.height}
                        index={index}
                    />
                ))}
            </div>
            <div className='lg:hidden flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Mobile_skill.map((image, index) => (
                    <SkillDataProvider
                        key={index}
                        src={image.Image}
                        width={image.width}
                        height={image.height}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}

export default Skills