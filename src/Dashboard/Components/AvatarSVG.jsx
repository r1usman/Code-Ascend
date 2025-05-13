import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Def from "../../assests/Default.jpg"

export default function AvatarSVG({
  size = 120,
  stroke = 2,
  gap = 4,
  progress = 50,
  changeShow
}) {
  const circleRef    = useRef(null)
  const radius       = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset       = circumference * (1 - progress / 100)

  useEffect(() => {
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [offset])

  const handleChange=()=>{
    changeShow();
  }


  // image box size = total size minus 2*(stroke + gap)
  const imgSize = size - 3 * (stroke + gap)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="#ef4444"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>

      <img
        src={Def}
        alt=""
        className="absolute top-1/2 left-1/2 rounded-full object-cover"
        onClick={handleChange}
        style={{
          width:  imgSize,
          height: imgSize,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className='absolute space-x-1 text-sm px-1 rounded-xl top-3 -right-4 bg-red-400'>
        <span>{progress}</span>
        <span>%</span>
      </div>
    </div>
  )
}
