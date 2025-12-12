import Image from "next/image"

interface Props {
  src: string;
  name: string;
  stack: string;
  href: string;
}

const ProjectCard = ({ src, href, name, stack }: Props) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block glass-effect rounded-xl overflow-hidden hover-lift"
    >
      {/* Image */}
      <div className="aspect-video bg-gray-900 flex items-center justify-center p-6">
        <Image
          src={src}
          alt={name}
          width={300}
          height={200}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-400 text-sm">
          {stack}
        </p>
      </div>
    </a>
  )
}

export default ProjectCard