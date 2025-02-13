import {ReactElement, useState} from "react";
import Image from "next/image";
import './selectedNoteCards-highlightsModal-Styling.css'

interface ComponentProps {
    bookTitle: string;
    bookAuthor: string;
    highlightsQuantity: number;
    isNotecardSelected: boolean;
    doesNotecardExist: boolean;
    onSelect: () => void;
}

import BookIcon from '@/public/icons/book-line.svg'

export default function SelectedNotecardComponent({
                                                      bookTitle,
                                                      bookAuthor,
                                                      highlightsQuantity,
                                                      onSelect,
                                                      isNotecardSelected,
                                                      doesNotecardExist
                                                  }: ComponentProps): ReactElement<HTMLDivElement> {

    return <div className={isNotecardSelected ? 'kindleNoteCardContainer-active' : 'kindleNoteCardContainer'}
                onClick={onSelect}>

        <Image src={BookIcon} alt={'book'} style={{filter: 'var(--imgColor_dark_gray)'}}/>

        <div className={'authorNameAndBook'}>
            <h3 className={'bookTitle'}>{bookTitle}</h3>
            <span className={'bookAuthor'}>by - {bookAuthor}</span>
        </div>

        <div className="otherInfos">
            {doesNotecardExist && <span className="highlightsQuantity">Already imported</span>}

            <span className="highlightsQuantity">
                Number of highlights ({highlightsQuantity})
            </span>
        </div>
    </div>
}