import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import TypeRace from '~/components/TypeRace'

const sampleText = "Dreams without goals are just dreams and, ultimately, they fuel disappointment. On the road to achieving your dreams you must apply discipline but more importantly consistency. Because without commitment, you'll never start. But without consistency, you'll never finish."

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
