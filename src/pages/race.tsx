import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";


const Race: NextPage = () => {
  const [typed, setTyped] = useState("")

  const handleKeyPress = (event) => {
    console.log(event.key + " " + new Date())
    const {timestamp, key, code} = event
    setTyped(typed + key)
  }
  useEffect(() => {
      window.addEventListener("keydown", handleKeyPress)
  }, []);

  return(
    <>
      <div >
        Race!!!
      </div>
    </>
  )
}

export default Race;
