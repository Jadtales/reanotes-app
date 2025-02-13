'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import './navbar-phone_screen-size-styling.css';


import HomeIcon from '@/public/icons/homeIcon.svg'
import StatsIcon from '@/public/icons/statsIcon.svg'
import SearchInputFieldComponent from "@/app/compos/navbar/navbar_microComponents/SearchInputFieldComponent";
import {useRouter} from "nextjs-toploader/app";
import {usePathname} from "next/navigation";

export default function NavbarPhoneScreenSize() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [isUserStoppedScrolling, setIsUserStoppedScrolling] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const router = useRouter();
    const currentPage = usePathname();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleWidthResizing = (): void => {
            setWindowWidth(window.scrollX)
        }

        document.addEventListener('scroll', handleWidthResizing);

        return (): void => {
            document.removeEventListener('scroll', handleWidthResizing);
        }

    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < lastScrollY) {
                setIsUserStoppedScrolling(true);
            } else {
                setIsUserStoppedScrolling(false);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    if (windowWidth > 700) return;

    return (
        isUserStoppedScrolling && <nav className={'navbarForPhoneSize'}>
            <button onClick={() => router.push('/home/all')}
                    className={currentPage.startsWith('/home') ? 'current-page' : ''}>
                <Image src={HomeIcon} alt={'homePage'}/>
            </button>
            <SearchInputFieldComponent/>
            <button onClick={() => router.push('/stats')}
                    className={currentPage.startsWith('/stats') ? 'current-page' : ''}><Image src={StatsIcon}
                                                                                              alt={'statsPage'}/>
            </button>
            <button
                style={{color: currentPage.startsWith('/createnotes') ? 'var(--secondPrimaryTextColor)' : 'var(--textColor_in_dark_mode)'}}
                className={'addNoteButton-navbarPhoneScreenSize'}
                onClick={() => router.push('/createnotes/new-notecard')}>+
            </button>
        </nav>
    )

}