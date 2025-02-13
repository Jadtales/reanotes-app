'use client'
import {ReactElement, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import './bookReviewPageStyling.css'

import Link from "next/link";
import {useMediaQuery} from "react-responsive";

import ScrollingFuncs from "@/app/compos/notecard-components-review-page/ScrollingFuncs";
import ListOfContentComponent from "@/app/compos/notecard-components-review-page/ListOfContentComponent";
import AdvancedSettingsModal from "@/app/compos/modals/advanced-settings-modal/AdvancedSettingsModal";
import GoBackToHomePageIcon from '@/public/icons/goBackIcon.svg'

import NoteCardReview from "@/app/compos/notecard-components-review-page/notecard-review-component";
import localStoreNotecards, {
    getStoredNotecards
} from "@/utils/localstorage-utility/localstore-notecards/localstore-notecards";
import HighlightsInterface from "@/utils/interfaces/highlights-interface";


export default function BookReviewer({notecard}: { notecard: HighlightsInterface }): ReactElement<HTMLDivElement> {
    const [notecardHighlights, setNotecardHighlights] = useState<HighlightsInterface>();

    const router = useRouter();
    const urlParams = useSearchParams();
    const windowWidth = useMediaQuery({query: '(width > 800px)'});

    const noteCardTitle: string | null = urlParams.has('booktitle') ? urlParams.get('booktitle') : null;
    const notecardId: string | null = urlParams.has('bookid') ? urlParams.get('bookid') : null;

    // Fetch user highlights from local storage
    useEffect(() => {
        if (!notecardId || !noteCardTitle) return; // Ensure required params are present

        // Fetch from local storage
        const retrievedLocalStoredNotecard = getStoredNotecards(notecardId, noteCardTitle);

        if (retrievedLocalStoredNotecard) {
            setNotecardHighlights(...retrievedLocalStoredNotecard);

        } else {
            setNotecardHighlights(notecard);
        }
    }, [notecardId, noteCardTitle, notecard]);


    // todo: post Notecard's highlight revision date

    return (
        <div className="reviewingSectionContainer">
            {/*{notecardHighlights.highlights &&*/}
            {/*    // notecardHighlights?.highlights*/}
            {/*    //     .some(highlight => highlight.highlightIndex) &&*/}
            {/*    (<ListOfContentComponent*/}
            {/*            contentList={[*/}
            {/*                'lorem',*/}
            {/*                'maybe thats why',*/}
            {/*                'consectetur adipisicing elit',*/}
            {/*                'fuga illo illum iste',*/}
            {/*            ]}*/}
            {/*        />*/}
            {/*    )}*/}

            {windowWidth && (
                <div className={'test'}>
                    <Link
                        href={`/highlightsreview/${noteCardTitle}/learn`}
                        className={'switchToMemoMode'}
                        style={{color: 'var(--textCollor_darkMode_lightMode)', textDecoration: 'none'}}
                    >
                        Switch to memorization mode
                    </Link>

                    <AdvancedSettingsModal/>
                </div>
            )}

            <div className="noteCardsHighlightsContainer">
                <ScrollingFuncs/>

                <div className="topLayer">
                    <Image
                        src={GoBackToHomePageIcon}
                        alt="goBackToHomePage"
                        width={30}
                        id="goBackToHomePageIcon"
                        onClick={() => router.back()}
                    />

                    <h1 id="noteCardTitle">{noteCardTitle}</h1>
                </div>

                {notecardHighlights?.highlights.map((highlight) => (
                    <NoteCardReview key={highlight.highlightKey}
                                    noteCardContent={highlight.highlight}/>
                ))}
            </div>
        </div>
    );
}