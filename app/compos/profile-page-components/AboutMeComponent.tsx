import {ReactElement, useRef, useState} from "react";
import Image from "next/image";

import EditIcon from '@/public/icons/pencil-line.svg';
import SaveIcon from '@/public/icons/check-line.svg';

interface ComponentProps {
    aboutMeText: string;
}

export default function AboutMeComponent({aboutMeText}: ComponentProps): ReactElement {
    const [currentAboutMeText, setCurrentAboutMeText] = useState(aboutMeText);
    const [isEditing, setIsEditing] = useState(false);
    const [isElementHovered, setIsElementHovered] = useState(false);
    const aboutMeTextRef = useRef<HTMLParagraphElement>(null);

    const handleAboutMeSaving = (): void => {
        if (isEditing) {
            // Save the updated about me text
            const updatedAboutMeText = aboutMeTextRef.current?.innerText.trim();
            if (updatedAboutMeText && updatedAboutMeText !== currentAboutMeText) {
                setCurrentAboutMeText(updatedAboutMeText);
            }
        }
        setIsEditing(!isEditing); // Toggle editing state

        // Focus on the span element when editing starts
        if (!isEditing && aboutMeTextRef.current) {
            aboutMeTextRef.current.focus();
        }
    };

    const handleBlur = (): void => {
        if (isEditing) {
            handleAboutMeSaving(); // Save on blur if in editing mode
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent line break
            handleAboutMeSaving(); // Save on Enter key press
        }
    };

    return (
        <div
            style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}
            onMouseLeave={() => setIsElementHovered(false)}
            onMouseEnter={() => setIsElementHovered(true)}
        >
            <h1 style={{marginBottom: '10px'}}>About me</h1>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    ref={aboutMeTextRef}
                    style={{
                        fontSize: '1rem',
                        fontWeight: 'lighter',
                        color: 'var(--secondaryTextColor)',
                        borderBottom: isEditing ? '2px solid var(--primaryTextColor)' : 'none',
                        outline: 'none',
                        cursor: isEditing ? 'text' : 'pointer',
                    }}
                    onBlur={handleBlur} // Save on blur
                    onKeyDown={handleKeyDown} // Save on Enter key
                >
                    {currentAboutMeText}
                </p>
                {isElementHovered && (
                    <button
                        style={{background: 'none', border: 'none', cursor: 'pointer'}}
                        onClick={handleAboutMeSaving}
                    >
                        <Image  width={16}
                            style={{filter: 'var(--imgColor_dark_gray)', marginLeft: '10px'}}
                            src={isEditing ? SaveIcon : EditIcon}
                            alt={isEditing ? 'saveThis' : 'editThis'}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}