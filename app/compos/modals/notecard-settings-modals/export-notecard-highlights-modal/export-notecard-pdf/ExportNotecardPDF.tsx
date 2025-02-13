import React, { Fragment, ReactElement } from "react";
import Image from "next/image";
import PdfIcon from "@/public/icons/fileIcons/file-pdf.svg";
import { BookCredentialsInterface } from "@/utils/interfaces/front-notecard-interface";
import {pdf} from "@react-pdf/renderer";
import HighlightsDocumentPdf from "@/app/compos/modals/notecard-settings-modals/export-notecard-highlights-modal/export-notecard-pdf/HighlightsDocumentPdf";

interface ComponentProps extends BookCredentialsInterface {}


export default function ExportNotecardPDF({ bookCredentials }: ComponentProps): ReactElement {
    const {highlightsDocumentPdf} = HighlightsDocumentPdf({bookCredentials})

    // Function to handle the export action
    const handleHighlightExport = async (): Promise<void> => {
        try {
            // Generate the PDF blob
            const blob = await pdf(highlightsDocumentPdf).toBlob();

            // Create a download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${bookCredentials.bookTitle}_highlights.pdf`;
            link.click();

            // Clean up the URL object
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting PDF:", error);
        }
    };

    return (
        <Fragment>
            <button
                className={'exportFileTypeButton'}
                onClick={handleHighlightExport}
            >
                <Image src={PdfIcon} alt="export-pdf" width={24} height={24} />
                <span>PDF (.PDF)</span>
            </button>
        </Fragment>
    );
}