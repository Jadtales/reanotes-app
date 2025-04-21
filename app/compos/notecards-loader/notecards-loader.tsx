import React, {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import ArrowDown from "@/public/icons/arrowDownIcon.svg";
import './notecards-loader.css'

interface Props {
    isToLoad: (toLoad: boolean) => void;
}

export default function NotecardsLoader({isToLoad}: Props): ReactElement<HTMLDivElement> {

    const [isClicked, setIsClicked] = useState(false);

    const handleArrowDownLoading = (): void => {
        const newState = !isClicked;
        setIsClicked(newState);
        isToLoad(newState);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClicked(false);
            isToLoad(false);
        }, 6000)

        return () => clearTimeout(timer);
    }, [isClicked]);

    return (
        <div className={'notecards-loader-container'} onClick={handleArrowDownLoading}>
            <Image src={ArrowDown}
                   alt={'Load more Notecards'}
                   className={isClicked ? 'arrow-down-icon-clicked' : 'arrow-down-icon'}
            />
        </div>
    )
}