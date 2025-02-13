import {RefObject} from "react";

export default function applyOLList(termDivRef: RefObject<HTMLDivElement>): void {
    const selectedText: Selection | null = document.getSelection();
    if (!selectedText || selectedText.rangeCount === 0) return;

    const range: Range = selectedText.getRangeAt(0);

    if (termDivRef.current && termDivRef.current.contains(range.startContainer)) {
        const selectedPlainText: string = selectedText.toString();

        if (selectedPlainText) {
            const lines: string[] = selectedPlainText.split('\n');
            const numberedTextContainer: HTMLOListElement = document.createElement('ol');
            numberedTextContainer.className = 'numberedList';
            numberedTextContainer.style.padding = '10px 30px';

            lines.forEach((line) => {
                if (line.trim() !== '') {
                    const numberedText: HTMLLIElement = document.createElement('li');
                    numberedText.textContent = line;
                    numberedTextContainer.appendChild(numberedText);
                }
            });

            range.deleteContents();
            range.insertNode(numberedTextContainer);

            const newRange = document.createRange();
            newRange.setStartAfter(numberedTextContainer);
            newRange.collapse(true);
            selectedText.removeAllRanges();
            selectedText.addRange(newRange);
        }
    }
};
