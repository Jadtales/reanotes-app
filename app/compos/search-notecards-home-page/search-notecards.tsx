'use client'

import React, { ReactElement, useEffect, useRef,  } from 'react';
import Image from 'next/image';
import './search-notecards-styling.css'

import SearchIcon from '@/public/icons/search-2-line.svg';

export default function SearchNotecards(): ReactElement<HTMLDivElement> {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleSearchInputFocus = (event: KeyboardEvent): void => {
            if(event.altKey && event.key === 's'){
                event.preventDefault();

                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleSearchInputFocus);

        return () => {
            document.removeEventListener('keydown', handleSearchInputFocus);
        }
    }, []);

    return (
        <div className='search-notecards-container'>
            <Image src={SearchIcon} alt='search' />
            <input type="search" placeholder='Search for anythings' ref={inputRef} />
        </div>
    )
}