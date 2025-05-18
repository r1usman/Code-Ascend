import { Bell, Eye, EyeOff, Lightbulb } from 'lucide-react'
import React, { useState } from 'react'

const PasswordStrength = ({password , setpassword , ToggleHide ,hide ,setPassStatus}) => {

    const [Message, setMessage] = useState("")
    const [Progress, setProgress] = useState("")
    const [hiddenMsg, sethiddenMsg] = useState(false)


    const handleChanges = (e) => {
    const pass = e.target.value;
    setpassword(pass);

    const stats = {
      length: pass.length >= 8,
      hasUpperCase: /[A-Z]/.test(pass),
      hasLowerCase: /[a-z]/.test(pass),
      hasDigit: /[0-9]/.test(pass),
      hasSpecialChar: /[^A-Za-z0-9]/.test(pass),
    };

    const score = Object.values(stats).filter((item)=>item).length;
    console.log(score);
    

    let strength = score === 5 ? "strong" : score >= 3 ? "Medium" : "weak";
    setMessage(strength);
    setProgress(`${(score / 5) * 100}%`);
    setPassStatus(strength);

    console.log(stats);
  };

  const getActiveColor = () => {
    if (Message === "strong") return "#3fbb60"; // Green
    if (Message === "Medium") return "#fe804d"; // Orange
    return "#ff0000"; // Red
  };

  const HandleMessage=()=>{
    sethiddenMsg(true)
    
  }
  const HandleMessageLeave=()=>{
    sethiddenMsg(false)
    
  }
  return (
     <div className='w-full space-y-2  min-h-[104px]' >
        <div className='relative flex items-center justify-between'>
            <label className='font-semibold' >Password</label>
            <span><Lightbulb onMouseEnter={HandleMessage} onMouseLeave={HandleMessageLeave}/></span>
            {
                hiddenMsg && (
                    <p className='absolute'> 
                        <div className='bg-white'>
                            8 digit
                        </div>
                    </p>
                )
            }
        </div>
        <div className='relative w-full  flex items-center'>
            <div className='relative w-full  flex items-center'>
                <input
                className='w-full p-2 pr-10 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                type={hide ? 'password' : 'text'}
                value={password}
                placeholder='Password'
                onChange={handleChanges}
                />
                <div
                    className="absolute -bottom-1 left-0 h-1 transition-all duration-300 rounded-b"
                    style={{
                    width: Progress,
                    backgroundColor: getActiveColor(),
                    }}
                ></div>
            </div>
            <button onClick={ToggleHide} className='absolute text-text_primary right-2 top-1/2 -translate-y-1/2'>
            {hide ? <EyeOff className='text-Pro5-primary' /> : <Eye className='text-Pro5-primary' />}
            </button>
        </div>
        {Message && <p className="text-sm font-medium">Your Password is  <span style={{ color: getActiveColor() }}>{Message}</span></p>}

    </div>
  )
}

export default PasswordStrength