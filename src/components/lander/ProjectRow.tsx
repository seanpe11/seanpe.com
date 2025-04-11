interface ProjectRowProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

const ProjectRow = ({ title, description, technologies, link }: ProjectRowProps) => {
  return (
    <div className="p-4 border border-white/10 rounded-none bg-white/5 hover:bg-white/10 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-zinc-400 mt-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech, index) => (
          <span key={index} className="px-2 py-1 text-xs bg-white/10 text-zinc-400 rounded-none">
            {tech}
          </span>
        ))}
      </div>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-[#33ccff] hover:text-[#00ff99] transition-colors duration-200"
        >
          View Project →
        </a>
      )}
    </div>
  );
};

export default ProjectRow;