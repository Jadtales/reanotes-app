import {Fragment, ReactElement, useRef} from "react";
import Image from "next/image";
import './advancedSettingsModalStyling.css'


import CloseModalIcon from '@/public/icons/notesIcons/close-line.svg'
import Switcher from "@/app/compos/shadcn-components/Switcher";

interface componentProps {
}

export default function AdvancedSettingsModal({}: componentProps): ReactElement<any> {
    const advancedSettingsDialogRef = useRef<HTMLDialogElement>(null);

    const handleModalOpening = (): void => {
        const shareModalDialog = advancedSettingsDialogRef.current as HTMLDialogElement;

        if (!shareModalDialog.open) {
            shareModalDialog.showModal();
        } else {
            shareModalDialog.close();
        }
    }


    return <Fragment>
        <span onClick={handleModalOpening} className={'advancedSettingsSpan'}>Advanced settings</span>

        <dialog className={'advancedSettingsDialogContainer'} ref={advancedSettingsDialogRef}>
            <div className="header">
                <h1>Review/Learn options</h1>
                <button onClick={handleModalOpening}><Image src={CloseModalIcon} alt={'close-dialog'}/></button>
            </div>

            <div className="optionsSection">
                <div className="settingDateSpecificOption">
                    <h2>To be mastered at a specific date</h2>

                    <div className="settingsSection">
                        <div className="setting-one">
                            <h4>To be mastered at</h4>
                            <input type="date" placeholder={'Pick a date'}/>
                        </div>
                        <div className="setting-two">
                            <h4>View on Reanotes visit</h4>
                            <Switcher/>
                        </div>
                    </div>
                </div>

                <hr/>

                 <div className="settingQuestionTypes">
                    <h2>Question format</h2>

                    <div className="settingsSection">
                        <div className="setting-one">
                            <h4>Answer with Term</h4>
                            <Switcher/>
                        </div>
                        <div className="setting-two">
                            <h4>Answer with Definition</h4>
                            <Switcher/>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="settingLearningOptions">
                    <h2>Learning Options</h2>

                    <div className="settingsSection">
                        <div className="setting-one">
                            <h4>Study/Review starred Notecards only</h4>
                            <Switcher/>
                        </div>
                        <div className="setting-two">
                            <h4>Study/Review un-starred Notecards only</h4>
                            <Switcher/>
                        </div>
                        <div className="setting-three">
                            <h4>Length of rounds</h4>
                            <input type="number" defaultValue={4} max={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </Fragment>
}