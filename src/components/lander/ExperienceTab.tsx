import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";

import  ProjectRow from "~/components/lander/ProjectRow";

export function ExperienceTab() {
  const projects = [
    {
      title: "197 CPD",
      description: "A professional development platform built with Next.js and tRPC",
      technologies: ["Next.js", "tRPC", "Tailwind CSS", "PostgreSQL"],
      link: "https://197cpd.ph/"  
    },
    {
      title: "TypeRace",
      description: "A typing speed test application with real-time WPM calculation",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      link: "/race" 
    }
  ];

  return (
    <div className="mt-8">
      <div className="space-y-6">
        <Card className="bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Work Experience</CardTitle>
            <CardDescription className="text-zinc-400">2 years of professional experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white">Full Stack Developer</h4>
                <p className="text-zinc-400">Current Position</p>
                <p className="text-zinc-400">Building modern web applications with React, Next.js, and TypeScript</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Projects</CardTitle>
            <CardDescription className="text-zinc-400">Recent Work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <ProjectRow key={index} {...project} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 