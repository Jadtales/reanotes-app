import {ReactElement, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent} from "react";
// imported types
import {EditingToolsType} from "@/utils/types/notecard-related-types";
import HighlightSelectedText
    from "@/app/compos/notes-creation-components/term-description-fields/term-functionalities-utilities/highlight-text";
import applyOLList
    from "@/app/compos/notes-creation-components/term-description-fields/term-functionalities-utilities/number-list-text";
import applyBulletsToSelectedText
    from "@/app/compos/notes-creation-components/term-description-fields/term-functionalities-utilities/bullet-point-text";

interface ComponentProps {
    editingTools: EditingToolsType;
    onContentChange?: (content: string) => void;
}

export default function notecardTextField({editingTools, onContentChange}: ComponentProps): {
    NotecardTextInputField: ReactElement<HTMLDivElement>
} {

    const termDivRef = useRef<HTMLDivElement>(null);


    // add a new paragraph text
    // const handleNewParagraphText = (event: ReactKeyboardEvent) => {
    //     if(event.key === "Enter") {
    //         event.preventDefault();
    //         const paragraphElement = document.createElement("p");
    //         paragraphElement.className = 'paragraph-text'
    //
    //         termDivRef.current?.appendChild(paragraphElement);
    //     }
    // }

    // trigger editing tools with buttons
    useEffect(() => {
        if (editingTools.clickedButton === 'HighlightText' && (editingTools.isClicked || !editingTools.isClicked)) {
            console.log("HighlightText tool activated"); // Debugging
            HighlightSelectedText(termDivRef);
        }

        if (editingTools.clickedButton === 'BulletPoints' && (editingTools.isClicked || !editingTools.isClicked)) {
            console.log("BulletPoints tool activated"); // Debugging
            applyBulletsToSelectedText(termDivRef);
        }

        if (editingTools.clickedButton === 'NumberedList' && (editingTools.isClicked || !editingTools.isClicked)) {
            console.log("NumberedList tool activated"); // Debugging
            applyOLList(termDivRef);
        }

    }, [editingTools]);

    // trigger editing tools with keyboard
    useEffect(() => {
        if ((editingTools.clickedButton === 'HighlightText'
            && editingTools.isClicked)) {

            HighlightSelectedText(termDivRef)
        }

        const keydownListener = (event: KeyboardEvent): void => {

            // Check if the highlighter tool is active
            if ((event.ctrlKey &&
                event.key === 'm')) {

                event.preventDefault();
                HighlightSelectedText(termDivRef);
            }

            if (event.ctrlKey && event.key === 'b' && event.detail === 2) {
                event.preventDefault();
                applyBulletsToSelectedText(termDivRef);
            }

            if (event.ctrlKey && event.key === 'n') {
                event.preventDefault();
                applyOLList(termDivRef);
            }
        };

        document.addEventListener('keydown', keydownListener);

        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, []);

    useEffect(() => {
        const handleInput = () => {
            if (termDivRef.current && onContentChange) {
                onContentChange(termDivRef.current.innerText);
            }
        };

        const termDiv = termDivRef.current;
        if (termDiv) {
            termDiv.addEventListener('input', handleInput);
        }

        return () => {
            if (termDiv) {
                termDiv.removeEventListener('input', handleInput);
            }
        };
    }, [onContentChange]);

    // Reset contentEditable div when the component unmounts
    useEffect(() => {
        const termDiv = termDivRef.current;

        return () => {
            if (termDiv) {
                termDiv.innerText = ''; // Reset the content
            }
        };
    }, []);

    const NotecardTextInputField = (
        <div
            id="notecardInputField"
            ref={termDivRef}
            autoFocus
            data-placeholder={'Chapter number/name'}
            contentEditable={true}
            suppressContentEditableWarning={true}
        />
    );

    return {
        NotecardTextInputField,
    };
}