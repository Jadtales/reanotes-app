import {FilterNotecardsInterface} from "@/utils/interfaces/filter-notecards-interface";

export default interface HighlightsInterface extends FilterNotecardsInterface{
    bookId: string
    bookAuthor: string;
    bookTitle: string;
    isPinned: boolean;
    pageLocation?: string;
    addedDate?: string;

    highlights: {
        highlightKey: number;
        highlightIndex?: string;
        highlight: string;
    }[];
}
