import '../notesCreationCompoStyling.css'
import React, {ChangeEvent, ChangeEventHandler, ReactElement, useRef, useState} from 'react';


interface ReactElementReturnType {
    tagsElement: ReactElement<HTMLDivElement>,
    noteCardTags: string[],
    title_description: {
        title: string;
        description: string;
    }
}

export default function NoteDescriptionAndTitleComponent(): ReactElementReturnType {

    const [noteCardTags, setNoteCardTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>('');
    const [title_description, setTitleDescription] = useState<{title: string, description: string}>({
        title: '',
        description: ''
    });

    const noteTagsRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTag(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && newTag.trim() !== '') {
            setNoteCardTags((prevTags) => [...prevTags, newTag.trim()]);
            setNewTag(''); // Clear the input field
        }
    };

    const handleRemoveTag = (index: number): void => {
        setNoteCardTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const handleTitleExtraction = (event: ChangeEvent<HTMLInputElement>): void => {
        setTitleDescription(prevState => ({
            ...prevState,
            title: event.target.value
        }))
    }

    const handleDescriptionExtraction = (event: ChangeEvent<HTMLInputElement>): void => {
        setTitleDescription(prevState => ({
            ...prevState,
            description: event.target.value
        }))
    }

    const tagsElement = (
        <div className="noteDescriptionAndTitleComponentContainer">
            {/* Title Section */}
            <div className="noteTitle">
                <h1>Title</h1>
                <input type="text" placeholder="Enter Notecards Title" onChange={handleTitleExtraction}/>
            </div>

            {/* Description and Tags Section */}
            <div className="noteDescription">
                <h1>Description and Tags</h1>

                <input type="text" placeholder="Notecards Description" onChange={handleDescriptionExtraction}/>

                <div className="noteTags">
                    {noteCardTags.map((tag: string, index: number) => (
                        <button key={index} className="tagButton">
                            #{tag.at(0)?.toUpperCase() + tag.substring(1)}
                            <span
                                className="removeTag"
                                onClick={() => handleRemoveTag(index)}
                                style={{marginLeft: '8px', cursor: 'pointer'}}
                            >
                                &times;
                            </span>
                        </button>
                    ))}

                    <input
                        ref={noteTagsRef}
                        type="text"
                        value={newTag}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="New Tag +"
                    />
                </div>
            </div>
        </div>
    );
    return {
        tagsElement,
        noteCardTags,
        title_description
    }
}
