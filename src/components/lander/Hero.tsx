import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { useToast } from "~/hooks/use-toast";
import { PROFILE } from "~/data/profile";

type HeroProps = { onShowWork: () => void };

export const Hero = ({ onShowWork }: HeroProps) => {
  const { toast } = useToast();

  const copyEmail = () => {
    void navigator.clipboard.writeText(PROFILE.email);
    toast({
      title: "Email copied",
      description: `${PROFILE.email} is on your clipboard`,
      className: "bg-[#33ccff]/10 border border-[#33ccff]/20 text-white",
    });
  };

  return (
    <div className="pt-6 sm:pt-10">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Identity */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div
            className="fade-in h-24 w-24 overflow-hidden rounded-full border-2 border-[#33ccff] sm:h-40 sm:w-40"
          >
            <Image
              src="/images/profile.jpg"
              width={500}
              height={500}
              className="h-full w-full object-cover"
              alt="Sean Pe"
              priority
            />
          </div>
          <h1
            className="fade-up delay-1 mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {PROFILE.name}
            <span className="block text-base font-semibold text-[#33ccff] sm:text-2xl">
              {PROFILE.headline}
            </span>
          </h1>
          <p className="fade-up delay-2 mt-1 text-sm text-zinc-400">
            {PROFILE.subline}
          </p>
          <div className="fade-up delay-3 mt-4 flex items-center gap-3">
            <SocialIcon style={{ height: 36, width: 36 }} url={PROFILE.github} target="_blank" />
            <SocialIcon style={{ height: 36, width: 36 }} url={PROFILE.linkedin} target="_blank" />
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="rounded-full p-1 transition-colors hover:bg-white/10"
            >
              <svg style={{ height: 28, width: 28 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Intro */}
        <div className="fade-up delay-3 max-w-lg flex-1 sm:pt-2">
          <div className="space-y-3 leading-relaxed text-zinc-300">
            {PROFILE.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={PROFILE.resume}
              className="inline-flex items-center gap-2 rounded-none border border-white/20 bg-[#33ccff] px-5 py-2.5 text-sm font-medium text-gray-900 shadow-lg shadow-[#33ccff]/30 transition-opacity hover:opacity-90"
            >
              Download Résumé
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onShowWork}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              See the work →
            </button>
            {PROFILE.notesLive && (
              <a href={PROFILE.notes} className="text-sm text-zinc-400 transition-colors hover:text-white">
                Notes →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
