export default interface CreatedNoteCardsInterface {
    isPublic: boolean;
    notecardsTitle: string;
    notecardsDescription: string;
    notecardsTags: string[];

    notecards: {
        cardKey: number;
        cardTitle: string;
        cardDescription: string;
    }[]
}
