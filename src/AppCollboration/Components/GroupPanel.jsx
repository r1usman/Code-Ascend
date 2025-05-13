import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import image1 from "../../assests/Frontend.png";

const GroupPanel = ({ value, sendGroup , setGroupProfile}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const panelRef = useRef(null);
  console.log(data);

  const HandleClose = ()=>{
    setGroupProfile(false)
  }
  

  // Toggle show state
  const toggleShow = () => setShow((prev) => !prev);

  // Handle show state and data update
  useEffect(() => {
    setData(sendGroup);
    setShow(value);
  }, [value, sendGroup]);

  useEffect(() => {
    if (show) {
      const current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = current;
      };
    }
  }, [show]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(panelRef.current, {
        x: show ? '0%' : '100%',
        duration: 0.4,
        ease: show ? 'power2.out' : 'power2.in',
      });
    }, panelRef);

    return () => ctx.revert();
  }, [show]);

  return (
    <div className=" bg-dark-bg-primary ">
      <div
        ref={panelRef}
        className="panel-content bg-dark-bg-primary fixed top-0 right-0 h-full w-[40%] shadow-lg transform translate-x-full z-50"
      >
        <div className='z-50 absolute top-0 w-full '>
           <div className='flex items-center justify-end w-full px-6 py-3'>
                
                <div className=''>
                    <X  className='cursor-pointer hover:text-text_primary transition-all ease-in duration-100'  onClick={HandleClose}/>
                </div>
               
           </div>
           <div className='px-7 '>
                <div className='capitalize text-xl'>
                    {data.id}
                </div>
                <div>Members: 2</div>
           </div>
      
    
        </div>

      
        <div className="">
         
          <svg
            id="wave"
            style={{ transform: 'rotate(0deg)', transition: '0.3s' }}
            viewBox="0 0 1440 490"
            xmlns="http://www.w3.org/2000/svg"
            className="wave-svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="#171719" offset="0%" />
                <stop stopColor="#171719" offset="100%" />
              </linearGradient>
            </defs>
            <path
              style={{ transform: 'translate(0, 0px)', opacity: 1 }}
              fill="url(#sw-gradient-0)"
              d="M0,343L80,334.8C160,327,320,310,480,269.5C640,229,800,163,960,130.7C1120,98,1280,98,1440,138.8C1600,180,1760,261,1920,302.2C2080,343,2240,343,2400,334.8C2560,327,2720,310,2880,253.2C3040,196,3200,98,3360,81.7C3520,65,3680,131,3840,155.2C4000,180,4160,163,4320,179.7C4480,196,4640,245,4800,253.2C4960,261,5120,229,5280,228.7C5440,229,5600,261,5760,285.8C5920,310,6080,327,6240,334.8C6400,343,6560,343,6720,285.8C6880,229,7040,114,7200,122.5C7360,131,7520,261,7680,294C7840,327,8000,261,8160,196C8320,131,8480,65,8640,65.3C8800,65,8960,131,9120,187.8C9280,245,9440,294,9600,318.5C9760,343,9920,343,10080,359.3C10240,376,10400,408,10560,400.2C10720,392,10880,343,11040,277.7C11200,212,11360,131,11440,89.8L11520,49L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"
            />
          </svg>

     
          <div className="relative w-full h-[500px] bg-[#171719] px-6 py-3 space-y-4">
           
            <h1 className='text-2xl font-medium'>{data.name}</h1>
            <div>
                <p>{data.category}</p>
                <p>{data.createdAt}</p>
            </div>
            <div>{data.description}</div>
            <div className='absolute -top-32 right-6 size-44 rounded-full  flex justify-center items-center shadow-lg shadow-yellow-500 '>
                <img src={image1} className='rounded-full object-cover' alt="" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GroupPanel;
