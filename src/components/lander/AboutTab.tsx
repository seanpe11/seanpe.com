import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export const AboutTab = () => {
  return (
    <div className="mt-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/10 border-none">
          <CardHeader>
            <CardTitle className="text-white">GitHub Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <img 
                src="https://ghchart.rshah.org/seanpe11" 
                alt="GitHub Contributions Graph" 
                className="w-full max-w-2xl bg-white p-6"
              />
              <a 
                href="https://github.com/seanpe11" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#33ccff] hover:text-[#00ff99] transition-colors duration-200"
              >
                View my GitHub Profile →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-none">
          <CardHeader>
            <CardTitle className="text-white">About Me</CardTitle>
            <CardDescription className="text-slate-300">Personal Information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              I&apos;m a full-stack developer with an addiction to problem-solving. My goal in life is to build as many solutions as I can—solutions that tackle real-world problems and streamline everyday processes. Software is the most powerful tool I know to help people, and I use my engineering skills to create meaningful impact.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-white/10 border-none">
          <CardHeader>
            <CardTitle className="text-white">Skills</CardTitle>
            <CardDescription className="text-slate-300">Technical Proficiencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white">Frontend</h4>
                <p className="text-slate-300">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Backend</h4>
                <p className="text-slate-300">Node.js, Express, tRPC, Prisma</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">DevOps</h4>
                <p className="text-slate-300">Docker, AWS, Vercel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 