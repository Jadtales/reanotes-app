import React, {
    Fragment,
    ReactElement,
    useContext,
    useRef,
    MouseEvent as ReactMouseEvent,
    useState,
    useEffect
} from "react";
import './moveToComponentStyling.css'

// Imported Icons
import CloseIcon from '@/public/icons/notesIcons/close-line.svg';
import Image from "next/image";

import FoldersStateManagerContext from "@/app/wide-state-management/FoldersState";
import FolderTransferIcon from "@/public/icons/frontNoteSetting-icons/folder-transfer-line.svg";

interface ComponentProps {
    isPhoneSize: boolean;
    notecardCredentials: {
        bookId?: string | number;
        bookTags: string[];
    };
}

// type helpers
type notecardCredentialsInterface = ComponentProps["notecardCredentials"];


export default function MoveToFolderModal({
                                              isPhoneSize = false,
                                              notecardCredentials
                                          }: ComponentProps): ReactElement<HTMLDivElement | HTMLLIElement> | null {

    const [currentNotecardTags, setCurrentNotecardTags] = useState<notecardCredentialsInterface>();

    const moveToButtonRef = useRef<HTMLDialogElement>(null);

    const cntx = useContext(FoldersStateManagerContext);

    const handleDialogOpening = (): void | number => {
        const isModalOpen = moveToButtonRef.current;

        if (!isModalOpen?.open) {
            setCurrentNotecardTags(notecardCredentials)
            moveToButtonRef.current?.showModal();
        } else {
            moveToButtonRef.current?.close();
        }
    };

    const handleNotecardTagsUpdate = (tag: string): void => {
        // Capitalize tag name
        // const capitalizedTagName = tag.at(0)?.toUpperCase() + tag.slice(1);
        // const isTagInBookTags = currentNotecardTags?.bookTags && currentNotecardTags?.bookTags.includes(capitalizedTagName);
        //
        // setCurrentNotecardTags((prevState) => {
        //     return {
        //         ...prevState,
        //         bookTags: Array.isArray(prevState?.bookTags) && isTagInBookTags ?
        //             prevState?.bookTags.filter(availableTag => availableTag !== capitalizedTagName) :
        //             Array.isArray(prevState?.bookTags) && !isTagInBookTags ?
        //                 [...prevState?.bookTags, capitalizedTagName] : prevState?.bookTags
        //     }
        // })
        //
        setCurrentNotecardTags((prevState) => {
            return {
                ...prevState,
                bookTags: prevState?.bookTags.push(tag)
            }
        });

        console.log(notecardCredentials)
    };

    // setTimeout(() => console.log(currentNotecardTags), 100)

    // todo: update notecard's tags if removed or added to a folder
    useEffect(() => {


    }, [notecardCredentials]);

    return (
        <Fragment>
            <li onClick={handleDialogOpening}><Image src={FolderTransferIcon} width={20} alt="moveNote"/>
                {!isPhoneSize && 'Move to'}
            </li>

            <dialog ref={moveToButtonRef} className="MoveToContainer" onClick={(e) => e.stopPropagation()}>
                <div className="dialogContainer">
                    <Image priority src={CloseIcon}
                           alt="closeThisModal"
                           onClick={handleDialogOpening}/>

                    <div className="ModalInstructions">
                        <h1>Move this Notecard to:</h1>
                        <p>
                            A notecard can have multiple tags,
                            yet only appear if a notecard contains a matched folder name.
                        </p>
                    </div>
                    <hr style={{margin: '20px 0'}}/>
                    <div className="tagsContainer">
                        <ul>
                            {cntx.map((tag, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleNotecardTagsUpdate(tag)}
                                    className={currentNotecardTags?.bookTags &&
                                    currentNotecardTags?.bookTags.includes(tag.at(0)?.toUpperCase() + tag.slice(1))
                                        ? "inFolder" : undefined}
                                >
                                    #{tag.at(0)?.toUpperCase() + tag.slice(1)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </dialog>
        </Fragment>
    )
}
