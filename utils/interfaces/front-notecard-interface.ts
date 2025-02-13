import HighlightsInterface from "@/utils/interfaces/highlights-interface";
import {StaticImageData} from "next/image";

import {FilterNotecardsInterface} from "@/utils/interfaces/filter-notecards-interface";

// for Notecard component
export default interface FrontNotecardInterface extends HighlightsInterface, FilterNotecardsInterface {
    bookCover?: string;
    bookTags?: string | string[];

}

export interface BookCredentialsInterface {
    bookCredentials: {
        bookTitle: string;
        bookAuthor: string;
        bookId: string;
        bookCover?: string | StaticImageData;
        bookTags: string[] | string;

        bookHighlights?: {
            highlightKey: number,
            highlight: string
        }[];
    };
}