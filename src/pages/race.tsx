import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import TypeRace from '~/components/TypeRace'

const Race: NextPage = () => {
  return (
  <>
    <Head>
        <title>TypeRace!</title>
        <meta name="description" content="Type racing react app created by Sean Pe" />
        <link rel="icon" href="/favicon.ico" />
   </Head>

    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#525252] to-[#040404] text-white">
      <TypeRace/>
    </main>
  </>
  )
}

export default Race;
