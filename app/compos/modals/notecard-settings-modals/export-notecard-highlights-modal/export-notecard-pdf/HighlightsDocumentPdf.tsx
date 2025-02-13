import {Document, Page, StyleSheet, Text, View, Image} from "@react-pdf/renderer";
import React, {ReactElement} from "react";
import {BookCredentialsInterface} from "@/utils/interfaces/front-notecard-interface";

interface ComponentProps extends BookCredentialsInterface {}

export default function HighlightsDocumentPdf({bookCredentials}: ComponentProps): {
    highlightsDocumentPdf: ReactElement
} {
    // Define styles for the PDF
    const styles = StyleSheet.create({
        reanotesIcon: {
            borderRadius: '4px',
            width: 40,
            height: 40,
        },
        page: {
            flexDirection: "column",
            backgroundColor: "white",
            padding: 40,
        },
        header: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
        },
        subheader: {
            fontSize: 12,
            marginBottom: 10,
            fontWeight: 'ultralight'
        },
        highlight: {
            fontSize: 12,
            marginBottom: 10,
            paddingBottom: 15,
        },
    });


    const highlightsDocumentPdf = (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Book Title */}
                <Text style={styles.header}>{bookCredentials.bookTitle}</Text>

                {/* Book Author */}
                <Text style={styles.subheader}>By {bookCredentials.bookAuthor}</Text>

                {/* Highlights */}
                {bookCredentials.bookHighlights?.map((highlight, index) => (
                    <View key={highlight.highlightKey} style={styles.highlight}>
                        <Text>
                            {index + 1}. {highlight.highlight}
                        </Text>
                    </View>
                ))}
            </Page>
        </Document>
    );

    return {highlightsDocumentPdf}
}