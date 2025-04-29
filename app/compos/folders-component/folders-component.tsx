'use client';
import React, {Fragment, ReactElement, useContext, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './folder-styling.css';

import AddFolderComponent from '@/app/compos/folders-component/FoldersSubComponents/add-folder-compo';
import filterIcon from '@/public/icons/filter-3-line.svg';
import GoUpIcon from '@/public/icons/notesIcons/arrow-up-line.svg';
import FilterNotecardsComponent from '@/app/compos/filter-functionality/FilterNotecardsComponent';

import FoldersStateManagerContext from '@/app/wide-state-management/FoldersState';
import FolderElement from "@/app/compos/folders-component/folder-element/folder-element";

export default function FolderComponent(): ReactElement<HTMLDivElement> {
    const [isFilterActive, setFilter] = useState<boolean>(false);
    const folders = useContext(FoldersStateManagerContext);

    // Set the current folder based on the pathname or default to the first folder
    const handleFilterButtonClick = (): void => {
        setFilter(!isFilterActive);
    };

    const handleGoingUpBack = () => {
        if (window.scrollY === 0) {
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // to save scroll position before the user leaves the page
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('scrollPosition', window.scrollY.toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // to restore scroll position when the page loads
    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            localStorage.removeItem('scrollPosition'); // Clear the saved position
        }

        // Enable scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
        }

        // Clean up (optional)
        return () => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
        };
    }, []);

    return (
        <Fragment>
            <div className="folderContainer">
                <div className="folders-section">
                    <div className="scrollableFoldersContainer">
                        <div className="folders">
                            <FolderElement folder={'all'}/>
                            {folders.map((folder: string, index: number) => (
                                <FolderElement folder={folder} key={index} />
                            ))}

                            <AddFolderComponent existedFolders={folders}/>
                        </div>
                    </div>
                    <div className="foldersFunctionalities">
                        <button aria-label='scroll-up' className="goBackUpButton" onClick={handleGoingUpBack}>
                            <Image src={GoUpIcon} alt={'goBackToTop'}/>
                        </button>
                        <div className={'filterIcon'} onClick={() => handleFilterButtonClick()}>
                            <Image src={filterIcon} alt="filter notes" width={25}/>
                        </div>
                    </div>
                </div>
                {isFilterActive && <hr style={{margin: '20px 0', backgroundColor: 'blue'}}/>}
                {isFilterActive && <FilterNotecardsComponent/>}
            </div>

        </Fragment>
    );
}