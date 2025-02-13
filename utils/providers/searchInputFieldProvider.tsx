'use client'

import {createContext, ReactNode, useContext, useState} from "react";

interface ContextProps {
    userSearchedText: string;
    setUserSearchedText: (userSearchInput: string) => void;
}

const searchContext = createContext<ContextProps | undefined>(undefined)

export default function SearchInputFieldProvider({children}: { children: ReactNode }) {
    const [userSearchedText, setUserSearchedText] = useState<string>('');

    return (
        <searchContext.Provider value={{userSearchedText, setUserSearchedText}}>
            {children}
        </searchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(searchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};