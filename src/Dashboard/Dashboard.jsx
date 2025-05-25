import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import DashboardLayout from './Layouts/DashboardLayout';
import { UserStats } from './Pages/UserStats';
import Profile from '../profile/Profile';

export default function Dashboard() {
  const [show, setShow] = useState(false);

  const panelRef = useRef(null);

  const toggleShow = () => setShow((prev) => !prev);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (show) {
        gsap.to(panelRef.current, {
          x: '0%',
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(panelRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power2.in',
        });
      }
    }, panelRef);

    return () => ctx.revert();
  }, [show]);

  return (
    <DashboardLayout activeMenu="Dashboard" changeShow={toggleShow}>
      <div
        className="min-h-screen w-full bg-dark-bg-secondary2 p-4"
        onClick={() => setShow(false)}
      >
        <UserStats />
      </div>

      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-50 h-full w-[30%] translate-x-full transform overflow-auto bg-white shadow-lg"
      >
        <Profile />
      </div>
    </DashboardLayout>
  );
}
