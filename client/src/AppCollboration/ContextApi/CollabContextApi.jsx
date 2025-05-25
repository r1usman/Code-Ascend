import { use } from "react";
import { createContext, useState } from "react";

// Use PascalCase for context name
export const CollabContext = createContext();

export const CollabProvider = ({ children }) => {
    const user = {
        _id: "67e8e6ad324c37d4ca5ecdf8",
        name: "ali",
        email: "alishah1234584.asww",
        profileImage: "http://localhost:3000/uploads/1745762321293-marker-icon-2x-red.png",
        role: "member",
        groups: [
            {
            groupId: "group_001",
            groupName: "Frontend Developers",
            role: "admin"
            },
            {
            groupId: "group_002",
            groupName: "AI Researchers",
            role: "member"
            }
        ]
        };

    const [searchText, setSearchText] = useState('');

    return (
        <CollabContext.Provider value={{ searchText, setSearchText , user}}>
            {children}
        </CollabContext.Provider>
    );
};
