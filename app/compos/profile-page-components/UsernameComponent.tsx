import { ReactElement, useRef, useState } from "react";
import Image from "next/image";

import EditIcon from '@/public/icons/pencil-line.svg';
import SaveIcon from '@/public/icons/check-line.svg';

interface ComponentProps {
    username: string;
}

export default function UsernameProfilePageComponent({ username }: ComponentProps): ReactElement {
    const [currentUsername, setCurrentUsername] = useState(username);
    const [isEditing, setIsEditing] = useState(false);
    const [isElementHovered, setIsElementHovered] = useState(false);
    const usernameElementRef = useRef<HTMLHeadingElement>(null);

    const handleUsernameSaving = (): void => {
        if (isEditing) {
            // Save the updated username
            const updatedUsername = usernameElementRef.current?.innerText.trim();
            if (updatedUsername && updatedUsername !== currentUsername) {
                setCurrentUsername(updatedUsername);
            }
        }
        setIsEditing(!isEditing); // Toggle editing state

        // Focus on the h1 element when editing starts
        if (!isEditing && usernameElementRef.current) {
            usernameElementRef.current.focus();
        }
    };

    const handleBlur = (): void => {
        if (isEditing) {
            handleUsernameSaving(); // Save on blur if in editing mode
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent line break
            handleUsernameSaving(); // Save on Enter key press
        }
    };

    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: 'fit-content' }}
            onMouseLeave={() => setIsElementHovered(false)}
            onMouseEnter={() => setIsElementHovered(true)}
        >
            <h1
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                ref={usernameElementRef}
                style={{
                    fontSize: '4rem',
                    fontWeight: 'lighter',
                    color: 'var(--secondPrimaryTextColor)',
                    outline: 'none',
                    cursor: isEditing ? 'text' : 'pointer',
                }}
                onBlur={handleBlur} // Save on blur
                onKeyDown={handleKeyDown} // Save on Enter key
            >
                {currentUsername.at(0)?.toUpperCase() + currentUsername.slice(1)}
            </h1>
            {isElementHovered && (
                <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, margin: 0 }}
                    onClick={handleUsernameSaving}
                >
                    <Image
                        style={{ filter: 'var(--imgColor_dark_gray)' }}
                        src={isEditing ? SaveIcon : EditIcon}
                        alt={isEditing ? 'saveThis' : 'editThis'}
                    />
                </button>
            )}
        </div>
    );
}