import {ReactElement, useEffect, useState} from "react";
import Switch from "react-switch";
import {AdvancedSettingsInterface} from "@/utils/interfaces/advanced-settings-interfaces/advanced-settings-interfaces";

interface Props {
    notecardId: string;
    action: string;
    onModalClose: boolean;
}

export default function Switcher({notecardId, action, onModalClose}: Props): ReactElement {

    const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettingsInterface>({
        toBeViewedOnReanotesVisit: false,
        answerWithTerm: false
    });

    const [switchToggle, setSwitchToggle] = useState(false);

    // change notecard's settings
    useEffect(() => {
        console.log('modal',onModalClose)
    }, [onModalClose])

    const handleStudyMethod = (state: boolean): void => {
        console.log(action)

        setAdvancedSettings(prevState => ({
            ...prevState,
            answerWithTerm: state
        }))

    }

    // const handleSwitchToggling = (): void => {
    //     setSwitchToggle(!switchToggle);
    // }

    const handleNotecardStudyOnVisit = (): void => {

        setAdvancedSettings(prevState => ({
            ...prevState,
            toBeViewedOnReanotesVisit: !advancedSettings?.toBeViewedOnReanotesVisit
        }))

        console.log(advancedSettings?.toBeViewedOnReanotesVisit)
    }

    return (<Switch
        onChange={handleStudyMethod}
        onClick={handleNotecardStudyOnVisit}
        checked={advancedSettings.answerWithTerm!}
        checkedIcon={false}
        uncheckedIcon={false}
        offColor={'#00000'}
        onColor={'#ae5630'}
    />)

}