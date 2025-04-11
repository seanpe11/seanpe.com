import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { useToast } from "~/hooks/use-toast";

export const HomeTab = () => {
  const quote = api.notion.getQuote.useQuery(undefined, {
    refetchInterval: false,
  });
  const { toast } = useToast();

  return (
    <div className="mx-auto max-w-4xl py-8 sm:py-10 lg:py-14">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Left side - Profile and Name */}
        <div className="flex flex-col items-center sm:items-start">
          <motion.div
            initial={{ scale: 0, x: -150 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.25 }}
            className="w-24 h-24 mx-3 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#33ccff]"
          >
            <Image
              src="/images/profile.jpg"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              alt="Sean Pe"
              priority
            />
          </motion.div>
          <div className="mx-3 mt-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Sean Pe
              <span className="block text-base sm:text-3xl bg-gradient-to-r from-[#33ccff] to-[#00ff99] bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </motion.h1>
            <div className="flex gap-4 mt-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, delay: 0.55 }}
                className="rounded-full"
              >
                <SocialIcon
                  style={{ height: 40, width: 40 }}
                  url="https://github.com/seanpe11"
                  bgColor="#33ccff"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, delay: 0.35 }}
                className="rounded-full"
              >
                <SocialIcon
                  style={{ height: 40, width: 40 }}
                  url="https://www.linkedin.com/in/sean-pe-84b1401a4/"
                  bgColor="#33ccff"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, delay: 0.45 }}
                className="rounded-full cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("sean.m.s.pe@gmail.com");
                  toast({
                    title: "Email copied!",
                    description: "sean.m.s.pe@gmail.com has been copied to your clipboard",
                    className: "bg-[#33ccff]/10 border border-[#33ccff]/20 text-white",
                  });
                }}
              >
                <svg
                  style={{ height: 40, width: 40 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                    stroke="#33ccff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right side - Blurb and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 max-w-lg"
        >
          <div className="mt-8 flex flex-col items-center justify-start gap-4">
            <div className="w-full">
              <p className="text-white text-lg text-semibold">
                Hi! I'm Sean. I hold a Bachelor's degree in Computer Science and have worked as a full-stack developer for 2 years, base myself out of Houston, Texas. I'm a problem-solver at heart and love to build solutions that tackle real-world problems. Let's work together! Explore my projects here or reach out to me on <a href="https://www.linkedin.com/in/sean-pe-84b1401a4/" className="text-[#33ccff] hover:underline">LinkedIn</a>.
              </p>
              <p className="text-slate-300 text-sm">P.S. I use neovim and Linux btw, so if you're reaching out, I'd love to see your config!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center"
              >
                <Link
                  href="/race"
                  className="px-6 py-3 rounded-none bg-[#33ccff] text-gray-900 font-medium hover:opacity-90 transition-opacity shadow-lg shadow-[#33ccff]/30 border border-white/20 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                >
                  Download Resume <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center justify-center"
              >
                <Link href="https://197cpd.ph" className="px-6 py-3 rounded-none bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                  Latest Project
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-zinc-400 mb-2">A quote from somewhere, sometime in my life</p>
        <motion.p 
          key={quote.data?.quote.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-lg sm:text-xl font-bold text-white"
        >
          {quote.data ? quote.data.quote.text : "Loading tRPC query..."}
        </motion.p>
      </motion.div>
    </div>
  );
}; 