import { useState, useEffect } from 'react'
import { ALLOWED_KEYS } from "~/utils/constants";
import { api } from "~/utils/api";
import getRandomQuote from "~/utils/notion/quote"


const TypeRace: React.FC = () => {
  const [typed, setTyped] = useState<Array<KeyboardEvent>>([])
  const [outString, setOutString] = useState("")
  // @ts-ignore
  const { data, refetch } = api.notion.getQuote.useQuery(['quote'], {stale: true})
  const quote = data
  // const [prompt, setPrompt] = useState("")
  // used to track where user is
  const [loc, setLoc] = useState(0)
  const [finished, setFinished] = useState(false)
  const [start, setStart] = useState<Date>(new Date())
  const [wpm, setWpm] = useState(0)

  const onKeyPress = (event: KeyboardEvent) => {
    setTyped(prev => [...prev, event])

    if (event.key == 'Backspace') {
      if (event.ctrlKey) {
      
      } 
      else {
        setOutString(prev => prev.slice(0, -1))
        setLoc((current) => current - 1)
      }
    }

    if (ALLOWED_KEYS.includes(event.key)) {

      setLoc((current) => current + 1)
      setOutString(prev => prev + event.key)
    }
    // figure out a better way to check if strings are equal
  }

  const reset = () => {
    refetch()
    setOutString("")
    setWpm(0)
    setStart(new Date())
    setLoc(0)
  }

  useEffect(() => {
      (async () => {
        // @ts-ignore
      })()

      window.addEventListener("keydown", onKeyPress)
  }, []);

  useEffect(() => {

  }, [outString]);

  useEffect(() => {
    if (outString.length == 1) {
      setStart(new Date())
    } 
    else {
      const ms = (new Date()).getTime() - start.getTime()
      const wpm = outString.length / ms * 10000
      setWpm(wpm)
    }

    const finished = false
    setFinished(finished)

  }, [outString]);

  return(
    <>
      <div className="container place-content-center rounded bg-white/10">
        <div className="promptBox tracking-wide w-5/6 m-5 text-justify text-white">
          <span className="">{quote ? quote.quote.text.substring(0,loc) : "loading..."}</span>
          <span className="border"></span>
          <span className="text-slate-400">{quote ? quote.quote.text.substring(loc) : ''}</span>
        </div>

        <div className="inputBox border m-5">
          {outString}
        </div>
      </div>
        
      {finished ? <>Done</> : <>Not done</>}
      <div>{wpm.toFixed(2)}wpm</div>
      <button className="rounded-full text-slate-400 hover:text-white" onClick={reset} >Reset</button>
      <div className="my-5" hidden>
        {typed.map((k, index) => <span key={index}>{k.key}</span>)}
      </div>
    </>
  )
}

export default TypeRace;
