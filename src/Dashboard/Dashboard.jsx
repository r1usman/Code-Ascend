import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import DashboardLayout from './Layouts/DashboardLayout'
import { UserStats } from './Pages/UserStats'

export default function Dashboard() {
  const [show, setShow] = useState(false)
  
  const panelRef = useRef(null)

  const toggleShow = () => setShow((prev)=>!prev)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (show) {
        gsap.to(panelRef.current, {
          x: '0%',
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        gsap.to(panelRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power2.in',
        })
      }
    }, panelRef)

    return () => ctx.revert()
  }, [show])

  return (
    <DashboardLayout activeMenu="Dashboard" changeShow={toggleShow}>
      <div className="p-4 w-full min-h-screen bg-dark-bg-secondary2" onClick={()=>setShow(false)}><UserStats/></div>


      <div ref={panelRef} className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform translate-x-full z-50">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            
          </div>
      </div>

    </DashboardLayout>
  )
}
