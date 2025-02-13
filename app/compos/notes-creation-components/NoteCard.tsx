import { ReactElement, useState } from "react";
import Image from "next/image";
import './notesCreationCompoStyling.css';

import AiIcon from '@/public/icons/notesIcons/sparkling-fill.svg';
import UpArrowIcon from '@/public/icons/notesIcons/arrow-up-line.svg';
import DownArrowIcon from '@/public/icons/notesIcons/arrow-down-line.svg';
import DeleteCardIcon from '@/public/icons/notesIcons/close-line.svg';
import notecardTextField from "@/app/compos/notes-creation-components/term-description-fields/notecard-text-field";
import useEditingTools from "@/app/compos/notes-creation-components/term-description-fields/EditingTools";

interface ComponentProps {
    cardKey?: number;
    cardTitle?: string;
    cardDescription?: string;
    onDelete: (key: number) => void;
    onUpdate: (key: number, term: string, description: string) => void;
}

export default function NoteCard({
                                     cardKey,
                                     cardTitle,
                                     cardDescription,
                                     onDelete,
                                     onUpdate,
                                 }: ComponentProps): ReactElement {

    const { cardEditingToolsUIInterface, clickedEditingTools } = useEditingTools();

    const [term, setTerm] = useState(cardTitle || '');
    const [description, setDescription] = useState(cardDescription || '');

    const { NotecardTextInputField: TermField } = notecardTextField({
        editingTools: clickedEditingTools,
        onContentChange: (newTerm) => {
            setTerm(newTerm);
            onUpdate(cardKey, newTerm, description);
        },
    });

    const { NotecardTextInputField: DescriptionField } = notecardTextField({
        editingTools: clickedEditingTools,
        onContentChange: (newDescription) => {
            setDescription(newDescription);
            onUpdate(cardKey, term, newDescription);
        },
    });


    return (
        <div className="noteCardContainer">
            <div className="noteCardEditing">
                <span className="cardKey">{cardKey}</span>
                <div className="editingToolsContainer">
                    {cardEditingToolsUIInterface}
                    <div className="otherCardEditingOptions">
                        <ul>
                            <li><Image src={AiIcon} alt={"useAi"} /></li>
                            <li><Image src={UpArrowIcon} alt={"moveCardUp"} /></li>
                            <li><Image src={DownArrowIcon} alt={"moveCardDown"} /></li>
                            <li className="deleteButton" onClick={() => onDelete(cardKey)}>
                                <Image src={DeleteCardIcon} alt={"deleteCard"} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="term_description_layer">
                <div className="term">
                    <div className={'termTextarea'}>
                        {TermField}
                    </div>
                    <h1>Term</h1>
                </div>

                <div className="description">
                    <div className={'termTextarea'}>
                        {DescriptionField}
                    </div>
                    <h1>Description</h1>
                </div>
            </div>
        </div>
    );
}