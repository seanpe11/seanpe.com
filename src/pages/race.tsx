import { type NextPage } from "next";
import { useState, useEffect } from "react";
import { ALLOWED_KEYS } from "~/utils/constants";
import Head from "next/head";
import Link from "next/link";

const sampleText = "It's a praying mantis. Do you know how they mate? The male will sneak up on the female and she'll bite off his head and the rest of his body will keep on mating and when they're done she'll eat him. She'll eat the rest of him."

const Race: NextPage = () => {
  const [typed, setTyped] = useState<Array<KeyboardEvent>>([])
  const [outString, setOutString] = useState('')
  const [prompt, setPrompt] = useState(sampleText)
  // used to track where user is
  const [loc, setLoc] = useState(0)

  const onKeyPress = (event: KeyboardEvent) => {
    setTyped(prev => [...prev, event])

    if (event.key == 'Backspace') {
        setOutString(prev => prev.slice(0, -1))
    }

    if (ALLOWED_KEYS.includes(event.key)) {
      setLoc(loc + 1)
      setOutString(prev => prev + event.key)
    }
  }


  useEffect(() => {
      window.addEventListener("keydown", onKeyPress)
  }, []);

  return(
    <>
      <div>
        <span className="text-gray">{sampleText.substring(0,loc)}</span>{sampleText.substring(loc)}
      </div>
      <div>
        {outString}
      </div>
      <div >
        {typed.map(k => <>{k.key}</>)}
      </div>
    </>
  )
}

export default Race;
