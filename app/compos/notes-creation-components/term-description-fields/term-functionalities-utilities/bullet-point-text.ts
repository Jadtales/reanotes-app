import {RefObject} from "react";

export default function applyBulletsToSelectedText(termDivRef: RefObject<HTMLDivElement>): void {
    const selectedText: Selection | null = document.getSelection();
    if (!selectedText || selectedText.rangeCount === 0) return;

    const range: Range = selectedText.getRangeAt(0);

    if (termDivRef.current && termDivRef.current.contains(range.startContainer)) {
        const selectedPlainText: string = selectedText.toString();

        if (selectedPlainText) {
            const lines: string[] = selectedPlainText.split('\n');
            const bulletTextContainer: HTMLUListElement = document.createElement('ul');
            bulletTextContainer.className = 'bulletList';
            bulletTextContainer.style.padding = '10px 30px';

            lines.forEach((line) => {
                if (line.trim() !== '') {
                    const bulletText: HTMLLIElement = document.createElement('li');
                    bulletText.textContent = line;
                    bulletTextContainer.appendChild(bulletText);
                }
            });

            range.deleteContents();
            range.insertNode(bulletTextContainer);

            const newRange = document.createRange();
            newRange.setStartAfter(bulletTextContainer);
            newRange.collapse(true);
            selectedText.removeAllRanges();
            selectedText.addRange(newRange);
        }
    }
};
