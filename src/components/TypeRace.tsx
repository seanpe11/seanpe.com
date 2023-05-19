import { useState, useEffect } from 'react'
import { ALLOWED_KEYS } from "~/utils/constants";


const sampleText = "Dreams without goals are just dreams and, ultimately, they fuel disappointment. On the road to achieving your dreams you must apply discipline but more importantly consistency. Because without commitment, you'll never start. But without consistency, you'll never finish."

const TypeRace: React.FC = () => {
  const [typed, setTyped] = useState<Array<KeyboardEvent>>([])
  const [outString, setOutString] = useState("")
  const [words, setWords] = useState(sampleText.split(" "))
  const [prompt, setPrompt] = useState(sampleText)
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
    setOutString("")
    setWpm(0)
    setStart(new Date())
    setLoc(0)
  }


  useEffect(() => {
      window.addEventListener("keydown", onKeyPress)
  }, []);

  useEffect(() => {
    if (outString.length == 1) {
      setStart(new Date())
    } 
    else {
      const ms = (new Date()).getTime() - start.getTime()
      const wpm = outString.length / ms * 10000
      setWpm(wpm)
    }

    const finished = prompt.localeCompare(outString) == 0
    setFinished(finished)

  }, [outString]);

  return(
    <>
      <div className="container place-content-center rounded bg-white/10">
        <div className="promptBox tracking-wide w-5/6 m-5 text-justify text-white">
          <span className="">{sampleText.substring(0,loc)}</span>
          <span className="border"></span>
          <span className="text-slate-400">{sampleText.substring(loc)}</span>
        </div>

        <div className="inputBox border m-5">
          {outString}
        </div>
      </div>
        
      {finished ? <>Done</> : <>Not done</>}
      <div>{wpm}wpm</div>
      <button className="rounded-full text-slate-400 hover:text-white" onClick={reset} >Reset</button>
      <div className="my-5" hidden>
        {typed.map((k, index) => <span key={index}>{k.key}</span>)}
      </div>
    </>
  )
}

export default TypeRace;
