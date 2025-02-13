import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
// import '@/app/highlightsreview/[bookReview]/bookReviewPageStyling.css'

import GoBackToComponent from "@/app/compos/go-back-to-component/GoBackTo-Component";

import GoUpIcon from '@/public/icons/notesIcons/arrow-up-line.svg'

export default function ScrollingFuncs(): ReactElement {

    const [pageHeight, setPageHeight] = useState<number>(0);

    useEffect(() => {
        const handleResize = (): void => {
            setPageHeight(window.scrollY);
        }

        document.addEventListener("scroll", handleResize);
        return () => {
            document.removeEventListener('scroll', handleResize);
        }
    }, []);


    return <div className={'scrollingFuncsContainer'} style={{
        display: pageHeight >= 100 ? 'block' : 'none',
    }}>
        <button style={{
            border: 'var(--border_gray_dark)',
            outline: 'none',
            backgroundColor: 'black',
            borderRadius: '4px',
            marginBottom: '3px',
            width: '34px',
            height: '34px',
            cursor: 'pointer'
        }} onClick={() => scrollTo({top: 0, behavior: 'smooth'})}>
            <Image src={GoUpIcon} alt={'scrollUp'} style={{
                filter: 'var(--ImgColor_completeWhite)',
            }}/>
        </button>

        <GoBackToComponent withText={false} iconSize={'34px'}/>
    </div>
}