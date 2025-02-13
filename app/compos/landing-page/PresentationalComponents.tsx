import {ReactElement} from "react";
import Image from "next/image";
import './landingPageStyling.css'

import BooksIcon from '@/public/icons/book-open-line.svg'
import GroupIcon from '@/public/icons/group-3-fill.svg'

export default function PresentationalComponents(): ReactElement<any> {
    return <div className="PC_Container">
        <div className="importNotesContainer">

            <span>
                <Image src={BooksIcon} alt={'share_your_notes'}/>
                Bring your knowledge from everywhere
            </span>

            <p>
                Create Notecards and add knowledge so that you can share what you've read with the others. Reanotes
                imports your notes from your Kindle, Kobo, X and Notion. Reanotes share your notes optionally.
            </p>
        </div>
        <div className="shareNotesContainer">

            <span>
                <Image src={GroupIcon} alt={'share_your_notes'}/>
                Share your notecards with people
            </span>
            <p>
                Share your notecards with others and discover a world of knowledge. Whether you're revising your
                notes or just looking to expand your horizons, Reanotes makes it easy to connect
                and learn together. Start sharing today and see how collective wisdom can elevate your learning
                experience
            </p>
        </div>
    </div>
}