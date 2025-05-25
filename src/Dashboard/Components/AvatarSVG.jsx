import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useUser } from '../../GlobalContextApi/User';
import Def from '../../assests/Default.jpg';

export default function AvatarSVG({
  size = 120,
  stroke = 2,
  gap = 4,
  progress = 50,
  changeShow,
}) {
  const User = useUser();

  const circleRef = useRef(null);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  useEffect(() => {
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [offset]);

  const handleChange = () => {
    changeShow();
  };

  // image box size = total size minus 2*(stroke + gap)
  const imgSize = size - 3 * (stroke + gap);

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ef4407"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <img
        src={User?.User?.profileImage || Def}
        alt=""
        className="absolute left-1/2 top-1/2 rounded-full object-cover"
        onClick={handleChange}
        style={{
          width: imgSize,
          height: imgSize,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute -right-4 top-3 space-x-1 rounded-xl bg-text_primary px-1 text-sm">
        <span>{progress}</span>
        <span>%</span>
      </div>
    </div>
  );
}
