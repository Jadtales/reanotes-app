import {ReactElement, useState} from "react";
import RecentVisitedNotecards from "@/app/compos/welcoming-page-components/recentVisitedNotes/recent-visited-notecards";
import './home-page-widgets-styling.css'
import TodaysChosenNotecard from "@/app/compos/welcoming-page-components/todaysChosenNotecard/TodaysChosenNotecard";

interface WelcomingComponentProps {
    username: string;
}


export default function HomePageWidgets({username}: WelcomingComponentProps): ReactElement<HTMLDivElement> {
    const [fetchedWidgets, setFetchedWidgets] = useState([]);

    const greetingTimeVerb: string = new Date().getHours() >= 12 || new Date().getHours() <= 23 ? 'Evening' : 'Morning';


    // todo: fetch user recent visited notecards

    // setFetchedWidgets(p);

    return <div id={'welcomingCompoContainer'}>
        <h1 className="greeting">{greetingTimeVerb}, <span>{username}!</span></h1>

        <div className="welcomingSectionContainer">
            <div className="recentViewedNotecards">

                {/*{!fetchedWidgets ? (fetchedWidgets.map(test => test)) :*/}
                {/*    <div>No Notecards have been reviewed yet.</div>}*/}


                <RecentVisitedNotecards
                    NoteCardTitle="Learning JavaScript"
                    lastTimeVisited={5}
                    toNoteCardLink="/notecards/learning-javascript"
                />

                <RecentVisitedNotecards
                    NoteCardTitle="Introduction to TypeScript"
                    lastTimeVisited={2}
                    toNoteCardLink="/notecards/intro-to-typescript"
                />

                <RecentVisitedNotecards
                    NoteCardTitle="Advanced NestJS"
                    lastTimeVisited={1}
                    toNoteCardLink="/notecards/advanced-nestjs"
                /><RecentVisitedNotecards
                    NoteCardTitle="Advanced NestJS"
                    lastTimeVisited={1}
                    toNoteCardLink="/notecards/advanced-nestjs"
                /><RecentVisitedNotecards
                    NoteCardTitle="Advanced NestJS"
                    lastTimeVisited={1}
                    toNoteCardLink="/notecards/advanced-nestjs"
                />
            </div>

            <TodaysChosenNotecard creator={'Jadtales'}/>
        </div>
    </div>
}