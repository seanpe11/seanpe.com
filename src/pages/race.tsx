import { type NextPage } from "next";
import { useState, useEffect } from "react";
import { ALLOWED_KEYS } from "~/utils/constants";
import Head from "next/head";
import Link from "next/link";

const sampleText = "Dreams without goals are just dreams and, ultimately, they fuel disappointment. On the road to achieving your dreams you must apply discipline but more importantly consistency. Because without commitment, you'll never start. But without consistency, you'll never finish."
// const sampleText = "'"

const Race: NextPage = () => {
  const [typed, setTyped] = useState<Array<KeyboardEvent>>([])
  const [outString, setOutString] = useState(sampleText)
  const [prompt, setPrompt] = useState(sampleText)
  // used to track where user is
  const [loc, setLoc] = useState(0)
  const [finished, setFinished] = useState(false)

  const onKeyPress = (event: KeyboardEvent) => {
    setTyped(prev => [...prev, event])

    if (event.key == 'Backspace') {
      setOutString(prev => prev.slice(0, -1))
      setLoc((current) => current - 1)
    }

    if (ALLOWED_KEYS.includes(event.key)) {

      setLoc((current) => current + 1)
      setOutString(prev => prev + event.key)
    }

    // figure out a better way to check if strings are equal
  }


  useEffect(() => {
      window.addEventListener("keydown", onKeyPress)
  }, []);

  useEffect(() => {
    setFinished((_c) => prompt.localeCompare(outString) == 0)
  }, [outString]);

  return(
    <>
      <div className="container">
        <div className="promptBox tracking-wide">
          <span className="underline">{sampleText.substring(0,loc)}</span>
          <span className="border"></span>
          {sampleText.substring(loc)}
        </div>
      </div>
      <div className="inputBox border m-5">
        {outString}
      </div>
        
      {finished ? <>Done</> : <>Not done</>}
      <div className="my-5">
        {typed.map((k, index) => <span key={index}>{k.key}</span>)}
      </div>
      <button className="btn">Done</button>
    </>
  )
}

export default Race;
