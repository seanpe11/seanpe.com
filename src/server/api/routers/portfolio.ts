import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define the skill types
export type Skill = {
  name: string;
  type: "language" | "library" | "framework" | "database" | "tool" | "platform" | "runtime" | "concept" | "environment";
  category: "front-end" | "back-end" | "devops" | "data-science" | "machine-learning" | "scientific-computing" | "general" | "design" | "healthcare";
  language?: string;
  skillIconUrl?: string;
};

// Skills data
const skillIconUrlMap: Record<string, string> = {
  "Python": "https://skillicons.dev/icons?i=python",
  "JavaScript": "https://skillicons.dev/icons?i=js",
  "TypeScript": "https://skillicons.dev/icons?i=ts",
  "HTML": "https://skillicons.dev/icons?i=html",
  "CSS": "https://skillicons.dev/icons?i=css",
  "C": "https://skillicons.dev/icons?i=c",
  "C++": "https://skillicons.dev/icons?i=cpp",
  "R": "https://skillicons.dev/icons?i=r",
  "Rust": "https://skillicons.dev/icons?i=rust",
  "Node.js": "https://skillicons.dev/icons?i=nodejs",
  "React": "https://skillicons.dev/icons?i=react",
  "Next.js": "https://skillicons.dev/icons?i=nextjs",
  "Tailwind CSS": "https://skillicons.dev/icons?i=tailwind",
  "Prisma": "https://skillicons.dev/icons?i=prisma",
  "PostgreSQL": "https://skillicons.dev/icons?i=postgres",
  "Git": "https://skillicons.dev/icons?i=git",
  "Docker": "https://skillicons.dev/icons?i=docker",
  "AWS": "https://skillicons.dev/icons?i=aws",
  "Vercel": "https://skillicons.dev/icons?i=vercel",
  "Linux": "https://skillicons.dev/icons?i=linux",
  "JupyterLab": "https://skillicons.dev/icons?i=jupyter",
  "FastAPI": "https://skillicons.dev/icons?i=fastapi",
  "Express": "https://skillicons.dev/icons?i=express",
  "Jupyter Notebooks": "https://skillicons.dev/icons?i=jupyter",
  "Epic": "https://skillicons.dev/icons?i=epic",
  "Notion": "https://skillicons.dev/icons?i=notion",
  "Figma": "https://skillicons.dev/icons?i=figma",
  "Seurat": "https://skillicons.dev/icons?i=seurat",
  "NumPy": "https://skillicons.dev/icons?i=numpy",
  "Scanpy": "https://skillicons.dev/icons?i=scanpy",
  "SciPy": "https://skillicons.dev/icons?i=scipy",
  "Matplotlib": "https://skillicons.dev/icons?i=matplotlib",
  "Plotly": "https://skillicons.dev/icons?i=plotly",
  "Scikit-learn": "https://skillicons.dev/icons?i=sklearn",
  "TensorFlow": "https://skillicons.dev/icons?i=tensorflow",
  "PyTorch": "https://skillicons.dev/icons?i=pytorch",
  "Pandas": "https://skillicons.dev/icons?i=pandas",
};

const skills: Skill[] = [
  // Languages
  { name: "Python", type: "language", category: "data-science", language: "Python", skillIconUrl: skillIconUrlMap["Python"] },
  { name: "JavaScript", type: "language", category: "front-end", language: "JavaScript", skillIconUrl: skillIconUrlMap["JavaScript"] },
  { name: "TypeScript", type: "language", category: "front-end", language: "TypeScript", skillIconUrl: skillIconUrlMap["TypeScript"] },
  { name: "HTML", type: "language", category: "front-end", language: "HTML", skillIconUrl: skillIconUrlMap["HTML"] },
  { name: "CSS", type: "language", category: "front-end", language: "CSS", skillIconUrl: skillIconUrlMap["CSS"] },
  { name: "C", type: "language", category: "general", language: "C", skillIconUrl: skillIconUrlMap["C"] },
  { name: "C++", type: "language", category: "general", language: "C++", skillIconUrl: skillIconUrlMap["C++"] },
  { name: "R", type: "language", category: "data-science", language: "R", skillIconUrl: skillIconUrlMap["R"] },
  { name: "Rust", type: "language", category: "back-end", language: "Rust", skillIconUrl: skillIconUrlMap["Rust"] },
  { name: "Node.js", type: "runtime", category: "back-end", language: "JavaScript", skillIconUrl: skillIconUrlMap["Node.js"] },
  
  // Libraries & Frameworks
  { name: "Pandas", type: "library", category: "data-science", language: "Python", skillIconUrl: skillIconUrlMap["Pandas"] },
  { name: "NumPy", type: "library", category: "data-science", language: "Python", skillIconUrl: skillIconUrlMap["NumPy"] },
  { name: "Scanpy", type: "library", category: "data-science", language: "Python", skillIconUrl: skillIconUrlMap["Scanpy"] },
  { name: "SciPy", type: "library", category: "data-science", language: "Python", skillIconUrl: skillIconUrlMap["SciPy"] },
  { name: "React", type: "library", category: "front-end", language: "JavaScript", skillIconUrl: skillIconUrlMap["React"] },
  { name: "Seurat", type: "library", category: "data-science", language: "R", skillIconUrl: skillIconUrlMap["Seurat"] },
  { name: "Express", type: "framework", category: "back-end", language: "JavaScript", skillIconUrl: skillIconUrlMap["Express"] },
  { name: "FastAPI", type: "framework", category: "back-end", language: "Python", skillIconUrl: skillIconUrlMap["FastAPI"] },
  { name: "Next.js", type: "framework", category: "front-end", language: "JavaScript", skillIconUrl: skillIconUrlMap["Next.js"] },
  { name: "Tailwind CSS", type: "framework", category: "front-end", language: "CSS", skillIconUrl: skillIconUrlMap["Tailwind CSS"] },
  { name: "tRPC", type: "library", category: "back-end", language: "TypeScript" },
  { name: "Prisma", type: "library", category: "back-end", language: "TypeScript", skillIconUrl: skillIconUrlMap["Prisma"] },

  // Databases
  { name: "PostgreSQL", type: "database", category: "back-end", skillIconUrl: skillIconUrlMap["PostgreSQL"] },

  // Tools & Platforms
  { name: "JupyterLab", type: "tool", category: "data-science", skillIconUrl: skillIconUrlMap["JupyterLab"] },
  { name: "Jupyter Notebooks", type: "tool", category: "data-science", skillIconUrl: skillIconUrlMap["Jupyter Notebooks"] },
  { name: "Linux", type: "platform", category: "devops", skillIconUrl: skillIconUrlMap["Linux"] },
  { name: "Microsoft Word", type: "tool", category: "general" },
  { name: "Microsoft Powerpoint", type: "tool", category: "general" },
  { name: "Google Colab", type: "platform", category: "data-science" },
  { name: "Git", type: "tool", category: "devops", skillIconUrl: skillIconUrlMap["Git"] },
  { name: "Github", type: "platform", category: "devops", skillIconUrl: skillIconUrlMap["Github"] },
  { name: "Notion", type: "tool", category: "general", skillIconUrl: skillIconUrlMap["Notion"] },
  { name: "Figma", type: "tool", category: "design", skillIconUrl: skillIconUrlMap["Figma"] },
  { name: "Epic", type: "platform", category: "healthcare", skillIconUrl: skillIconUrlMap["Epic"] },
  { name: "Docker", type: "platform", category: "devops", skillIconUrl: skillIconUrlMap["Docker"] },
  { name: "AWS", type: "platform", category: "devops", skillIconUrl: skillIconUrlMap["AWS"] },
  { name: "Vercel", type: "platform", category: "devops", skillIconUrl: skillIconUrlMap["Vercel"] },
  { name: "Cloudflare", type: "platform", category: "devops" },
];

export const portfolioRouter = createTRPCRouter({
  getSkills: publicProcedure
    .query(() => {
      return {
        skills,
      };
    }),
}); 