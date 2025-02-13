import Image from 'next/image'
import {ReactElement} from "react";
import './front-design-note-browse-style.css'

import BookCover from '@/public/bookCovers/there there cover.jpg'

interface suggestedNote_interface {
    bookTitle: string;
    bookAuthor: string;
    notedByUsername: string
}

export default function FrontDesignNoteBrowse({
                                                  bookTitle,
                                                  bookAuthor,
                                                  notedByUsername
                                              }: suggestedNote_interface): ReactElement<any> {
    return (
        <div className="suggestedNote">
            <Image src={BookCover} alt="BookCover" width={80}/>

            <div className="noteInfos">
                <h1>{bookTitle}</h1>
                <p id="bookAuthorName">{bookAuthor}</p>
                <hr style={{margin: '5px 0'}}/>
                <p id="notedByWho">Noted by - {notedByUsername}</p>
            </div>
        </div>
    )
}