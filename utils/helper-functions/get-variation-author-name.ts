export function getAuthorNameVariation(author: string): string[] {

    const cleanedAuthor = author.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '');

    const parts = cleanedAuthor.split(" ");
    const variations: string[] = [author, cleanedAuthor];

    if (parts.length > 1) {
        // Swap first and last names
        variations.push(`${parts[parts.length - 1]} ${parts[0]}`);

        // Use initials
        variations.push(`${parts[0][0]}. ${parts[parts.length - 1]}`);
    }

    return variations;
}