import {Notecard_learning_process, Notecard_viewed_date, Notecard_source_type} from "@/utils/types/front-notecard-types";
import {GenresEnum} from "@/utils/enums/front-notecard-enums";

export interface FilterNotecardsInterface {
    lastVisited: number;
    genres: GenresEnum[];
    learning_process_filter: Notecard_learning_process[];
    timing_viewed_filter: Notecard_viewed_date[];
    content_source_filter: Notecard_source_type[];
}