import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown'
import RingLoader from "react-spinners/ClipLoader";

function App() {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyB5uMcaQEW-nRvp07HZLbZ22DzdoXUrmm0" });
  const [code, setcode] = useState("");
  const [loading, setloading] = useState(false)
  const [response, setresponse] = useState("")

  async function getReviewCode() {
    setloading(true)
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `I want you to act as a senior code reviewer. Please analyze the following code written in the language ${selectedOption.value} thoroughly and provide a comprehensive review that includes the following points:

Code Quality Rating: Rate the overall code quality on a scale of 1 to 10.

Suggestions for Improvement: Offer detailed suggestions to improve the code. Include modern best practices, performance tips, and advanced alternatives where applicable.

Step-by-Step Explanation: Explain what the code does line by line or section by section to ensure clear understanding.

Potential Bugs or Logical Errors: Identify any bugs or logic flaws, even subtle or edge-case-related ones.

Syntax and Runtime Errors: Point out any syntax or runtime issues, if present.

Fixes and Recommendations: For each issue identified, provide specific solutions or improvements to enhance the code’s correctness, readability, and maintainability.

Be detailed, constructive, and educational in your response.
Code:${code}, do not display the message as okay ill act as a senior code reviewer etc etc`
,
    });

    setresponse(response.text);
    setloading(false)
    
  }


  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#1f2937', // Tailwind's bg-zinc-800
      color: 'white',
      borderColor: '#4b5563', // Tailwind's border-zinc-600
      boxShadow: 'none',
      width: '100%',
      '&:hover': {
        borderColor: '#9333ea', // hover purple
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#1f2937',
      color: 'white',
      width: '100%',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#9333ea' : '#1f2937',
      color: 'white',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
      width: '100%',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
      width: '100%',
      // Tailwind's text-gray-400
    }),
  };
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'xml', label: 'XML' }
  ];

  const [selectedOption, setselectedOption] = useState(options[0])
  return (
    <>
      <Navbar />
      <div className="main flex   justify-between " style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87%] w-[50%]">
          <div className="tabs w-full  mt-5! px-5! mb-3! flex items-center gap-3 ">
            <Select
              value={selectedOption}
              onChange={(e) => {
                setselectedOption(e.value)
                console.log(selectedOption);
              }}
              styles={customStyles}

              options={options}

            />
            {/* <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Fix Code</button> */}
            <button  onClick={()=>{
              if (code==="") {
                alert("Please enter code first")
              }
              else{
                getReviewCode();
              }
            }}
            className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
          </div>

          <Editor height="100%" theme="vs-dark" language={selectedOption.value} value={code} onChange={(e)=>setcode(e)}/>;
        </div>
        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[100%]">
          <div className="topTab flex border-b-[1px] border-[#27272a] border-t-[1px]  items-center justify-between h-[60px]">
            <p className='font-[700] text-[17px] '>Response</p>
          </div>
            {/* <RingLoader /> */}
            {loading && <RingLoader color='#9333ea'/>}
            <ReactMarkdown children={response}  />
        </div>
      </div>
    </>
  )
}


export default App
