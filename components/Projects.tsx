import { projects } from '@/constants'
import ProjectCard from './ProjectCard'

const Projects = () => {
    return (
        <section className='flex flex-col items-center justify-center' id='projects'>
            <h1 className='text-[40px] font-semibold text-white py-20'>
                My Projects
            </h1>
            <div className='h-full w-[90%] lg:w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-10 x-10'>
                {projects.map(({ src, href, name, stack }) => (
                    <ProjectCard
                        key={name}
                        src={src}
                        href={href}
                        name={name}
                        stack={stack}
                    />
                ))}
            </div>
        </section>
    )
}

export default Projects