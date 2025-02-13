'use client';

import React, {ReactElement, useState, useEffect, useTransition} from 'react';
import {usePathname} from "next/navigation";
import {useRouter} from 'nextjs-toploader/app';
import './notesGrid.css';

import HomePageWidgets from '@/app/compos/welcoming-page-components/home-page-widgets';
import FolderComponent from '@/app/compos/folders-component/folders-component';
import FrontNoteComponent from '@/app/compos/front-design-notes/FrontNoteComponent';
import AddNoteComponentButton from "@/app/compos/add-note-button-Compo/AddNoteButtonComponent";

import FrontNotecardInterface from '@/utils/interfaces/front-notecard-interface';

import localStoreNotecards, {
    getStoredNotecards
} from "@/utils/localstorage-utility/localstore-notecards/localstore-notecards";
import DataLoader from "@/app/compos/data-ui-loader/data-loader";
import {useMediaQuery} from "react-responsive";



export default function NoteCardsContainerHomePage(): ReactElement {

    const [noteCards, setNoteCards] = useState<FrontNotecardInterface[]>([]);
    const [isLoading, startTransition] = useTransition();

    const pageWidth = useMediaQuery({query: '(width <= 700px)'});

    const pathname = usePathname();
    const router = useRouter();

    const handlePinnedNotecards = (isNotecardPinned: boolean, bookId: string): void => {

        if (!isNotecardPinned && bookId) {
            let getNotecardByBookId = noteCards.find(notecard => notecard.bookId === bookId);

            if (Array.isArray(getNotecardByBookId?.bookTags) &&
                getNotecardByBookId.bookTags.some(tag => tag === 'Pinned')) {

                // getNotecardByBookId.bookTags.pop(); // TODO: Here where I'll check notecard is already pinned, if it is, unpin it and update it in the database
            }
        }

        // TODO: pin notecard and update it in the db
        if (isNotecardPinned && bookId) {
            let getNotecardByBookId = noteCards.find(notecard => notecard.bookId === bookId)!;

            if (typeof getNotecardByBookId?.bookTags === 'string') {
                getNotecardByBookId.bookTags = [getNotecardByBookId.bookTags, 'Pinned'];
                setNoteCards(prev => {
                    prev.find(notecard => {
                        if (notecard.bookId === getNotecardByBookId.bookId) {
                            notecard = getNotecardByBookId;
                        }
                    })
                    return prev;
                });
            }

            if (Array.isArray(getNotecardByBookId.bookTags)) {
                if (getNotecardByBookId.bookTags.some(tag => tag === 'Pinned')) return;

                setNoteCards(prev => {
                    prev.find(notecard => {
                        if (notecard.bookId === getNotecardByBookId.bookId) {
                            notecard = getNotecardByBookId
                        }
                    })
                    return prev
                });
            }
        }
    }

    const goToReviewMode = (bookTitle: string, bookId: string): void => {
        const encodedBookTitleUrl = encodeURIComponent(bookTitle);
        const encodedBookIdUrl = encodeURIComponent(bookId);

        router.push(`/highlightsreview/notecard?booktitle=${encodedBookTitleUrl}&bookid=${encodedBookIdUrl}`);
    };

    const handleNotecardDeletion = (bookId: string, toCloseModalRef: any): void => {
        // delete notecard from local storage

        if (bookId && noteCards.some(notecard => notecard.bookId === bookId)) {
            const updatedNotecards = noteCards.filter(noteCard => noteCard.bookId !== bookId);
            setNoteCards(updatedNotecards);
            toCloseModalRef.current?.close();
        }

        // delete from local storage
        const notecard = localStorage.getItem('user_notecards');
        if (notecard) {
            const parsedNotecards = JSON.parse(notecard);
            const filteredNotecards = parsedNotecards.filter((notecard: FrontNotecardInterface) => notecard.bookId !== bookId);

            localStorage.setItem('user_notecards', JSON.stringify(filteredNotecards));
        }


    };

    const handleAddingNewKindleHighlights = (selectedHighlights: Set<FrontNotecardInterface>): void => {

        setNoteCards(prev => [
            ...prev,
            ...[...selectedHighlights].map(notecard => notecard)
        ]);
    }

    // handle notecards filters
    useEffect(() => {
        const storedFilters = localStorage.getItem('notecards_filters');

        if (storedFilters) {
            const parsedFilters = JSON.parse(storedFilters);

            setNoteCards(prevState => {
                return prevState.filter(card => {
                    const matchedGenres = parsedFilters.genres.some(filter => card.genres.includes(filter)) ?? false;

                    const matchedLearningProcess = parsedFilters.learning_process_filter
                        .some(filter => card.learning_process_filter.includes(filter)) ?? false;

                    const matchedContentSource = parsedFilters.content_source_filter
                        .some(filter => card.content_source_filter.includes(filter)) ?? false;


                    return matchedGenres || matchedLearningProcess || matchedContentSource;
                });
            });
        }
    }, []);

    useEffect(() => {
        const tagName: string | undefined = pathname.split('/').pop(); // Extract the tag name from the URL

        const filteredNotecards = noteCards.filter(notecard => {
            // Normalize tagName for comparison
            const normalizedTagName = tagName?.toLowerCase();

            // Check if 'Pinned' exists in bookTags (case-insensitive)
            const hasPinnedTag = Array.isArray(notecard.bookTags)
                ? notecard.bookTags.some(tag => tag.toLowerCase() === 'pinned')
                : notecard.bookTags.toLowerCase() === 'pinned';

            // If the user is in the 'all' folder, include everything
            if (!tagName || tagName.toLowerCase() === 'all') {
                return true;
            }

            // Handle string and array cases for bookTags
            if (Array.isArray(notecard.bookTags)) {
                return (
                    hasPinnedTag || // Include if 'Pinned' exists
                    notecard.bookTags.some(tag => tag.toLowerCase() === normalizedTagName)
                );
            } else if (typeof notecard.bookTags === 'string') {
                const tag = notecard.bookTags.toLowerCase();
                return hasPinnedTag || tag === normalizedTagName;
            }

            return false; // Fallback for invalid bookTags
        });

        // Update state immutably
        setNoteCards(filteredNotecards);
    }, [pathname]);

    // fetch notecards from localstorage
    useEffect(() => {
        // Fetch from local storage
        const retrievedLocalStoredNotecard = getStoredNotecards();

        startTransition(() => {
            // Update state with retrieved data if available, otherwise use the notecard prop
            if (retrievedLocalStoredNotecard) {
                setNoteCards(retrievedLocalStoredNotecard);
            }
        })
    }, [noteCards.length])

    return (
            <div className={'homePageContainer'}>
                <HomePageWidgets username={'Jadtales'}/>
                <FolderComponent/>

                <div className="notes">
                    {isLoading ? <DataLoader width={'79vw'}/> :

                        noteCards.map((notecard, index: number) => (
                            <div key={index} onClick={() => goToReviewMode(notecard.bookTitle, notecard.bookId)}>
                                <FrontNoteComponent
                                    key={index}
                                    bookCredentials={{
                                        bookId: notecard.bookId,
                                        bookTitle: notecard.bookTitle,
                                        bookAuthor: notecard.bookAuthor,
                                        bookCover: notecard.bookCover,
                                        bookTags: notecard.bookTags!,
                                        bookHighlights: notecard.highlights
                                    }}
                                    notecardDeletion={handleNotecardDeletion}
                                    isNotecardToPin={handlePinnedNotecards}
                                />
                            </div>
                        ))}
                </div>
                <AddNoteComponentButton getNewSelectedKindleHighlights={handleAddingNewKindleHighlights}/>
            </div>
    );
}