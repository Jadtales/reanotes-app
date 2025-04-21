'use client'
import {ReactElement} from "react";
import {useMediaQuery} from "react-responsive";
import './statsPageStyling.css'


import FrontDesignNoteBrowse from "@/app/compos/suggested-front-design-notecard/FrontDesignNote-browse";
import ShareStatsModal from "@/app/compos/modals/share-stats-modal/ShareStatsModal";
import OverviewStats from "@/app/compos/stats-components/OverviewStats";
import GoBackToComponent from "@/app/compos/go-back-to-component/GoBackTo-Component";

const test = {
    bookCover: OverviewStats
}
export default function StatsPage(): ReactElement<any> {

    const isInPhoneSize = useMediaQuery({query: '(width <= 700px)'});

    return (
        <div className="statsPageContainer">
            {isInPhoneSize && <GoBackToComponent withText={true} margin={'0 0'} iconSize={'25px'}/>}
            <div className="userOverviewStats">
                <h2>Basic reading metrics</h2>
                <div className="statsResult">
                    <OverviewStats typeOfStatsContent={'Books read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Pages read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Reviewed cards'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Readnotes Ranking'} statsResult={99}/>
                    <OverviewStats typeOfStatsContent={'Average Rating'} statsResult={99}/>
                    <OverviewStats typeOfStatsContent={'Most Viewed Genre'} statsResult={'#Fiction'}/>
                </div>
            </div>

            <div className="dailyReviews">
                <h2>Daily reviews</h2>
                {/*<HeatMapComponent/>*/}
            </div>

            <div className="mostViewedBooks">
                <div className="header">
                    <h2>Most viewed Books/Notecards</h2>

                    <ShareStatsModal whoShared={'Jadtales'}
                                    sharedTypeOfContent={'Most viewed Books/Notecards'}
                                    sharedContent={'e'}/>

                </div>
                <div className="statsResult">
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                        bookAuthor={'Tommy Orange'}
                                        notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                            bookAuthor={'Tommy Orange'}
                                            notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                            bookAuthor={'Tommy Orange'}
                                            notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                            bookAuthor={'Tommy Orange'}
                                            notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                            bookAuthor={'Tommy Orange'}
                                            notedByUsername={'Jadtales'}/>
                </div>
            </div>

        </div>
    )
}