import React, {ChangeEvent, ReactElement, useEffect, useState, createContext, useContext} from "react";
import Image from "next/image";
import SearchIcon from "@/public/icons/search-2-line.svg";
import {usePathname} from "next/navigation";
import {useRouter} from 'nextjs-toploader/app';

// import '../navbarStyling.css'
import './searchInputFieldStyling.css'
import {useSearchContext} from "@/utils/providers/searchInputFieldProvider";


export default function SearchInputFieldComponent(): ReactElement<any> {

    const [isSearchInputBarOpen, setIsSearchInputBarOpen] = useState<boolean>(false);
    const {userSearchedText, setUserSearchedText} = useSearchContext()

    const pathname = usePathname()
    const router = useRouter()

    const handleUserSearching = (searchInputField: ChangeEvent<HTMLInputElement>): void => {
        setUserSearchedText(searchInputField.target.value); // Always keep this as a string
    };

    useEffect(() => {
        if (pathname === '/browse') {
            setIsSearchInputBarOpen(true);
            router.push('/browse');
        } else {
            setIsSearchInputBarOpen(false);
        }
    }, [pathname]);


    return (
        <div className={isSearchInputBarOpen ? 'searchButton-active' : 'searchButton-inactive'}
             onClick={() => router.push('/browse')}>

            <Image src={SearchIcon} alt="expandProfileSettings"/>
            <input type="search"
                   placeholder="Search for notecards, people."
                   autoFocus
                   name={'searchBar'}
                   value={userSearchedText}
                   onChange={handleUserSearching}/>
        </div>
    )

}