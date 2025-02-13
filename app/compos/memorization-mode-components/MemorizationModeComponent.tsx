import {ReactElement} from "react";
import Image from "next/image";

import GoBackToComponent from "@/app/compos/go-back-to-component/GoBackTo-Component";

import ReviewNoteCardsModeIcon from '@/public/icons/reviewNotecardsMode.svg'


export default function MemorizationModeComponent(): ReactElement{
    return (
        <div className={'MemorizationModeContainer'}>
            <div className="memorizationInterface">
                <div className="go-back-to back-to-review-mode">
                    <GoBackToComponent withText={false} iconSize={'20px'}/>
                    <Image src={ReviewNoteCardsModeIcon} alt={'back-to-review-mode'}/>
                </div>

                <div className="notecard-container">
                    <div className="progress">
                        <div className="due-progress">Due: 4</div>
                        <div className="new-notecards-progress">Due: 4</div>
                    </div>

                    <div className="notecards">

                    </div>
                </div>

            </div>
        </div>
    )
}