import {ReactElement, useContext, useRef} from "react";
import FoldersStateManagerContext from "@/app/wide-state-management/FoldersState";
import {capitalize} from "@/utils/helper-functions/string-type-helper-functions";

export default function AddNoteCardToFolderModal(): ReactElement<HTMLButtonElement> {

    const folders = useContext(FoldersStateManagerContext);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleDialogToggle = (): void => {

        if (!dialogRef.current.open) {
            dialogRef.current?.show();
        } else {
            dialogRef.current.close();
        }
    }

    return (
        <button className={'add-notecard-button'}
                onMouseEnter={handleDialogToggle}
                onMouseLeave={handleDialogToggle}
        >
            Add Notecard
            <dialog ref={dialogRef} className={'add-notecard-button-dialog'}>
                <ul>
                    {folders.map((folder: string, index: number) => (
                        <li key={index}>{capitalize(folder)}</li>
                    ))}
                </ul>
            </dialog>
        </button>)
}