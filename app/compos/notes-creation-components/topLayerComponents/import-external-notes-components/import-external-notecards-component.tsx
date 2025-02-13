import {ReactElement} from "react";
import '../../notesCreationCompoStyling.css'
import Twitter_X_Icon from '@/public/icons/twitter-x-line.svg'
import ReadwiseIcon from '@/public/icons/readwise icon.png'
import KoboIcon from '@/public/icons/socialsIcons/kobo-icon.svg'
import NotionIcon from '@/public/icons/socialsIcons/notion-icon.svg'
import Image from "next/image";
import KindleHighlightsImportModal
    from "@/app/compos/modals/kindle-highlights-import-modal/kindle-highlights-import-modal";
import UnavailableFeatureComponent
    from "@/app/compos/utility-components/unavailable-feature-component/UnavailableFeature";

export default function ImportExternal_NotecardComponents(): ReactElement<any> {


    return <div className="notesCreationFromExternalSources-layer">
        <h1>Import from</h1>

        <div className="importButtons">
            <KindleHighlightsImportModal/>

            <UnavailableFeatureComponent child={<button>
                <Image src={KoboIcon} width={33} height={33} alt="Kobo"/>Kobo
            </button>}/>
            <UnavailableFeatureComponent
                child={<button><Image src={ReadwiseIcon} width={20} alt="twitter"/> Readwise</button>}/>
            <UnavailableFeatureComponent
                child={<button><Image src={Twitter_X_Icon} width={20} alt="twitter"/> X</button>}/>
            <UnavailableFeatureComponent
                child={<button><Image src={NotionIcon} width={25} alt="twitter"/> Notion</button>}/>
        </div>
    </div>
}