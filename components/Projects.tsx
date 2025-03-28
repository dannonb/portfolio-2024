import { freelance, mobileApps, personalProjects, professionalWebsites, projects } from '@/constants'
import ProjectCard from './ProjectCard'

const Projects = () => {
    return (
        <section className='flex flex-col items-center justify-center' id='projects'>
            <h2 className='text-[40px] font-semibold text-white py-20'>
                Professional Web Apps
            </h2>
            <div className='h-full w-[90%] lg:w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-10 x-10'>
                {professionalWebsites.map(({ src, href, name, stack }) => (
                    <ProjectCard
                        key={name}
                        src={src}
                        href={href}
                        name={name}
                        stack={stack}
                    />
                ))}
            </div>
            <h2 className='text-[40px] font-semibold text-white py-20'>
                Professional Mobile Apps
            </h2>
            <div className='h-full w-[90%] lg:w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-10 x-10'>
                {mobileApps.map(({ src, href, name, stack }) => (
                    <ProjectCard
                        key={name}
                        src={src}
                        href={href}
                        name={name}
                        stack={stack}
                    />
                ))}
            </div>
            <h2 className='text-[40px] font-semibold text-white py-20'>
                Freelance Web Apps
            </h2>
            <div className='h-full w-[90%] lg:w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-10 x-10'>
                {freelance.map(({ src, href, name, stack }) => (
                    <ProjectCard
                        key={name}
                        src={src}
                        href={href}
                        name={name}
                        stack={stack}
                    />
                ))}
            </div>
            <h2 className='text-[40px] font-semibold text-white py-20'>
                Personal Projects
            </h2>
            <div className='h-full w-[90%] lg:w-full flex flex-col md:flex-row flex-wrap justify-evenly gap-10 x-10'>
                {personalProjects.map(({ src, href, name, stack }) => (
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