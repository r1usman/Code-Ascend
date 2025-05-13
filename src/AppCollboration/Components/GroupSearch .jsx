// src/components/GroupSearch.js
import React, { useContext, useEffect } from 'react';
import { CollabContext } from '../ContextApi/CollabContextApi';
import {useNavigate} from "react-router-dom"

const GroupSearch = () => {
    const {searchText, setSearchText} = useContext(CollabContext)
    const navigation = useNavigate();

  return (
    <div className="flex ">
      <input
        type="text"
        placeholder="Search groups..."
        className="   rounded-xl w-full placeholder:text-slate-700 py-2 px-3  bg-[#121212] border border-border_Col"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      
    </div>
  );
};

export default GroupSearch;
