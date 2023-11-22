import Image from 'next/image';

interface Props {
  src: string;
  name: string;
  stack: string;
  href: string;
}

const ProjectCard = ({ src, href, name, stack }: Props) => {
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg border border-[#2a0e61] z-[20]'>
        <a href={href}>
                <Image
                    src={src}
                    alt={name}
                    width={200}
                    height={200}
                    className='w-full object-contain'
                />
                <div className='relative p-4'>
                    <h1 className='text-2xl font-semibold text-white'>{name}</h1>
                    <p className='mt-2 text-gray-300'>{stack}</p>
                </div>
            </a>
    </div>
  )
}

export default ProjectCard