import {ReactElement, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import './user-notecard-styling.css'

import UnknownBookCover from '@/public/icons/no-cover.png'
import AddNoteCardToFolderModal
    from "@/app/compos/user-notecards-component/add-notecard-to-folder-dialog/add-notecard-to-folder-modal";

interface ComponentProps {
    user_credentials: {
        username: string;
        user_purpose: string
    }
}

export default function UserNotecard(): ReactElement<HTMLDivElement> {


    return <div className={'user-notecard-container'}>
        <div className={'user-notecard-section'}>
            <div className="username-purpose">
                <Link href={`user`} id={'username'}>Jadtales</Link>
                <span>wants to read</span>
            </div>

            <div className="notecard_ui">
                <Image src={UnknownBookCover} alt={'notecard'} width={100}/>

                <div className="notecard_credentials">
                    <div className={'booktitle-authorname'}>
                        <h1 className={'bookTitle'}>Alien lives</h1>
                        <span>by Jadtales</span>
                    </div>
                    <AddNoteCardToFolderModal/>
                    <p className={'notecard-description'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores corporis esse expedita explicabo
                        obcaecati perferendis quas, quibusdam repellat sunt! Accusantium adipisci alias eveniet laborum minus
                        quidem reprehenderit repudiandae sit.</p>
                </div>
            </div>
        </div>

        <div className="comment-section">
            <form action="/comment" method={'POST'}>
                <textarea name="write-comment"
                          placeholder={'Write a comment...'}
                          id="text-area-comment"
                          cols={30} rows={2}/>

                <button type={'submit'} className={'submit-comment-button'}>Comment</button>
            </form>
        </div>
    </div>
}