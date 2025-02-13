import {Fragment, ReactElement, useRef, useState} from "react";
import Image from "next/image";
import {v4 as uuidv4} from "uuid";

import './shareModalStyling.css'

import ShareContentIcon from "@/public/icons/shareContent.svg";
import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';
import CopyURLIcon from '@/public/icons/copyUrlLink.svg'

// social icons
import TwitterIcon from '@/public/icons/socialsIcons/twitter-x-line.svg'
import InstagramIcon from '@/public/icons/socialsIcons/instagram-line.svg'
import ReanotesIcon from '@/favicon.png'

// images to be shared with the shared stats
import {usePathname, useRouter} from "next/navigation";


interface ShareStatsProps {
    statsPeriod?: string;
    whoShared: string;
    sharedTypeOfContent: string;
    sharedContent: string;

    book_credentials?: {
        book_title_author: string;
    }
}

export default function ShareStatsModal({
                                            statsPeriod,
                                            whoShared,
                                            sharedTypeOfContent,
                                            sharedContent,
                                            book_credentials
                                        }: ShareStatsProps
):
    ReactElement<any> {

    const [isURLCopied, setIsURLCopied] = useState<boolean>(false);

    const shareModalDialogRef = useRef<HTMLDialogElement | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    const handleDialogOpening = (): void => {
        const shareModalDialog = shareModalDialogRef.current as HTMLDialogElement;

        if (!shareModalDialog.open) {
            shareModalDialog.showModal();
        } else {
            shareModalDialog.close();
        }
    }

    // copy shared content URL
    const sharedContentLink: string = `localhost:3001/shared-content?user=${whoShared}&content-id=${uuidv4()}`;

    const handleURLCopying = (): void => {
        navigator.clipboard.writeText(sharedContentLink)
            .then(() => setIsURLCopied(true))
            .catch(() => setIsURLCopied(false));

        setTimeout(() => {
            setIsURLCopied(false)
        }, 1000)
    }


    return <Fragment>
        <button className={'shareButtonIcon'}>
            <Image src={ShareContentIcon} alt={"shareThisStat"} id="shareStatsContentIcon"
                   onClick={handleDialogOpening}/>
        </button>

        <dialog className="shareModalDialog" ref={shareModalDialogRef}>
            <div className="shareModalContainer">

                <div className="shareIcon_shareModalClosingIcon">
                    <Image src={ShareContentIcon} alt="shareModalIcon"/>

                    <Image src={ClosingIcon} className={'closeModalIcon'} alt="closeShareModalIcon"
                           onClick={handleDialogOpening}/>
                </div>

                <div className="contentToBeShared">

                    <div className="sharedContentContainer">
                        <span className="statsPeriod">{statsPeriod}</span>
                        {pathname.startsWith('/stats') && <span className="typeOfSharedContent">
                            <div>
                            {sharedTypeOfContent}
                            </div>
                            -
                            <div>
                                {sharedContent}
                            </div>
                        </span>}


                        {!pathname.startsWith('/stats') && <div className="sharedContent">
                            {sharedContent}
                        </div>}
                        {/*For Notecards content sharing only*/}
                        {<div className="cites">
                            <cite>Noted by {whoShared.at(0)?.toUpperCase() + whoShared.slice(1)}</cite>
                            {!pathname.startsWith('/stats') && <cite>-{book_credentials?.book_title_author}</cite>}
                            </div>}
                        </div>

                            </div>

                            <hr style={{margin: '1% 0'}}/>
                    <div className="copyLinkContainer">
                        {/*TODO: start working on social media content sharing*/}
                        {/*<div className="socialLinks_headlight">*/}
                        {/*    <h1>Stat Link</h1>*/}
                        {/*    <div className="shareOnSocials">*/}
                        {/*        <Image src={InstagramIcon} alt="insagram"/>*/}
                        {/*        <Image src={TwitterIcon} alt="twitter"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="copyLink" onClick={handleURLCopying}>
                            <p className={'linkToBeShared'}>{isURLCopied ? 'Copied' : `${sharedContentLink}`}</p>
                            <Image src={CopyURLIcon} alt="copyLink"/>
                        </div>
                    </div>
                </div>
        </dialog>
    </Fragment>


}