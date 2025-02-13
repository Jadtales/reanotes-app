import {ReactElement} from "react";

interface ComponentProps{

}

export default function SharedHighlightsType(
//
): ReactElement<HTMLDivElement>{
    return <div>
        <div className="sharedContent">
            {pathname.startsWith('/stats') && statsPeriod}
            {sharedContent}
        </div>
        {/*For Notecarsd content sharing only*/}
        {!pathname.startsWith('/stats') && <div className="cites">
            <cite>Noted by {whoShared}</cite>
            <cite>-There, there by Tommy Orange</cite>
        </div>}
    </div>
}