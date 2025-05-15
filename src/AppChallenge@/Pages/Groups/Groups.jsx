import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Breadcrumb from '../../Components/Breadcrumb';

import {mockGroups} from "./Utils/Object" 

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="py-6 px-4 space-y-7  min-h-screen font-poppins ">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Groups</h1>
          <p className="text-gray-400 mt-1">
            Join groups to collaborate and compete with other developers
          </p>
        </div>
        <button onClick={() => setIsCreating(true)} className="Btn1 flex items-center">
          <PlusIcon className="h-5 w-5 mr-1" />
          Create Group
        </button>
      </div>

      {/* Search */}
      <div className="relative ">
        <input
          type="text"
          placeholder="Search groups..."
            className="input w-full pl-10 bg-dark-bg-secondary4 outline-none focus:outline-none focus:ring-0 ring-0 border border-border_Col"
            value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </div>
      </div>

     {/* Groups List */}
{filteredGroups.length === 0 ? (
  <div className="text-center py-12">
    <div className="text-gray-500 mb-4">
      <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white">No groups found</h3>
    <p className="text-gray-400 mt-1">Try adjusting your search or create a new group</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredGroups.map((group) => (
      <div
        key={group.id}
        className="card card-hover transform hover:-translate-y-1 transition-transform"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white">{group.name}</h3>
          <p className="text-sm mt-2 line-clamp-2">{group.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex -ml-1 overflow-hidden py-1 px-2">
              {group.members.slice(0, 3).map((member, index) => (
                <img
                  key={index}
                  className="h-6 w-6 rounded-full ring-2 ring-dark-bg-secondary4"
                  src={member.avatarUrl}
                  alt={member.username}
                />
              ))}
              {group.members.length > 5 && (
                <div className="h-6 w-6 rounded-full ring-2 ring-dark-bg-secondary4 flex items-center justify-center text-xs bg-dark-bg-secondary4 -ml-1">
                  +{group.members.length - 5}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-400">
              {group.challenges.length} challenges
            </span>
          </div>
        </div>
        <div className="bg-dark-700 bg-dark-bg-secondary4 px-6 py-4 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Created {new Date(group.createdAt).toLocaleDateString()}
          </span>
          <Link to={`/appchallenge@/groups/${group.id}`} className="Btn1 py-1 px-3 text-sm">
            View Group
          </Link>
        </div>
      </div>
    ))}
  </div>
)}


     
    </div>
  );
};

export default Groups;
