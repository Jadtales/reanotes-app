import React, {ReactElement, useEffect, useState} from "react";
import './filterCompoStyling.css';

// imported interfaces
import {FilterNotecardsInterface} from "@/utils/interfaces/filter-notecards-interface";
import {
    GenresEnum,
    NotecardLearningProcessEnum,
    NotecardSourceEnum,
    NotecardViewedDateEnum
} from "@/utils/enums/front-notecard-enums";

export default function FilterNotecardsComponent(): ReactElement<any> {

    // State to track multiple active spans
    const [activeFilters, setActiveFilters] = useState<FilterNotecardsInterface>({
        genres: [],
        content_source_filter: [],
        learning_process_filter: [],
        timing_viewed_filter: []
    });

    const toggleFilter = (filterArray: string[], item: string): string[] => {
        return filterArray.includes(item)
            ? filterArray.filter((active) => active !== item) // Remove if already active
            : [...filterArray, item]; // Add if not active
    };

    // Function to toggle span activation
    const handleIsFilterOptionActive = (spanText: string, typeOfFilter: string): void => {
        setActiveFilters((prevFilters: FilterNotecardsInterface) => {
            let updatedFilters: any = {...prevFilters};

            switch (typeOfFilter) {
                case 'genre':
                    updatedFilters.genres = toggleFilter(prevFilters.genres, spanText);
                    break;
                case 'learningStatus':
                    updatedFilters.learning_process_filter = toggleFilter(prevFilters.learning_process_filter, spanText);
                    break;
                case 'viewedTiming':
                    updatedFilters.timing_viewed_filter = toggleFilter(prevFilters.timing_viewed_filter, spanText);
                    break;
                case 'contentSource':
                    updatedFilters.content_source_filter = toggleFilter(prevFilters.content_source_filter, spanText);
                    break;
                default:
                    break;
            }

            return updatedFilters;
        });


    };

    // Load filters from localStorage on first render
    useEffect(() => {
        const storedFilters = localStorage.getItem("notecards_filters");
        if (storedFilters) {
            const parsedFilters = JSON.parse(storedFilters);
            setActiveFilters((prevState) => ({...prevState, ...parsedFilters}));
        }
    }, []);

    // Save filters to localStorage with debouncing
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("notecards_filters", JSON.stringify(activeFilters));
        }, 300); // Debounce localStorage updates
        return () => clearTimeout(timeout);
    }, [activeFilters]);

    return <div className="filtering-section">

        <div className="filter-books">
            <h2>Filter Books</h2>

            <div className="filter-books-options">
                <div className="basedOnGenre">
                    {Object.values(GenresEnum).map((genre) => (
                        <span
                            key={genre}
                            className={activeFilters.genres.includes(genre) ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive(genre, 'genre')}
                        >
                            {genre}
                          </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="filter-notes">
            <h2>Filter Learning Process</h2>

            <div className="filter-notes-options">
                <div className="completionStatus">
                    {Object.values(NotecardLearningProcessEnum).map((status) => (
                        <span
                            key={status}
                            className={activeFilters.learning_process_filter.includes(status) ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive(status, 'learningStatus')}
                        >
                                {status}
                            </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="filter-timing">
            <h2>Filter Timing</h2>

            <div className="lastAccessedStatus">
                {Object.values(NotecardViewedDateEnum).map((timing) => (
                    <span
                        key={timing}
                        className={activeFilters.timing_viewed_filter.includes(timing) ? 'span-active' : ''}
                        onClick={() => handleIsFilterOptionActive(timing, 'viewedTiming')}
                    >
                            {timing}
                        </span>
                ))}
            </div>
        </div>

        <div className="filter-typeOfContent">
            <h2>Filter Content</h2>

            <div className="filter-typeOfContent-options">
                {Object.values(NotecardSourceEnum).map((content) => (
                    <span
                        key={content}
                        className={activeFilters.content_source_filter.includes(content) ? 'span-active' : ''}
                        onClick={() => handleIsFilterOptionActive(content, 'contentSource')}
                    >
                            {content}
                        </span>
                ))}
            </div>
        </div>
    </div>
}
