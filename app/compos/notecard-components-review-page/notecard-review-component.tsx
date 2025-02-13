import {Fragment, ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import './notecard-review-styling.css'
import ShareStatsModal from "@/app/compos/modals/share-stats-modal/ShareStatsModal";

// imported icons
import EditNoteCardIcon from '@/public/icons/pencil-line.svg'
import StarIcon from '@/public/icons/star-line.svg'
import FilledStaredIcon from '@/public/icons/star-fill.svg'
import ArrowDownIcon from '@/public/icons/arrowDownIcon.svg'
import SaveIcon from '@/public/icons/check-line.svg'
import AiIcon from '@/public/icons/AiIcon.svg'
import {useSearchParams} from "next/navigation";

interface NotecardReviewPageProps {
    noteCardContent: string;
}

export default function NoteCardReview({noteCardContent}: NotecardReviewPageProps): ReactElement<any> {
    const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
    const [isNoteCardStared, setIsNoteCardStared] = useState<boolean>(false);

    const [content, setContent] = useState<string>(noteCardContent);

    console.log('content',content)

    const editableRef = useRef<HTMLParagraphElement | null>(null);
    const query = useSearchParams();

    const bookTitle: string = query.get('booktitle')!;

    useEffect(() => {
        // Focus on the content when entering edit mode
        if (isEditModeActive && editableRef.current) {
            editableRef.current.focus();
        }
    }, [isEditModeActive]);

    const handleSaveContent = (): void => {
        if (editableRef.current) {
            setContent(editableRef.current.innerText); // Save the edited text
        }
        setIsEditModeActive(false); // Exit edit mode
    };

    const handleStaringIcon = (): void => {
        setIsNoteCardStared(!isNoteCardStared);
    }

    return (
        <Fragment>
            <div className="noteCardReviewPageContainer">
                <div className="content_moreOptions">
                    <p
                        ref={editableRef}
                        contentEditable={isEditModeActive}
                        suppressContentEditableWarning={true} // Prevent React warning for contentEditable
                        className={isEditModeActive ? "editable active" : "editable"}
                        id="noteCardReviewContent"
                    >
                        {content}
                    </p>
                    {/*<Image src={ArrowDownIcon} alt="moreOptions" id="moreOptions"/>*/}
                </div>

                <div className="editingToolsLayer">
                    <Image priority src={isNoteCardStared ? FilledStaredIcon : StarIcon} alt="starNoteCard" id="starIcon"
                           onClick={handleStaringIcon}/>
                    <Image priority src={AiIcon} alt="useAi"/>
                    <Image priority
                        src={isEditModeActive ? SaveIcon : EditNoteCardIcon}
                        alt="editNoteCard"
                        id="editIcon"
                        onClick={() => {
                            if (isEditModeActive) {
                                handleSaveContent(); // Save when exiting edit mode
                            } else {
                                setIsEditModeActive(true); // Enter edit mode
                            }
                        }}
                    />
                    <ShareStatsModal
                        whoShared="jadtales"
                        sharedTypeOfContent="Highlight"
                        sharedContent={content}
                        book_credentials={{book_title_author: bookTitle}}
                    />
                </div>

            </div>
        </Fragment>

    );
}