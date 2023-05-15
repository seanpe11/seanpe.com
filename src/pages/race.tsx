import { type NextPage } from "next";
import { useState, useEffect } from "react";
import { ALLOWED_KEYS } from "~/utils/constants";
import Head from "next/head";
import Link from "next/link";


const Race: NextPage = () => {
  const [typed, setTyped] = useState<Array<KeyboardEvent>>([])
  const [outString, setOutString] = useState('')

  const onKeyPress = (event: KeyboardEvent) => {
    setTyped(prev => [...prev, event])
    if (ALLOWED_KEYS.includes(event.key))
      setOutString(prev => prev + event.key)
  }


  useEffect(() => {
      window.addEventListener("keydown", onKeyPress)
  }, []);

  return(
    <>
      <div >
        {typed.map(k => <>{k.key}</>)}
      </div>
      <div>
        {outString}
      </div>
    </>
  )
}

export default Race;
