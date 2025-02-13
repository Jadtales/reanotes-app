import React, {ReactElement} from "react";
import Link from "next/link";
import '../home-page-widgets-styling.css'

interface componentProps {
    NoteCardTitle: string;
    lastTimeVisited: number;
    toNoteCardLink: string;
}

export default function RecentVisitedNotecards({
                                              NoteCardTitle,
                                              lastTimeVisited,
                                              toNoteCardLink
                                          }: componentProps): ReactElement {


    return <div id={'recentViewedNoteCardContainer'}>
        <div className="title_visitedDuration">
            <h4>{NoteCardTitle}</h4>
            <span>Reviewed {lastTimeVisited} days ago</span>
        </div>

        <Link href={`/${toNoteCardLink}`}>Resume</Link>
    </div>
}