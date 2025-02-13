import React, {Fragment, ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import "../../notes-creation-components/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/selectedNoteCards-highlightsModal-Styling.css";

import CloseIcon from "@/public/icons/notesIcons/close-line.svg";
import KindleDeviceIcon from "@/public/icons/tablet-line.svg";
import UknownBookCover from '@/public/icons/no-cover.png'


import SelectedNotecardComponent
    from "@/app/compos/notes-creation-components/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/selected-highlights-notecard";
import {arrangeKindleNotes} from "@/utils/providers/kindle-highlights-extract";

import FrontNotecardInterface from "@/utils/interfaces/front-notecard-interface";
import {usePathname} from "next/navigation";
import localStoreNotecards, {
    getStoredNotecards
} from "@/utils/localstorage-utility/localstore-notecards/localstore-notecards";
import HighlightsInterface from "@/utils/interfaces/highlights-interface";
import {
    useFetchBookCovers
} from "@/app/compos/modals/kindle-highlights-import-modal/fetch-book-covers/fetch-book-covers";


interface ComponentProps {
    newSelectedKindleHighlights: (selectedHighlights: Set<FrontNotecardInterface>) => void;
}

export default function KindleHighlightsImportModal({newSelectedKindleHighlights,}: ComponentProps): ReactElement {

    const [highlights, setHighlights] = useState<FrontNotecardInterface[] | null>(null);
    const [selectedHighlights, setSelectedHighlights] = useState<Set<FrontNotecardInterface>>(new Set());

    const [fileError, setFileError] = useState<string | null>(null);
    const [isAlreadyImported, setIsAlreadyImported] = useState({
        exist: false,
        existingNotecards: {} as FrontNotecardInterface[]
    });

    // Fetch book covers
    const {data, error, isLoading} = useFetchBookCovers({selectedHighlights});

    // Update selectedHighlights with book covers
    useEffect(() => {
        if (data) {
            setSelectedHighlights((prevState) => {
                const updatedNotecards = Array.from(prevState).map((notecard) => {
                    // Find the corresponding book cover from the fetched data
                    const bookCover = data.find((item) => item.bookId === notecard.bookId)?.bookCover || UknownBookCover;

                    return {
                        ...notecard,
                        bookCover: !isLoading && bookCover || error && '' ,
                    };
                });

                return new Set(updatedNotecards);
            });
        }
    }, [data, isLoading, error]);


    const pathname = usePathname();
    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isImportButtonInCreateNotecardPage = pathname.startsWith('/createnotes');

    // Toggle dialog display
    const handleDialogDisplaying = (resetSelection: boolean = true): void => {
        const modal = modalRef.current;

        if (!modal?.open) {
            modal?.showModal();
        } else {
            if (resetSelection) setSelectedHighlights(new Set());
            modal?.close();
        }
    };

    // Handle file input and process highlights
    const handleFileFiltering = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];

            try {
                const fileText = await selectedFile.text();
                const parsedHighlights = arrangeKindleNotes(fileText);

                if (parsedHighlights && parsedHighlights.length > 0) {
                    setFileError(null); // Clear previous errors
                    setHighlights(parsedHighlights);
                    handleDialogDisplaying();
                } else {
                    setFileError("No valid highlights found in the file.");
                }
            } catch (error) {
                setFileError("Failed to parse the file. Please upload a valid file.");
                console.error("Error processing the file:", error);
            } finally {
                event.target.value = ''; // Clear input field
            }
        }
    };

    // Open the file input
    const initInputOpen = (): void => {
        inputRef.current?.click();
    };

    // Handle selection of individual highlights
    const handleSelectedHighlights = (highlight: FrontNotecardInterface): void => {
        setSelectedHighlights((prev) => {
            const prevState = new Set(prev);

            // Check if the highlight already exists in the Set
            const doesHighlightExist = Array.from(prevState).find(
                (existingHighlight) =>
                    existingHighlight.bookId === highlight.bookId
            );

            if (doesHighlightExist) {
                prevState.delete(doesHighlightExist);
            } else {
                prevState.add(highlight);
            }

            return prevState;
        });
    };

    // Handle selected highlights import
    const handleNotecardsImport = (): void => {
        // Retrieve stored notecards from localStorage
        const storedNotecards: HighlightsInterface[] = getStoredNotecards()!;

        const duplicatesExist = Array.from(selectedHighlights).filter((highlight) => {
            return storedNotecards?.some((storedNotecard) => {
                return storedNotecard.bookTitle === highlight.bookTitle &&
                    storedNotecard.bookAuthor === highlight.bookAuthor;
            });
        });

        if (duplicatesExist.length > 0) {
            setIsAlreadyImported({exist: true, existingNotecards: duplicatesExist});
            return;
        } else {
            // If no duplicates exist, store the selected highlights in localStorage
            localStoreNotecards(Array.from(selectedHighlights));
        }

        // Update the state with the selected highlights
        newSelectedKindleHighlights(selectedHighlights);

        handleDialogDisplaying();
    };

    const handleNotecardsDuplicateImport = (): void => {
        if (isAlreadyImported.exist && selectedHighlights.size > 0) {
            newSelectedKindleHighlights(selectedHighlights);
        }
    }

    // handle highlights selection cancellation
    const handleSelectedHighlightsCancellation = (): void => {
        setSelectedHighlights(new Set())
        setIsAlreadyImported(prevState => ({
            ...prevState,
            exist: false,
        }))
    }

    // handle all highlights selection
    const handleAllHighlightsSelection = (): void => {
        setSelectedHighlights(new Set(highlights));
    }

    return (
        <>
            <button
                onClick={initInputOpen}
                className={isImportButtonInCreateNotecardPage ? 'importKindleHighlightsButton' : 'kindleHighlightsButton'}
            >
                <Image src={KindleDeviceIcon} width={20} alt="kindle"/> Kindle
            </button>

            <input type="file" ref={inputRef} onChange={handleFileFiltering} style={{display: "none"}}/>

            <dialog className="KindleHighlightsSelectionContainer" ref={modalRef}>
                <div className="dialogContent">
                    <div className="topCompoLayer">
                        <div className="typeOfSelection">
                            <button onClick={handleAllHighlightsSelection}>Select All</button>
                            <button onClick={handleSelectedHighlightsCancellation}>Cancel</button>
                        </div>
                        <Image src={CloseIcon} alt="closeModal" onClick={() => handleDialogDisplaying(false)}/>
                    </div>

                    <hr style={{width: "100%"}}/>

                    <div className="import_warning_section">
                        <button className="FinalImportButton"
                                onClick={handleNotecardsImport}
                                onDoubleClick={handleNotecardsDuplicateImport}>
                            Import
                        </button>
                        {isAlreadyImported.exist && <span
                            className={'warningSection'}>Some of the imported Notes already exist.
                            double click on <strong>Import</strong> if you wish to continue importing them.</span>}
                    </div>

                    {fileError && <p className="error">{fileError}</p>}

                    {highlights?.length === 0 ? (
                        <p className="filesLoader">No highlights found in the file.</p>
                    ) : (
                        <Fragment>
                            <h2>Select your highlights to be imported</h2>

                            <div className="noteCards">
                                {highlights?.map((highlightObj, index) => (
                                    <SelectedNotecardComponent
                                        key={index}
                                        bookTitle={highlightObj.bookTitle}
                                        bookAuthor={highlightObj.bookAuthor}

                                        doesNotecardExist={
                                            isAlreadyImported.exist &&
                                            isAlreadyImported?.existingNotecards
                                                .some(highlight => (
                                                    highlight.bookTitle === highlightObj.bookTitle
                                                    && highlight.bookAuthor === highlightObj.bookAuthor
                                                )) && isAlreadyImported.exist
                                        }

                                        highlightsQuantity={highlightObj.highlights.length}
                                        onSelect={() => handleSelectedHighlights(highlightObj)}
                                        isNotecardSelected={selectedHighlights.has(highlightObj)}
                                    />
                                ))}
                            </div>
                        </Fragment>
                    )}
                </div>
            </dialog>
        </>
    );
}