import {ReactElement, useState} from "react";
import Image from "next/image";
import './suggestedUserComponentStyling.css'

import ReanotesIcon from '@/favicon.png'
import {TextEffect} from "@/animationStyling/TextEffect";

interface SuggestedUserComponentProps {
    username: string;
    userCardsQuantity: number;
    userGenresInterest: string[];
}

export default function SuggestedUserComponent({
                                                   username,
                                                   userCardsQuantity,
                                                   userGenresInterest
                                               }: SuggestedUserComponentProps): ReactElement<any> {
    const [isUserFollowed, setIsUserFollowed] = useState<boolean>(false);

    return (
        <div className="suggestedUser">
            <div className="container">
                <div className="userImg_username">
                    <Image src={ReanotesIcon} alt="user" width={30}/>
                    <div className="username_cardQuantity">
                        <h2>{username.at(0).toUpperCase() + username.slice(1)}</h2>
                        <span className="cardsQuantity">Has made {userCardsQuantity} cards.</span>
                    </div>
                </div>

                <div className="userAchievements">
                    <span className="userGenres">
                    {userGenresInterest.map((genre) => (
                        <li><TextEffect>{genre}</TextEffect></li>
                    ))}
                        <li><TextEffect>...</TextEffect></li>
                </span>
                </div>
            </div>
            <button id={isUserFollowed ? 'userFollowedButton' : 'followUserButton'}
                    onClick={() => setIsUserFollowed(!isUserFollowed)}>{isUserFollowed ?
                <span><TextEffect>Followed</TextEffect></span> : <span><TextEffect>Follow</TextEffect></span>}</button>
        </div>
    )
}