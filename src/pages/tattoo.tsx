import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import TypeRace from '~/components/TypeRace'

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
        <h2>Here's a picture of you and me because I love you, to showcase that I really can put whatever I want on this website</h2>
      </main>
    </>
  )
}

export default Tattoo;
