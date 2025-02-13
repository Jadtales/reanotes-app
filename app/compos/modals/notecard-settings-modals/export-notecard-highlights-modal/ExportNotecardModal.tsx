import React, {Fragment, ReactElement, useRef} from "react";
import Image from "next/image";
import './exportNotecardModalStyling.css'

import {BookCredentialsInterface} from "@/utils/interfaces/front-notecard-interface";

import DownloadIcon from "@/public/icons/frontNoteSetting-icons/download-line.svg";
import CloseIcon from "@/public/icons/notesIcons/close-line.svg";
import DocsIcon from '@/public/icons/fileIcons/file-docs.svg'
import TextFileIcon from '@/public/icons/fileIcons/file-text.svg'
import ExportNotecardPDF
    from "@/app/compos/modals/notecard-settings-modals/export-notecard-highlights-modal/export-notecard-pdf/ExportNotecardPDF";

interface ComponentProps extends BookCredentialsInterface{
    isPhoneSize?: boolean;
}

export default function ExportNotecardModal({isPhoneSize = false, bookCredentials}: ComponentProps): ReactElement {


    const exportNotecardHighlightsRef = useRef<HTMLDialogElement>(null);

    // destruct bookCredentials interface
    const {bookTitle} = bookCredentials;

    const handleDialogToggle = () => {
        if (!exportNotecardHighlightsRef.current?.open) {
            exportNotecardHighlightsRef.current?.showModal()

        } else if (exportNotecardHighlightsRef.current?.open) {
            exportNotecardHighlightsRef.current?.close();
        }
    }

    return <Fragment>
        <li onClick={handleDialogToggle}
            className={'exportNotecardModalButton'}>
            <Image src={DownloadIcon} width={20} alt="exportNote"/>{!isPhoneSize && 'Export'}
        </li>

        <dialog className={'exportNotecardModalContainer'} ref={exportNotecardHighlightsRef}>
            <Image priority src={CloseIcon}
                   alt="closeThisModal"
                   onClick={handleDialogToggle}/>

            <div className="dialogContainer">
                <div className="dialogHeader">
                    <h1>Export - {bookTitle}</h1>
                    <p>Select file type to export your notecard's highlights.</p>
                </div>

                <div className="file-types">
                    {/*<button>*/}
                    {/*    <Image priority src={PdfIcon} alt={'export-pdf'}/>*/}
                    {/*    PDF (.PDF)*/}
                    {/*</button>*/}
                    <ExportNotecardPDF bookCredentials={bookCredentials}/>

                    <button className={'exportFileTypeButton'}>
                        <Image priority src={DocsIcon} alt={'export-docs'}/>
                        DOC/WORD (.DOCX)
                    </button>
                    <button className={'exportFileTypeButton'}>
                        <Image priority src={TextFileIcon} alt={'export-text'}/>
                        TEXT (.TXT)
                    </button>
                </div>

                {/*<hr/>*/}

                <div className="send-highlights-by-email">
                    <h5>Send your Notecard's highlights to an email.</h5>
                    <input type="email" placeholder={'username@mailserver.domain'}/>
                    <button className={'sendToEmailButton'}>Send</button>
                </div>
            </div>
        </dialog>
    </Fragment>
}