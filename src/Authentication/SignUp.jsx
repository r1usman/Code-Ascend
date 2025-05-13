import React, {  useEffect, useState } from 'react';
import { Eye, EyeOff, LogIn, Upload } from 'lucide-react';
import { validateEmail } from './AuthAssest/valideEmail';
// import axios from 'axios';
import {useNavigate} from "react-router-dom"
import PhotoSelector from './Components/PhotoSelector';
import CustomDiv from './Components/RightBar.jsx/CustomDiv';
// import UploadImage from './components/UploadImage';

const SignUp = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('')
  const [adminToken, setadminToken] = useState('')

  const [error, seterror] = useState('');
  const [hide, sethide] = useState(true); 
  const [ProfilePic, setProfilePic] = useState("")
  
  
  const navigate = useNavigate();

    // const sendData = async()=>{
    //   try {
    //     const uploadImage = await UploadImage(ProfilePic);
      
      
    //     const profileImageUrl = uploadImage.Image || "";

    //     console.log("image", profileImageUrl);
        

    //     const response = await axios.post("http://localhost:3000/api/auth/register",{
    //       name,
    //       email,
    //       password,
    //       profileImageUrl,
    //       adminInviteToken:adminToken
    //     })
    //     console.log(response);
        
    //     console.log(response.data.Message);
    //     const User = response.data.User
    //     console.log(User);
    //     if(User.role=="member")
    //     {
    //       navigate("/user/dashboard")
    //     }
    //     else
    //     {
    //       navigate("/admin/dashboard")
    //     }
      
    //   } catch (error) {
    //     console.log(error);
    //     console.log(error.response.data.Message);
    //     seterror(error.response.data.Message)
        
        
    //   }
      
      
      
      
    // }

  const handelRequest = async (e) => {
    e.preventDefault();

    if(!name)
    {
      seterror("Please Enter Your Name")
      return;
    }
    if(!email)
      {
        seterror("Please Enter the email")
        return;
      }

    if(!validateEmail(email) )
    {
      seterror("Please Enter valid email")
      return;
    }
    if(!password)
      {
        seterror("Please Enter the Password")
        return;
      }
    seterror("")
    navigate("/dashboard")
    // sendData()

  };
  useEffect(()=>{
    setTimeout(() => {
        seterror("")
    }, 5000);
  },[error])

  const ToggleHide = (e) => {
    e.preventDefault(); 
    sethide((prev) => !prev);
  };

  return (
    <>
      <div className='relative h-screen overflow-hidden flex flex-row font-poppins bg-dark-bg-secondary2 text-white'>
      <div className='w-[60%] flex flex-col space-y-5  h-screen py-10 px-16'>
          <h1 className='font-semibold text-2xl'>Code Ascend</h1>
          <div className='flex flex-col justify-center  h-full'>
            <div className='flex flex-col gap-5'>
              <div className='space-y-1'>
                <h1 className='font-semibold text-2xl'>Create an Account</h1>
                <p className='text-xs font-semibold '>Join us today by entering your details below.</p>
              </div>
              <form className='flex flex-col gap-4'>
                <PhotoSelector image= {ProfilePic} setimage= {setProfilePic } />
                <div className='space-y-6'>
                  <div className='flex gap-5 w-full  px-5'>
                    <div className='flex flex-col space-y-2 w-full'>
                      <label htmlFor='' className='font-semibold'>
                        Full Name
                      </label>
                      <input
                        className=' p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                        type='text'
                        value={name}
                        placeholder='John'
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col w-full space-y-2'>
                      <label htmlFor='' className='font-semibold'>
                        Email
                      </label>
                      <input
                        className='w-full p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                        type='text'
                        value={email}
                        placeholder='john@gmail.com'
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>

                  </div>
                  <div className='flex gap-5 items-center w-full  px-5'>
                    
                      <div className='w-full space-y-2'>
                        <label className='font-semibold'>Password</label>
                        <div className='relative w-full  flex items-center'>
                          <input
                            className='w-full p-2 pr-10 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                            type={hide ? 'password' : 'text'}
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setpassword(e.target.value)}
                          />
                          <button onClick={ToggleHide} className='absolute right-2 top-1/2 -translate-y-1/2'>
                            {hide ? <EyeOff className='text-Pro5-primary' /> : <Eye className='text-Pro5-primary' />}
                          </button>
                      </div>
                    </div>
                    <div className='flex flex-col w-full space-y-2'>
                        <label htmlFor='' className='font-semibold'>
                          Admin Invite Code
                        </label>
                        <input
                          className='w-full p-2 bg-slate-100 focus:outline-none text-slate-700 border border-slate-200 rounded-sm placeholder:text-slate-700'
                          type='text'
                          value={adminToken}
                          placeholder='6 Digit Code'
                          onChange={(e) => setadminToken(e.target.value)}
                        />
                      </div>

                  </div>
                </div>
               
                <p className='text-xs text-red-600 px-5 '>{error}</p>
                <button className='hover:bg-text_primary hover:opacity-75 focus:outline-none focus:outline-slate-200 transition-all ease-in duration-150 bg-text_primary py-2 mx-4 text-white uppercase tracking-wider rounded-sm font-semibold text-sm' onClick={handelRequest}>Sign UP</button>
              </form>
              <p className='text-xs px-5'>
                Alreday have an account? <span className='underline text-task_primary' onClick={()=>navigate("/")}>Login</span>
              </p>
            </div>
          </div>
        </div>

        <div className='w-[40%] relative rotate-12 overflow-hidden translate-x-10 -translate-y-10 bg-[#E54E02] h-[120vh] flex items-center justify-center'>
         <CustomDiv/>
         </div>
        <div className='absolute size-96 scale-150 rounded-3xl bg-dark-bg-secondary1 right-32 -top-96 -translate-y-16 -rotate-12 z-30'></div>
        <div className='absolute size-96 scale-150 rounded-3xl -translate-x-48 bg-dark-bg-secondary1 right-32 -bottom-96 translate-y-8 -rotate-12 z-30'></div>

      </div>
    </>
  );
};

export default SignUp;
