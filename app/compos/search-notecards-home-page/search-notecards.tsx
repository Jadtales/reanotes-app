'use client';

import Image from 'next/image';
import React, { ReactElement, useEffect, useRef } from 'react';
import './search-notecards-styling.css';
import SearchIcon from '@/public/icons/search-2-line.svg';

interface ComponentProps {
  getSearchInputText: (searchText: any) => void;
}

export default function SearchNotecards({
  getSearchInputText,
}: ComponentProps): ReactElement<HTMLDivElement> {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleSearchInputFocus = (event: KeyboardEvent): void => {
      if (event.altKey && event.key === 's') {
        event.preventDefault();

        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleSearchInputFocus);

    return () => {
      document.removeEventListener('keydown', handleSearchInputFocus);
    };
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getSearchInputText(event.target.value);
  };

  const debouncedHandleInputChange = React.useCallback(
    debounce(handleInputChange, 500),
    []
  );

  return (
    <div className='search-notecards-container'>
      <Image src={SearchIcon} alt='search' />
      <input
        type='search'
        placeholder='Search for anythings'
        ref={inputRef}
        onChange={(e) => debouncedHandleInputChange(e)}
      />
    </div>
  );
}
