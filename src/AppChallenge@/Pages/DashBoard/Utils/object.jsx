// src/AppChallenge@/Pages/DashBoard/Utils/index.jsx
import { ArrowRightIcon, FireIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline';

export const statsData = [
    {
        icon: <FireIcon className="h-6 w-6 text-[#3a7ff0]" />,
        label: "Challenges Completed",
        bgColor:"bg-[#25334A]"
    },
    {
        icon: <TrophyIcon className="h-6 w-6 text-[#8b5cf6]" />,
        label: "Global Rank",
        bgColor:"bg-[#352b4a]"
    },
    {
        icon: <TrophyIcon className="h-6 w-6 text-[#11a675]" />,
        label: "1v1 Victories",
        bgColor:"bg-[#1c3e33]"
    },
    {
        icon: <UserGroupIcon className="h-6 w-6 text-[#22bd5b]" />,
        label: "Active Groups",
        bgColor:"bg-[#20402c]"
    },
];

export const activityTypeStyles = {
    challenge_completed: {
        icon: (
            <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    victory: {
        icon: (
            <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        ),
    },
    joined_group: {
        icon: (
            <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
    },
};
