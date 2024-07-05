import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image"

const Tattoo: NextPage = () => {
  return (
    <>
      <Head>
        <title>Check out my Tattoo!</title>
        <meta name="description" content="A place to showcase what the tattoo's current meaning is." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#525252] to-[#040404] text-white">
        <h1 className="text-4xl">I love you Mama!</h1>
        <p>This QR code is highly configurable, and thus can contain anything I want as a link.</p>
        <h2>Here&apos;s a picture of you and me because I love you, to showcase that I really can put whatever I want on this website</h2>
        <Image src={`/images/sweet-mama.jpg`} alt={'hello'} />
        <div>
          <h1>Arguments as to why I can have a tattoo</h1>
          <ul>
            <li>I&apos;m a big boy now</li>
            <li>I chose designs that are cool</li>
            <li>I chose placements that are concealable</li>
            <li>If anything, for the career path that I want, the tattoos I have would make me MORE hireable</li>
            <li>I can explain each tattoo well, and the current website you&apos;re viewing is the other half of the QR Code tattoo</li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default Tattoo;
