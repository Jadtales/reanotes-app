import {ReactElement, useState} from "react";
import Switch from "react-switch";

export default function Switcher(): ReactElement {
    const [switchToggle, setSwitchToggle] = useState(false);

    const handleSwitchToggling = (): void => {
        setSwitchToggle(!switchToggle);
    }
    const switcher = (<Switch onChange={handleSwitchToggling} checked={switchToggle} offColor={'#b8b7b2'}
                              onColor={'00000'} checkedIcon={false} uncheckedIcon={false}/>)

    return switcher
}