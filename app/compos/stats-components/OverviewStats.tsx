'use client'

import {ReactElement, useState} from "react";
import Image from "next/image";
import './statsComponentsStyling.css'

import LeftToIcon from '@/public/icons/leftTo.svg'
import RightToIcon from '@/public/icons/rightTo.svg'
import ShareStatsModal from "@/app/compos/modals/share-stats-modal/ShareStatsModal";

type PeriodStatType = 'weekly' | 'monthly' | 'yearly';
const periodStatsArray: PeriodStatType[] = ['weekly', 'monthly', 'yearly'];

interface overviewStatsProps_interface {
    typeOfStatsContent: string;
    statsResult: number | string;
}

export default function OverviewStats({typeOfStatsContent, statsResult}: overviewStatsProps_interface): ReactElement<any> {
    const [isStatAvailable, setIsStatAvailable] = useState<boolean>(true)
    const [periodStat, setPeriodStat] = useState<PeriodStatType>(periodStatsArray[0]);

    // Helper function to switch between period stats based on the index
    const handlePeriodSwitch = () => {
        const currentIndex = periodStatsArray.indexOf(periodStat);
        const nextIndex = (currentIndex + 1) % periodStatsArray.length; // Cycle back to 0 when reaching the end
        setPeriodStat(periodStatsArray[nextIndex]);
    };


    return <div className="simpleOverviewLayer">

        <div className="periodSwitch_shareButton">
            <div className="statsPeriodSwitching">
                <span className="backTo" onClick={handlePeriodSwitch}><Image src={LeftToIcon} alt="goBackTo"/></span>
                <button className="periodSwitch" onClick={handlePeriodSwitch}>
                    {periodStat}
                </button>
                <span className="forwardTo" onClick={handlePeriodSwitch}><Image src={RightToIcon} alt="goForwardsTo"/></span>
            </div>
            <ShareStatsModal statsPeriod={periodStat}
                             sharedContent={`${statsResult}`}
                             sharedTypeOfContent={typeOfStatsContent}
                             whoShared={"jadtales"}/>
        </div>

        {isStatAvailable ? <div className="typeOfStat_statResult">
            {typeOfStatsContent}: <span className="booksRead">{statsResult}</span>
        </div> : 'Stats are not available'}
    </div>
}