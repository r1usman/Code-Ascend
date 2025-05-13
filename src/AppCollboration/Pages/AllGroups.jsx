import React, { useState, useMemo, useEffect, useContext } from 'react';
import image1 from "../../assests/Frontend.png";
import AvatarGroup from '../Components/AvatarGroup';
import { CollabContext } from '../ContextApi/CollabContextApi';

import Av1 from "../../assests/Av1.jpg"
import Av2 from "../../assests/Av2.jpg"
import Av3 from "../../assests/Av3.jpg"
import { Plus } from 'lucide-react';


// Configuration fallback for initial groups
const initialGroups = [
  {
    id: "group_001",
    name: "Frontend Developers",
    description: "A group for HTML, CSS, and React developers.",
    category: "Development",
    membersCount: 35,
    createdAt: "2024-08-10",
    isJoined: false,
    dp: image1
  },
  {
    id: "group_002",
    name: "AI Researchers",
    description: "Discuss machine learning, AI ethics, and more.",
    category: "AI",
    membersCount: 20,
    createdAt: "2024-09-01",
    isJoined: true,
  },
];

export const allGroupsScreen = {
  title: "All Groups",
  description: "Browse and explore all available groups in the system.",
  filters: [
    { name: "Category", type: "dropdown", options: ["All", "Development", "Design", "Marketing", "AI", "Other"] },
    { name: "Sort By", type: "dropdown", options: ["Most Active", "Newest", "Alphabetical"] },
  ],
};

const avatarData = {
  avatars: [
    Av1,
   Av2,
   Av3,
   Av3,
   Av3,

   

  ],
  maxVisible: 3
};


const AllGroups = () => {
  const { title, description, filters } = allGroupsScreen;

  const {searchText} = useContext(CollabContext)
  console.log("sea",searchText);
  

  const [groups, setGroups] = useState(() => {
    try {
      const stored = localStorage.getItem('allGroups');
      return stored ? JSON.parse(stored) : initialGroups;
    } catch {
      return initialGroups;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Active');

  useEffect(() => {
    localStorage.setItem('allGroups', JSON.stringify(groups));
  }, [groups]);

  const filteredGroups = useMemo(() => {
    let list = [...groups];
     if (searchText.trim()) {
      list = list.filter(g =>
        g.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      list = list.filter(g => g.category === selectedCategory);
    }

    switch (sortBy) {
      case 'Most Active':
        list.sort((a, b) => b.membersCount - a.membersCount);
        break;
      case 'Newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Alphabetical':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [groups, selectedCategory, sortBy ,searchText]);

  const handleJoin = groupId => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, isJoined: true, membersCount: g.membersCount + 1 }
        : g
    ));
  };

  const handleView = groupId => {
    console.log(`Navigate to group detail: ${groupId}`);
  };

  const handleCreate = () => {
    const name = prompt('Enter new group name:');
    if (!name) return;

    const newGroup = {
      id: `group_${Date.now()}`,
      name,
      description: '',
      category: 'Other',
      membersCount: 1,
      createdAt: new Date().toISOString(),
      isJoined: true,
    };
    setGroups(prev => [newGroup, ...prev]);
  };

  return (
    <div className="p-6 font-poppins min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className='flex flex-col gap-3'>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
         <button onClick={handleCreate} className='flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
                <Plus className="w-4 h-4" />
                Create Group
              </button>
       
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
  {filters.map(filter => (
    <div key={filter.name} className="flex flex-col space-y-2 text-white outline-none">
      <label className="text-sm font-medium">{filter.name}</label>
      <select
        className="mt-1 p-2 bg-[#121212] px-2 border border-border_Col rounded-md mb-4"  // Added 'mb-4' for gap
        value={filter.name === 'Category' ? selectedCategory : sortBy}
        onChange={e =>
          filter.name === 'Category'
            ? setSelectedCategory(e.target.value)
            : setSortBy(e.target.value)
        }
      >
        {filter.options.map(opt => (
          <option className='' key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  ))}
</div>


      {filteredGroups.length === 0 ? (
        <p className="text-gray-500">No groups found.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {filteredGroups.map(group => (
            <div key={group.id} className="Card_Relative group relative border  rounded-lg p-4  flex flex-col justify-between hover:shadow-lg transition">
              <div className='  flex w-full'>
                <div className=' flex items-center gap-5 w-full'>
                  <div className='rounded-full'>
                    <img className='rounded-full size-32'  src={image1} alt="" />
                  </div>
                  <div className='space-y-1'>
                    <div>
                      <h2 className="text-xl font-semibold">{group.name}</h2>
                      <p className="text-slate-200 mt-1">{group.description}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Members: {group.membersCount}</p>
                    <p className="text-sm text-gray-400">Created: {new Date(group.createdAt).toLocaleDateString()}</p>
                    <AvatarGroup avatars={avatarData.avatars} maxVisible={avatarData.maxVisible} members={group.membersCount} />
                  </div>
                </div>
                <div className="w-[20%] gap-2  flex flex-col items-center justify-center">
                  <button
                    onClick={() => handleView(group.id)}
                    className="z-30 w-32 h-12 border border-orange-500 text-orange-500 rounded hover:bg-orange-50"

                  >View</button>
                  <button
                    onClick={() => handleJoin(group.id)}
                    disabled={group.isJoined}
                    className={`w-32 h-12 rounded ${group.isJoined ? 'bg-[#121212] border border-border_Col text-gray-600 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                  >
                    {group.isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>


              </div>
              <div className="Card_Absolute  group-hover:blur-3xl group-hover:opacity-100"/>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
