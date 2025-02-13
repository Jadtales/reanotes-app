import Image, {StaticImageData} from "next/image";
import {ReactElement} from "react";
import {useQuery} from "@tanstack/react-query";
import UnknownBookCover from '@/public/icons/no-cover.png';
import {getAuthorNameVariation} from "@/utils/helper-functions/get-variation-author-name";
import FrontNotecardInterface from "@/utils/interfaces/front-notecard-interface";

interface ComponentProps {
    selectedHighlights: Set<FrontNotecardInterface>;
}

export function useFetchBookCovers({selectedHighlights}: ComponentProps): {
    // bookCovers: ReactElement<HTMLImageElement>[];
    data: any;
    error: any;
    isLoading: boolean;
} {

    const {isLoading, data, error} = useQuery({
        queryKey: ['bookCovers', selectedHighlights.size],
        queryFn: async () => {

            if (selectedHighlights.size === 0) return [];

            // Create a copy of selectedHighlights to avoid mutating state directly
            const updatedHighlights = new Set(selectedHighlights);

            // Fetch book covers for all notecards in parallel
            const fetchPromises = Array.from(updatedHighlights).map(async (chosenHighlight) => {
                if (!chosenHighlight?.bookTitle || !chosenHighlight?.bookAuthor) return chosenHighlight;

                const bookTitle = encodeURIComponent(chosenHighlight.bookTitle);
                const authorNameVariation = getAuthorNameVariation(chosenHighlight.bookAuthor);

                let result;
                for (const authorName of authorNameVariation) {
                    const query: string = `book_title=${bookTitle}&author_name=${encodeURIComponent(authorName)}`;

                    try {
                        const response = await fetch(`https://bookcover.longitood.com/bookcover?${query}`);

                        if (!response.ok) continue; // Try the next variation
                        if(response.status === 403) continue;

                        result = await response.json();
                        break; // Exit the loop if successful
                    } catch (error) {
                        throw new Error("Error fetching book cover:", error);
                    }
                }

                // Update the notecard with the fetched cover or an empty string if no cover is found
                return {
                    ...chosenHighlight,
                    bookCover: result?.url || "",
                };

            });

            // Wait for all fetch operations to complete
            return await Promise.all(fetchPromises);
        },
    });

    return {isLoading, data, error};
}