import CryptoJS from 'crypto-js';

import HighlightsInterface from "@/utils/interfaces/highlights-interface";

const localstorageSecretKey: string | undefined = process.env.NEXT_PUBLIC_LOCALSTORAGE_SECRET_KEY;

export default function localStoreNotecards(notecards: HighlightsInterface[]): HighlightsInterface[] | null {
    // Ensure localStorage is available (browser environment)
    if (typeof window === 'undefined') {
        return null;
    }


    // Retrieve stored notecards from localStorage
    let storedItems = localStorage.getItem('user_notecards');
    let storedNotecards: HighlightsInterface[] = [];

    if (storedItems) {
        try {
            // Decrypt and parse the stored notecards
            // const decrypted = CryptoJS.AES.decrypt(storedItems, localstorageSecretKey).toString(CryptoJS.enc.Utf8);
            storedNotecards = JSON.parse(storedItems);
        } catch (error) {
            console.error('Failed to decrypt or parse stored notecards:', error);
            storedNotecards = []; // Fallback to an empty array
        }
    }

    // Update stored notecards with new notecards
    notecards.forEach((notecard) => {
        // Ensure the notecard has a valid highlights property
        if (!notecard.highlights || !Array.isArray(notecard.highlights)) {
            console.warn('Invalid highlights property in notecard:', notecard);
            return; // Skip this notecard
        }

        const existingNotecard = storedNotecards.find(
            (storedNotecard) => storedNotecard.bookId === notecard.bookId
        );

        if (existingNotecard) {
            // Ensure the existing notecard has a valid highlights property
            if (!existingNotecard.highlights || !Array.isArray(existingNotecard.highlights)) {
                console.warn('Invalid highlights property in existing notecard:', existingNotecard);
                existingNotecard.highlights = []; // Reset to an empty array
            }

            // Check if highlights have changed
            const highlightsChanged = notecard.highlights.some(
                (highlight) =>
                    !existingNotecard.highlights.some(
                        (storedHighlight) => storedHighlight.highlight === highlight.highlight
                    )
            );

            if (highlightsChanged) {
                // Update highlights if they have changed
                existingNotecard.highlights = notecard.highlights;
            }
        } else {
            // Add new notecard if it doesn't exist
            storedNotecards.push(notecard);
        }
    });

    // Encrypt and save the updated notecards to localStorage
    try {
        // const encryptedNotecards = CryptoJS.AES.encrypt(
        //     JSON.stringify(storedNotecards),
        //     localstorageSecretKey
        // ).toString();
        localStorage.setItem('user_notecards', JSON.stringify(storedNotecards));
    } catch (error) {
        console.error('Failed to encrypt or save notecards:', error);
        return null;
    }

    return storedNotecards;
}


export function getStoredNotecards(
    bookId?: string,
    bookTitle?: string
): HighlightsInterface[] | undefined {

    let storedItems = localStorage.getItem("user_notecards");


    if (storedItems && bookId && bookTitle) {
        let parsedNotecards: HighlightsInterface[] = JSON.parse(storedItems);

        let foundNotecard = parsedNotecards.find(notecard => {
            return notecard.bookId === bookId && notecard.bookTitle === bookTitle
        });

        return [foundNotecard!]
    }

    if (storedItems) {
        // const decryptedData = CryptoJS.AES.decrypt(storedItems, localstorageSecretKey).toString(CryptoJS.enc.Utf8);

        return JSON.parse(storedItems);
    }

    return undefined;
}

