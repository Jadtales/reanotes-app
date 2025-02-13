'use client'

import {Fragment, KeyboardEvent as ReactKeyboardEvent, ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import './notecard-review-styling.css'

// imported icons
import ArrowLeftIcon from '@/public/icons/leftTo.svg'
import ArrowRightIcon from '@/public/icons/rightTo.svg'
import DifficultyProgressChoice from "@/app/compos/memorization-mode-components/DifficultyProgressChoice";
import {TextEffect} from "@/animationStyling/TextEffect";
import NoteCardLearnInterface from "@/utils/interfaces/notecard-learn-interface";
import {NotecardLearningProcessEnum} from "@/utils/enums/front-notecard-enums";

export default function NotecardMemorizationComponent(): ReactElement<any> {

    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [currentNotecard, setCurrentNotecard] = useState<number>(0);

    const [notecard, setNotecard] = useState<NoteCardLearnInterface>({
        viewed_notecards: [{id: '23232'}],
        due_notecards: [],
        new_notecards: [],
        notecards: [
            {
                term: 'hello',
                definition: 'bye',
                id: 'dsds',
                learning_process: NotecardLearningProcessEnum.NotStarted
            }, {
                term: 'hello',
                definition: 'bye',
                id: 'dsds',
                learning_process: NotecardLearningProcessEnum.NotStarted
            }, {
                term: 'hello',
                definition: 'bye',
                id: 'dsds',
                learning_process: NotecardLearningProcessEnum.NotStarted
            }, {
                term: 'hello',
                definition: 'bye',
                id: 'dsds',
                learning_process: NotecardLearningProcessEnum.NotStarted
            },
        ],
    });


    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    console.log(buttonsRef.current)
    // todo: fetch notecard to be studied

    const handleNextPreviousCardsChange = (event: ReactKeyboardEvent): void => {
        if (event.key === 'arrowLeft') {

        }
    }

    const handleCardMemorizationDifficulty = (event: ReactKeyboardEvent): void => {
        if (event.key === '1' || event.key === 'a') {

        }
    }

    useEffect(() => {
        const handleDifficultyLearningSubmission = (event: KeyboardEvent): void => {
            const anyButtonIsFocused = buttonsRef.current.some(button => {
                return button?.classList?.contains('chosenDifficultyLevel');
            });

            if (event.key === 'f' || event.key === '1') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[0]?.classList.add('chosenDifficultyLevel')
                setShowDefinition(!showDefinition);

                // update notecard learning process
                setNotecard(prevState => ({
                    ...prevState,
                    viewed_notecards: prevState.viewed_notecards.concat({
                        id: prevState.notecards.at(currentNotecard)?.id!
                    })
                }))
            } else if (event.key === 'u' || event.key === '2') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[1]?.classList.add('chosenDifficultyLevel')
                setShowDefinition(!showDefinition);
            } else if (event.key === 'g' || event.key === '3') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[2]?.classList.add('chosenDifficultyLevel')
                setShowDefinition(!showDefinition);
            } else if (event.key === 'p' || event.key === '4') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[3]?.classList.add('chosenDifficultyLevel')
                setShowDefinition(!showDefinition);
            }
        }

        if (typeof document !== 'undefined') {
            document.addEventListener('keydown', handleDifficultyLearningSubmission);
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.removeEventListener('keydown', handleDifficultyLearningSubmission);
            }
        }
    })

    return (
        <Fragment>
            <div className="noteCardMemorizeContainer">
                <div className="cardsLeftStatus">
                    <span className="duesCards">Due: 4</span>
                    <span className="newCards">New: 2</span>
                </div>

                <div className="cards">
                    <div className="cardContent">
                        <Image priority loading={'eager'} src={ArrowLeftIcon}
                               alt="previousCard" width={80}
                               style={{opacity: notecard.viewed_notecards.length > 1 ? 1 : 0}}/>

                        {showDefinition ? (
                            <TextEffect as={"p"}
                                        className={"cardDefinition"}
                                        per={'char'}
                                        preset={'fade'}
                                        children={notecard.notecards.at(currentNotecard)?.definition!}/>
                        ) : (
                            <p
                                id="cardTerm"
                                autoFocus
                                tabIndex={1}
                            >
                                {notecard.notecards.at(currentNotecard)?.term!}
                            </p>
                        )}

                        <Image priority loading={'eager'} src={ArrowRightIcon} alt="nextCard" width={80}/>
                    </div>
                </div>

                <div
                    className="leftQuantityCards">{`${notecard.viewed_notecards.length}/${notecard.notecards.length}`}</div>

                <DifficultyProgressChoice buttonsRef={buttonsRef}/>
            </div>

        </Fragment>)
}