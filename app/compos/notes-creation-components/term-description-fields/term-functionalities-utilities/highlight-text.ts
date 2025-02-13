import {RefObject} from "react";

export default function HighlightSelectedText(termDivRef: RefObject<HTMLDivElement>): void {
    const getSelectedText: Selection | null = document.getSelection();
    if (!getSelectedText || getSelectedText.rangeCount < 1) return;

    const range: Range = getSelectedText.getRangeAt(0);

    // Check if the selection is within the contentEditable div
    if (termDivRef.current && termDivRef.current.contains(range.startContainer)) {
        const selectedPlainText: string = getSelectedText.toString();
        if (selectedPlainText) {
            // Check if the selected text is within a <mark> element
            const parentElement = range.commonAncestorContainer.parentElement;

            if (parentElement?.tagName === 'MARK') {
                // Unmark only the selected text within the <mark> element
                const markElement = parentElement;
                const markText = markElement.textContent || '';

                // Get the start and end offsets of the selection within the <mark> element
                const startOffset = range.startOffset;
                const endOffset = range.endOffset;

                const beforeText = markText.substring(0, startOffset);
                const selectedText = markText.substring(startOffset, endOffset);
                const afterText = markText.substring(endOffset);

                // Create a document fragment to hold the new nodes
                const fragment = document.createDocumentFragment();

                // Add the text before the selection (if any)
                if (beforeText) {
                    const beforeMark = document.createElement('mark');
                    beforeMark.style.backgroundColor = 'var(--MarkedTextBackgroundColor)';
                    beforeMark.style.color = 'black'
                    // Custom background color
                    beforeMark.textContent = beforeText;
                    fragment.appendChild(beforeMark);
                }

                // Add the selected text (unmarked)
                if (selectedText) {
                    const selectedNode = document.createTextNode(selectedText);
                    fragment.appendChild(selectedNode);
                }

                // Add the text after the selection (if any)
                if (afterText) {
                    const afterMark = document.createElement('mark');
                    afterMark.style.backgroundColor = 'var(--MarkedTextBackgroundColor)';
                    afterMark.style.color = 'black'
                    // Custom background color
                    afterMark.textContent = afterText;
                    fragment.appendChild(afterMark);
                }

                // Replace the <mark> element with the new nodes
                markElement.replaceWith(fragment);
            } else {
                // Highlight: Wrap the selected text in a <mark> element
                const markedTextContainer: HTMLElement = document.createElement('mark');
                markedTextContainer.style.backgroundColor = 'var(--MarkedTextBackgroundColor)';
                markedTextContainer.style.color = 'black'
                // Custom background color
                markedTextContainer.textContent = selectedPlainText;

                // Delete the selected text from the DOM
                range.deleteContents();

                // Insert the highlighted text back into the DOM
                range.insertNode(markedTextContainer);
            }

            // Clear the selection
            getSelectedText.removeAllRanges();
        }
    }
};
