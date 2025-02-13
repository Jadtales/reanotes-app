'use client'

import {ChangeEvent, Fragment, ReactElement, useEffect, useState} from "react";
import './createNotesPageStyling.css';

import NotecardCreationButtons from "@/app/compos/notes-creation-components/topLayerComponents/notecard-creation-buttons";
import NoteCard from "@/app/compos/notes-creation-components/NoteCard";
import SubModalComponent from "@/app/compos/modals/subscriptionModal/SubModalComponent";
import NoteDescriptionAndTitleComponent
    from "@/app/compos/notes-creation-components/topLayerComponents/notecard-title-description-component";
import CreatedNoteCardsInterface from "@/utils/interfaces/created-notecards-interface";

export default function Notes(): ReactElement {

    const [noteCards, setNoteCards] = useState<CreatedNoteCardsInterface>({
        isPublic: true,
        notecardsTitle: '',
        notecardsDescription: '',
        notecardsTags: [''],
        notecards: Array.from({length: 4}, (_: unknown, index: number) => ({
            cardKey: index + 1,
            cardTitle: 'Chapter name/number',
            cardDescription: 'Chapter description',
        }))
    });

    const [newCardsToAdd, setNewCardsToAdd] = useState<number>(1);
    const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

    const {tagsElement, noteCardTags, title_description} = NoteDescriptionAndTitleComponent();

    // Function to handle adding new cards
    const addNewCards = (): void => {
        if (noteCards.notecards.length + newCardsToAdd > 10) {
            return setIsSubModalOpen(true);
        }

        setNoteCards((prevCards) => {
            // Get the highest existing cardKey
            const maxKey = Math.max(...prevCards.notecards.map(card => card.cardKey), 0);

            // Create new cards with sequential keys starting after the highest existing key
            const newCards = Array.from({length: newCardsToAdd}, (_, index) => ({
                cardKey: maxKey + index + 1,
                cardTitle: `Chapter number/name`,
                cardDescription: `Your highlights/notes on the chapter`,
            }));

            return {
                ...prevCards,
                notecards: [...prevCards.notecards, ...newCards]
            };
        });

        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    };

    // assign if user's notecards is public
    const IsNotecardsPublic = (isPublic: boolean): void => {
        setNoteCards(prevState => {
            return {
                ...prevState,
                isPublic
            }
        })
    }

    // Handle changes to how many cards to add
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setNewCardsToAdd(Math.max(1, Math.min(value, 4)));
    };

    // handle notecard deletion
    const handleCardDeletion = (keyToDelete: number): void => {
        if (noteCards.notecards.length > 4) {
            setNoteCards((prevState) => {
                // Remove the card with the specified key
                const updatedCards = prevState.notecards.filter(card => card.cardKey !== keyToDelete);

                // Sort cards by their current keys to ensure proper ordering
                const sortedCards = [...updatedCards].sort((a, b) => a.cardKey - b.cardKey);

                // Resequence the keys while preserving card content
                const resequencedCards = sortedCards.map((card, index) => ({
                    cardKey: index + 1,
                    cardTitle: card.cardTitle,
                    cardDescription: card.cardDescription
                }));

                return {
                    ...prevState,
                    notecards: resequencedCards
                };
            });
        }
    };


    // Function to handle term and description updates
    const handleUpdateCard = (key: number, term: string, description: string): void => {
        setNoteCards((prevCards) => ({
            ...prevCards, // Preserve other properties (isPublic, notecardsTitle, etc.)
            notecards: prevCards.notecards.map((card) =>
                card.cardKey === key
                    ? {...card, cardTitle: term, cardDescription: description} // Update the matching card
                    : card // Leave other cards unchanged
            ),
        }));
    };

    // Prevent triggering browser default functionalities
    useEffect(() => {
        const handlePrinting = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', handlePrinting);

        return () => {
            document.removeEventListener('keydown', handlePrinting);
        };
    }, []);

    // add Notecards Title, Description & tags
    useEffect(() => {
        const handleNotecardsTDT = (): void => {
            setNoteCards(prevState => ({
                ...prevState,
                notecardsTitle: title_description.title,
                notecardsDescription: title_description.description,
                notecardsTags: noteCardTags
            }))
        }

        handleNotecardsTDT();
    }, [noteCardTags, title_description]);

    // Todo: save new created Notecards in the DB
    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className="createNotesComponent">
                <NotecardCreationButtons isNotecardsPublic={IsNotecardsPublic}/>

                {tagsElement}

                {noteCards.notecards.map((card, index) => (
                    <NoteCard
                        key={card.cardKey}
                        cardKey={card.cardKey}
                        cardTitle={card.cardTitle}
                        cardDescription={card.cardDescription}
                        onDelete={handleCardDeletion}
                        onUpdate={handleUpdateCard} // Pass the update handler
                    />
                ))}

                <div className="cardFooterContainer">
                    <div className="addNewCardButton" onClick={addNewCards}>
                        + Add card(s)
                    </div>
                    <input
                        type="number"
                        defaultValue={1}
                        max={10}
                        min={4}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {noteCards.notecards.length === 10 && isSubModalOpen && <SubModalComponent/>}
        </Fragment>
    );
}