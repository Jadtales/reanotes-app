'use client';

import {useState, useEffect, useContext} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import './browsingStyling.css';

import HomeIcon from '@/public/icons/homeIcon.svg';
import StatsIcon from '@/public/icons/statsIcon.svg';

import Image from 'next/image';
import {useMediaQuery} from "react-responsive";
import FoldersStateManagerContext from '@/app/wide-state-management/FoldersState';

export default function BrowsingComponent(): React.ReactElement<any> | null {

    const existedFolders = useContext(FoldersStateManagerContext);

    const pathname = usePathname();

    // Dynamically adjust the pages to show based on the width
    const pageWidth = useMediaQuery({query: 'width >= 1420px'})
    const browsingPages: string[] = pageWidth ? ["home", "browse", "stats"] : ["home", "stats"];

    if(pageWidth === null) return null

    return (
        (<div className="browsingContainer">
            {browsingPages.map((navi: string, index: number) => {
                const isActive = pathname.split('/').filter(Boolean)[0] === navi;

                return (
                    (<Link
                        href={navi === 'home' ? `/home/${existedFolders[0]}` : `/${navi}`}
                        className={isActive ? 'active' : ''}
                        key={index}
                    >
                        {pageWidth >= 1420 ? (
                            // Full text label when the width is greater than 1420px
                            (navi.charAt(0).toUpperCase() + navi.slice(1))
                        ) : (
                            // Icons when the width is less than or equal to 1420px
                            (<Image
                                style={{ marginTop: '5px' }}
                                width={22}
                                src={navi === 'home' ? HomeIcon : StatsIcon}
                                alt={`goTo${navi.charAt(0).toUpperCase() + navi.slice(1)}Page`}
                            />)
                        )}
                    </Link>)
                );
            })}
        </div>)
    );
}