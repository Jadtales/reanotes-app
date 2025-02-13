import {NotecardLearningProcessEnum} from "@/utils/enums/front-notecard-enums";

export default interface NoteCardLearnInterface{

    due_notecards: string[]; // Array of IDs for due flashcards

    viewed_notecards: {id: string}[];

    new_notecards: {
        id: string;
        term: string;
        definition: string;
    }[];

    notecards: {
        id: string;
        term: string; // Front of the flashcard
        definition: string; // Back of the flashcard
        learning_process: NotecardLearningProcessEnum;
        difficulty?: DifficultyLevel;
    }[];
}

enum DifficultyLevel{
    Forgotten= 'Forgotten',
    Unclear = 'Unclear',
    Good = 'Good',
    Perfect = 'Perfect',
}