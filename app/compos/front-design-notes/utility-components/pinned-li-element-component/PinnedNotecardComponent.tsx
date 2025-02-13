import {Fragment, ReactElement, useState} from "react";
import Image from "next/image";
import PinnedNotecardIcon from "@/public/icons/frontNoteSetting-icons/pushpin-2-fill.svg";

export default function PinnedNotecardComponent(): ReactElement {


    const [isHovered, setHovered] = useState<boolean>(false);

    const hoveredLiInfo = (<p style={{
        fontSize: '10px',
        lineHeight: '10px',
        backgroundColor: 'black',
        padding: '4px',
        borderRadius: '4px',
        color: 'var(--textColor_in_dark_mode)',
        width: 'fit-content',
        border: 'var(--border_tags)',
        outline: 'none',
    }}>
       A Pinned Notecard appears in all folders.
    </p>)

    return <div>
        <li style={{
            backgroundColor: 'black',
            color: '#ceccc5',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            border: 'var(--border_tags)',
        }}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Image src={PinnedNotecardIcon} alt={'pinned-notecard'}
                   style={{filter: 'var(--imgColor_white)', border: 'none'}} width={14}/>
            Pinned
        </li>
        {isHovered && hoveredLiInfo}
    </div>
}