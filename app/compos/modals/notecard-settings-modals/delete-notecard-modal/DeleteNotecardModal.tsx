import {Fragment, MouseEvent as ReactMouseEvent, ReactElement, useRef} from "react";
import './deleteNoteCardModalStyling.css'

import DeleteIcon from '@/public/icons/delete-bin-line.svg'
import Image from "next/image";

interface ComponentProps {
    deleteIsClicked: (event: ReactMouseEvent, toCloseModalRef: any) => void;
    isPhoneSize?: boolean;
}

export default function DeleteNotecardModal({deleteIsClicked, isPhoneSize = false}: ComponentProps): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleModalToggling = (): void => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    };

    const handleNotecardDeletion = (event: ReactMouseEvent): void => {
        if (event) {
            deleteIsClicked(event, dialogRef);
        }
    };


    return <Fragment>
        <li onClick={handleModalToggling}>
            {isPhoneSize ? (<Image src={DeleteIcon} alt={'delete-notecard'}/>) : 'Delete'}
        </li>

        <dialog ref={dialogRef} className={'noteCardDeletionDialog'}>
            <div style={{marginBottom: '2rem', fontSize: '1.2rem'}}>Are you sure about deleting your Notecard?</div>
            <div className="chosenButtons" style={{display: 'flex', gap: '5px', justifyContent: 'end'}}>
                <button onClick={handleNotecardDeletion} style={{
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