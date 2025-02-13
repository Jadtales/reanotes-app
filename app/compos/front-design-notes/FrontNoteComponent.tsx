'use client';

import {ReactElement, useState} from "react";
import Image from "next/image";
import './front-note-styling.css';

// imported icons

import FrontNotecardSettings from "@/app/compos/front-design-notes/frontNote-settingsOption/front-notecard-settings";
import PinnedNotecardComponent
    from "@/app/compos/front-design-notes/utility-components/pinned-li-element-component/PinnedNotecardComponent";
import {BookCredentialsInterface} from "@/utils/interfaces/front-notecard-interface";

interface frontNoteComponentProps extends BookCredentialsInterface {
    isNotecardToPin: (toPin: boolean, bookId: string) => void;
    notecardDeletion: (bookId: string, toCloseModalRef: any) => void;
}

import UnknownBookCover from '@/public/icons/no-cover.png'

export default function FrontNoteComponent({
                                               bookCredentials,
                                               notecardDeletion,
                                               isNotecardToPin,
                                           }: frontNoteComponentProps): ReactElement<any> {

    const [isNotecardPinned, setIsNotecardPinned] = useState<boolean>(false);

    const {
        bookTitle,
        bookAuthor,
        bookId,
        bookCover,
        bookTags,
    } = bookCredentials;

    isNotecardToPin(isNotecardPinned, bookId);


    return (
        <div className="homeContainer">

            <div className="topLayer">

                <div className="flashcardInfo">

                    <Image src={bookCover || UnknownBookCover} alt="there there" width={100} height={151}/>


                    <div className="bookInfos">
                        <h2 id="bookTitle">{bookTitle}</h2>
                        <p id="author-name">{bookAuthor}</p>

                        <div className="bookTags">
                            <ul>
                                {Array.isArray(bookTags) ?
                                    (bookTags.map((tag, index) => <li key={index}>#{tag}</li>))
                                    :
                                    (typeof bookTags === 'string' && <li>#{bookTags}</li>)}
                                {isNotecardPinned && <PinnedNotecardComponent/>}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettingsContainer">
                    <FrontNotecardSettings bookCredentials={bookCredentials}
                                           deleteThisNotecardById={notecardDeletion}
                                           checkIsNotecardPinned={setIsNotecardPinned}/>
                </div>
            </div>
        </div>
    );
}
