'use client'

import {ReactElement, useState} from "react";

interface SharedContent {
    whoShared: string;
    sharedContent: string;
}

export default function SharedContentPage(): ReactElement {
    const [content, setContent] = useState<SharedContent | undefined>({
        whoShared: 'Jadtales',
        sharedContent: '',
    });


    const capitalizedUserName: string | undefined = ''.concat(content?.whoShared.at(0)?.toUpperCase()!, content?.whoShared.slice(1)!);

    return <div className={'sharedURLContainer'} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        margin: '0 30%',
        backgroundColor: 'var(--darkThemeBody-darkerGray_black)'
    }}>
        <div className="sharedContent" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <a href={`http//reanotes.io/profile/${content?.whoShared}`} style={{
                color: 'var(--textColor_gray_dark)'
            }}>Shared by {capitalizedUserName}</a>

            <p style={{
                fontWeight: 'lighter',
                letterSpacing: '1px',
                color: 'var(--textColor_gray_dark)'
            }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis, tempora. Animi corporis
                delectus explicabo neque nostrum. Alias architecto atque cum enim illum mollitia necessitatibus quas,
                quis, rem tenetur, unde.</p>
        </div>
    </div>
}