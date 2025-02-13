import {ChangeEvent, ReactElement, useRef, useState} from "react";


export default function DescriptionField(): { descriptionField: ReactElement<any> } {
    const [noteCardDescriptionField, setNoteCardDescriptionField] = useState<string>()
    const definitionDivRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: ChangeEvent<HTMLDivElement>): void => {
        const content: string = event.currentTarget.innerText.trim();
        setNoteCardDescriptionField(content);
    }

    const descriptionField: ReactElement<any> = (
        <div className={'termTextarea'}>
            <div
                id="definitionInputField"
                ref={definitionDivRef}
                contentEditable
                autoFocus
                data-placeholder={'Your highlights/notes on the chapter'}
                suppressContentEditableWarning={true} // Suppress React warning for contentEditable
                onBlur={handleInputChange}
            >
                {noteCardDescriptionField}
            </div>
        </div>
    )

    return {
        descriptionField
    }
}