import {Fragment, MouseEvent as ReactMouseEvent, ReactElement, useRef, useState} from "react";

import DeleteIcon from '@/public/icons/notesIcons/close-line.svg'
import Image from "next/image";
import {capitalize} from "@/utils/helper-functions/string-type-helper-functions";

interface ComponentProps {
    isDeletionButtonClicked: (isClicked: boolean, folder: string) => void;
    folderName: string;
}

export default function DeleteFolderElementButton({
                                                isDeletionButtonClicked,
                                                folderName
                                            }: ComponentProps): ReactElement<HTMLButtonElement> {

    const dialogRef = useRef<HTMLDialogElement>(null);


    const handleModalToggling = (event: ReactMouseEvent): void => {
        event.stopPropagation();
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    };


    const handleDeletion = () => {
        isDeletionButtonClicked(true, folderName);
    }


    return <Fragment>
        <button
            style={{
                filter: 'var(--imgColor_white)',
                display: 'flex',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer'
            }}

            onClick={handleModalToggling}
        >
            &#x2716;
        </button>

        <dialog ref={dialogRef} className={'noteCardDeletionDialog'}>
            <div style={{
                marginBottom: '2rem',
                fontSize: '1.2rem',
                color: 'var(--textCollor_darkMode_lightMode)',
                fontWeight: 'normal'
            }}>Are you sure about deleting {capitalize(folderName)} Folder.
            </div>
            <div className="chosenButtons" style={{display: 'flex', gap: '5px', justifyContent: 'end'}}>

                <button onClick={handleDeletion} style={{
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    color: 'var(--textColor_in_dark_mode)',
                    cursor: 'pointer',
                    backgroundColor: "var(--secondPrimaryTextColor)"
                }}>Delete
                </button>

                <button onClick={handleModalToggling} style={{
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    color: 'var(--textColor_in_dark_mode)',
                    cursor: 'pointer',
                    backgroundColor: "black"
                }}>Cancel
                </button>
            </div>
        </dialog>
    </Fragment>
}