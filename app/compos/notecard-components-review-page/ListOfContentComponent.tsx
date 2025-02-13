import {useEffect, useRef, useState} from 'react';
import ShrinkWindowIcon from '@/public/icons/collapse-diagonal-2-line.svg'
import Image from "next/image";
import {useMediaQuery} from "react-responsive";

export default function ListOfContentComponent({contentList}: { contentList: string[] }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);


    const TC_phoneSize = useRef<HTMLDivElement>(null);

    const windowsWidth = useMediaQuery({query: '(width >= 800px)'})

    useEffect(() => {
        const handleTCPosition = (): void => {
            if (windowsWidth) {
                return;
            }

            if (window.scrollY >= 80 && TC_phoneSize.current) {
                TC_phoneSize.current.style.position = 'fixed'
                TC_phoneSize.current.style.top = '15px'
                TC_phoneSize.current.style.transition = '.5s ease'
            } else {
                TC_phoneSize.current!.style.top = '60px'
            }
        }

        document.addEventListener('scroll', handleTCPosition);

        return () => {
            document.removeEventListener('scroll', handleTCPosition);
        }
    }, [innerWidth])


    const toggleTableOfContent = () => {
        if (!windowsWidth) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={windowsWidth ? 'listOfContentContainer-largeSize' : 'listOfContentContainer-smallSize'}>
            {!windowsWidth ? (
                <>
                    <div className="tableOfContent-phoneSize" ref={TC_phoneSize}>
                        {isOpen ?
                            <Image src={ShrinkWindowIcon} alt={'collapseTheWindow'} onClick={toggleTableOfContent}/> :
                            <h1
                                className='viewListOfContentIcon-phoneSize'
                                onClick={toggleTableOfContent}
                            >
                                T
                            </h1>}
                        {isOpen && (
                            <div className={`tableOfContent`}>
                                <h1>Table of Content</h1>
                                <div className="contentList">
                                    {contentList.map((contentIndex, index) => (
                                        <span key={index}>{contentIndex}.</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={`tableOfContent-largeSize`}>
                        <h1>Table of Content</h1>
                        <div className="contentList">
                            {contentList.map((contentIndex, index) => (
                                <span key={index}>{contentIndex}.</span>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}
