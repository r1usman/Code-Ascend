import React, { useState, useEffect, useContext } from 'react';
import { initialGroups } from "../Assests/index";
import { CollabContext } from '../ContextApi/CollabContextApi';
import GroupPanel from '../Components/GroupPanel';

const MyGroups = () => {
  const [myGroups, setMyGroups] = useState(initialGroups);
  const [GroupProfile, setGroupProfile] = useState(false)
  const { user } = useContext(CollabContext);

  const [sendGroup, setsendGroup] = useState(null)
  

  const handleLeave = (id) => {
  console.log(id);


  const updatedGroups = myGroups.filter((item) => item.id !== id);
  
  console.log(updatedGroups);
  
  setMyGroups(updatedGroups);
  setGroupProfile(false);

};

  const handleView = (group) => {
    console.log(group);
    
    setsendGroup(group)
    
    setGroupProfile((prev)=>!prev)

  };

  return (
    <div className="font-poppins bg-dark-bg-secondary1 p-6 min-h-screen text-white ">
      <h1 className="text-2xl font-bold mb-4 ">My Groups</h1>
      {myGroups.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven’t joined any groups yet.</p>
      ) : (
        <div className="flex gap-4">
          {myGroups.map(group => (
            <div
              key={group.id}
              className="bg-dark-bg-secondary1 hover:bg-[#121212] text-white border rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div className=' '>
                <h2 className="text-xl font-semibold">{group.name}</h2>
                <p className="text-gray-600 mt-1">{group.description}</p>
                <p className="text-sm text-gray-500 mt-2">Members: {group.membersCount}</p>
                <p className="text-sm text-gray-400">
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </p>

                <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-[#121212] border border-border_Col text-red-500 font-medium">
                  {user?.groups?.find(g => g.groupId === group.id)?.role || "Member"}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={()=>handleView(group)}
                  className="flex-1 py-2 px-3 border border-text_primary text-text_primary rounded "
                >
                  View
                </button>
                <button
                  onClick={() => handleLeave(group.id)}
                  className="flex-1 py-2 px-3 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Leave
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {
        GroupProfile && sendGroup&& (
           <GroupPanel value={true} sendGroup={sendGroup} setGroupProfile={setGroupProfile}/>
        )
      }
        
    </div>
    

  );
};

export default MyGroups;
