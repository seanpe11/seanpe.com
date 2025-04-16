import { api } from "~/utils/api";

const SkillIcon = ({ name, iconUrl }: { name: string; iconUrl: string }) => (
  <div className="flex flex-col items-center gap-1 p-2">
    <img
      src={iconUrl}
      alt={`${name} icon`}
      className="w-10 h-10"
    />
    <span className="text-xs text-gray-300 text-center">{name}</span>
  </div>
);

const LanguageRow = ({ language, tools }: { 
  language: { name: string; iconUrl: string; }; 
  tools: Array<{ name: string; iconUrl: string; }>;
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      {/* Language cell */}
      <div className="col-span-2 flex items-center justify-center border-r border-white/10">
        <SkillIcon name={language.name} iconUrl={language.iconUrl} />
      </div>
      {/* Tools cell */}
      <div className="col-span-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {tools.map((tool) => (
            <SkillIcon key={tool.name} name={tool.name} iconUrl={tool.iconUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillIcons = () => {
  const { data: skillsData } = api.portfolio.getSkills.useQuery();

  if (!skillsData) return null;

  // Group tools by their associated language
  const toolsByLanguage = skillsData.skills.reduce((acc, skill) => {
    if (!skill.skillIconUrl) return acc;

    if (skill.type === "language") {
      if (!acc[skill.name]) {
        acc[skill.name] = {
          language: { name: skill.name, iconUrl: skill.skillIconUrl },
          tools: []
        };
      }
    } else if (skill.language) {
      const languageSkill = skillsData.skills.find(s => s.name === skill.language && s.type === "language");
      if (!languageSkill?.skillIconUrl) return acc;
      
      if (!acc[skill.language]) {
        acc[skill.language] = {
          language: { name: skill.language, iconUrl: languageSkill.skillIconUrl },
          tools: []
        };
      }
      acc[skill.language]?.tools.push({ name: skill.name, iconUrl: skill.skillIconUrl });
    }
    return acc;
  }, {} as Record<string, { language: { name: string; iconUrl: string; }; tools: Array<{ name: string; iconUrl: string; }> }>);

  // Sort languages by number of tools (descending)
  const sortedLanguages = Object.entries(toolsByLanguage)
    .sort(([, a], [, b]) => b.tools.length - a.tools.length);

  return (
    <div className="space-y-4">
      {sortedLanguages.map(([langName, { language, tools }]) => (
        <LanguageRow
          key={langName}
          language={language}
          tools={tools}
        />
      ))}
    </div>
  );
};

export default SkillIcons; 