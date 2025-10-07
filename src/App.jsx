/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { URL } from './constants'
import Answer from './Components/Answer'

const App = () => {

  const [question, setquestion] = useState('')
  const [Result,setResult] = useState([])
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode] = useState(true)

  //history load krne k liye...
React.useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("chatHistory")) || []
  setHistory(saved)
}, [])

// history save krne k liye br br updation k bd...
React.useEffect(() => {
  localStorage.setItem("chatHistory", JSON.stringify(history))
}, [history])

   const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }
  const askquestion=async () => {
    let response = await fetch(URL + "AIzaSyDvwRiu8zaxO_a8Kdhfp1aLUACQAytxXWc", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;

    // dataString = dataString.replaceAll('{"ans":"', '');
    // dataString = dataString.replaceAll('"}', '');

    // dataString = dataString.replaceAll('\\"', '"'); 
    // dataString = dataString.replaceAll('\\n', ' ');

    dataString= dataString.split("* ");
    dataString= dataString.map((item)=>item.trim())
 
  setResult([...Result,{type:'q',text:question},{type:'a',text:dataString}]);
  // save to history
  setHistory([{ question, answer: dataString }, ...history])

 
  }
    console.log(Result)

    const loadHistory = (item) => {
  const chat = [
    { type: 'q', text: item.question },
    { type: 'a', text: item.answer }
  ]
  setResult(chat)
}

  

    
  
  return (
    <div className='grid grid-cols-5 text-center '>
      {/* <h1 className='bg-amber-300 text-5xl text-amber-000' >hyy this is the first tailwind </h1> */}
      <div className='col-span-1 bg-stone-800 h-screen '>
          <h2 className='text-lg text-amber-50 mb-4'>----Recent History----</h2>

  {/* Clear History Button */}
  <button
    onClick={() => {
      setHistory([])
      localStorage.removeItem("chatHistory")
    }}
    className="mb-4 px-3 py-1  hover:text-amber-50 hover:bg-stone-400 text-shadow-md text-stone-950 border-3 border-stone-950 w-full bg-amber-50"
  >
    Clear History
  </button>

  {/* History List */}
  <ul className="space-y-2">
    {history.map((item, index) => (
      <li
        key={index}
        className="cursor-pointer p-2  hover:bg-zinc-600 text-sm text-amber-50 border-dotted border-2 border-stone-950"
        onClick={() => loadHistory(item)}
      >
        {item.question.slice(0, 20)}...
      </li>
    ))}
  </ul>
</div>
  

      <div className='col-span-4 m-5'>
  <div className='container h-150 overflow-scroll scrollbar-hide '>
    <>
      {Result.length === 0 ? (
        <h1 className="text-2xl text-amber-50 opacity-70">
          Hello User...! What's in your mind today?
        </h1>
      ) : (
        <div className='text-white  scrollbar-hide '>
          <ul>
            {Result.map((item, index, type) => (
              <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>{
                item.type == 'q' ?
                  <li className='text-right p-1 border-5 bg-zinc-700  border-zinc-700 rounded-tl-3xl  rounded-bl-3xl w-fit  rounded-br-3xl' key={index + Math.random()}><Answer ans={item.text} totalresult={1} index={index} type={item.type} />
                  </li> : item.text.map((ansItem, ansIndex) => (
                    <li className='text-left ' key={index + Math.random()}><Answer ans={ansItem} totalresult={item.length} index={ansIndex} type={item.type} /></li>
                  ))
              }
              </div>
            ))
            }
          </ul>
          {/* <ul>
          {Result && Result.map((item,index)=>(
      <li className='text-left ' key={index+Math.random()}><Answer ans={item} totalresult={Result.length} index={index} /></li>
      ))}
      </ul>
       */}
        </div>
      )}
    </>
  </div>
       < div className='bg-zinc-800  w-1/2 p-3.5 m-auto rounded-3xl text-white flex pr-5
       border
        border-zinc-400 '>
            <input
              type="text"
              placeholder='Ask me anything... '
              className='w-full h-full outline-none'
              value={question}
              onChange={e => setquestion(e.target.value)}
            />
            <button onClick={askquestion} className='hover:cursor-pointer hover:bg-zinc-400'>Ask</button>
          </div>
      </div>
    </div>
  )
}

export default App
