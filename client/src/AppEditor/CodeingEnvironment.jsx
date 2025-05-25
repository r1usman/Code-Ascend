import React, { useState } from 'react'
import OnlineCompiler from './Components/OnlineCompiler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CodeingEnvironment = () => {
  const [problem, setproblem] = useState(null)
 return (
    <>
        <div className="min-h-screen bg-dark-bg-secondary4 rounded-[6px]   text-white p-4 md:p-8">
        <header className="max-w-6xl mx-auto mb-6 s">
          <h1 className="text-2xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-blue-500">{'</>'}</span> CodeEditor
          </h1>
          <p className="text-slate-400 mt-1">{!problem ? "Compile and run code in your browser":problem}</p>
        </header>

        <main className="max-w-6xl mx-auto">
          <OnlineCompiler />
        </main>
        
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className={"mt-20 mr-7 "}
      />

    </>
  );
  
}

export default CodeingEnvironment