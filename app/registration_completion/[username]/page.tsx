'use client'
import {ReactElement, useState} from "react";
import './registrationCompletionPageStyling.css';
import {TextEffect} from "@/animationStyling/TextEffect";
import SuggestedUserComponent from "@/app/compos/suggested-users-component/SuggestedUserComponent";
import {useRouter} from "nextjs-toploader/app";

export default function NewRegisteredUsernamePage(): ReactElement<any> {
    // State to handle showing more genres
    const [showMoreGenres, setShowMoreGenres] = useState<boolean>(false);
    const [registrationCompletionStage, setRegiCompletionStage] =
        useState<"interest" | 'notesToUpload' | 'suggestedPeopleToFollow'>('interest');

    const router = useRouter()

    // Function to toggle more genres visibility
    const handleShowMoreGenres = () => {
        setShowMoreGenres(!showMoreGenres);
    };

    // Function to handle registration stage changes
    const handleRegiStageChange = (): void => {
        if (registrationCompletionStage === 'interest') {
            setRegiCompletionStage('notesToUpload');
        } else if (registrationCompletionStage === 'notesToUpload') {
            setRegiCompletionStage('suggestedPeopleToFollow');
        } else {
            // Navigate to the homepage when 'suggestedPeopleToFollow' stage is completed
            router.push('/home/unspecified');  // Programmatically navigate to the homepage
        }
    };

    // Suggested people array for mapping
    const suggestedPeople = [
        { username: 'Jadtales', userCardsQuantity: 42, userGenresInterest: ['Fiction', 'History', 'Psychology'] },
        { username: 'BookLover21', userCardsQuantity: 37, userGenresInterest: ['Romance', 'Investments', 'Adventure'] },
        { username: 'LiteraryGem', userCardsQuantity: 50, userGenresInterest: ['Philosophy', 'Science', 'Politics'] },
        // Add more if needed
    ];

    return (
            <div className="pageContainer">
                <h1 className={"interestQuestions"}>
                    {registrationCompletionStage === 'interest' ? (
                        <TextEffect>What genres are you mostly interested in?</TextEffect>
                    ) : registrationCompletionStage === 'notesToUpload' ? (
                        <TextEffect>Would you like to upload your Kindle notes?</TextEffect>
                    ) : (
                        <TextEffect>Suggested people you may like to follow.</TextEffect>
                    )}
                </h1>

                {registrationCompletionStage === 'interest' ? (
                    <div className="options">
                        <ul>
                            <li><TextEffect>Fiction</TextEffect></li>
                            <li><TextEffect>Politics</TextEffect></li>
                            <li><TextEffect>Philosophy</TextEffect></li>
                            <li><TextEffect>History</TextEffect></li>
                            {/* Toggle the visibility of additional genres */}
                            {showMoreGenres && (
                                <>
                                    <li><TextEffect>Non-fiction</TextEffect></li>
                                    <li><TextEffect>Fantasy</TextEffect></li>
                                    <li><TextEffect>Science Fiction</TextEffect></li>
                                    <li><TextEffect>Romance</TextEffect></li>
                                    <li><TextEffect>Mystery</TextEffect></li>
                                    <li><TextEffect>Thriller</TextEffect></li>
                                    <li><TextEffect>Biography</TextEffect></li>
                                    <li><TextEffect>Self-help</TextEffect></li>
                                    <li><TextEffect>Psychology</TextEffect></li>
                                    <li><TextEffect>Technology</TextEffect></li>
                                    <li><TextEffect>Adventure</TextEffect></li>
                                    <li><TextEffect>Poetry</TextEffect></li>
                                    <li><TextEffect>Religion</TextEffect></li>
                                    <li><TextEffect>Science</TextEffect></li>
                                    <li><TextEffect>Economics</TextEffect></li>
                                    <li><TextEffect>Art</TextEffect></li>
                                    <li><TextEffect>Music</TextEffect></li>
                                    <li><TextEffect>Autobiography</TextEffect></li>
                                    <li><TextEffect>Health</TextEffect></li>
                                    <li><TextEffect>Travel</TextEffect></li>
                                </>
                            )}
                            <li onClick={handleShowMoreGenres} className="showMore">
                                <TextEffect>{showMoreGenres ? "Show less" : "..."}</TextEffect>
                            </li>
                        </ul>
                    </div>
                ) : registrationCompletionStage === 'notesToUpload' ? (
                    <div className="uploadKindleNotesStage">
                        <button className="uploadKindleNotesButton">
                            <TextEffect>Upload your notes</TextEffect>
                        </button>
                    </div>
                ) : (
                    <div className="peopleToFollowStage">
                        <h2>You might like</h2>
                        <div className="suggestedPeople">
                            {suggestedPeople.map(person => (
                                <SuggestedUserComponent
                                    key={person.username}
                                    username={person.username}
                                    userCardsQuantity={person.userCardsQuantity}
                                    userGenresInterest={person.userGenresInterest}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <button className={"skipButton"} onClick={handleRegiStageChange}>
                    <TextEffect>Skip</TextEffect>
                </button>
            </div>
    );
}
