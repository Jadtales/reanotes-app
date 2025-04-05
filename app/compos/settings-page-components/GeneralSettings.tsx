import {ChangeEvent, ReactElement, useContext, useState} from "react";
import {themeContext} from "@/app/wide-state-management/AppThemeContext";

export default function GeneralSettingPageComponents(): ReactElement<any> {
    const [selectedSettings, setSelectedSettings] = useState<string[]>([])

    const {themeMode, setThemeMode} = useContext(themeContext)

    // set user theme preference
    const handleUserThemePrefrence = (event: ChangeEvent<HTMLSelectElement>): void => {
        setThemeMode(event.target.value);
    }

    const handleIsFilterOptionActive = (spanText: string): void => {
        if (selectedSettings.includes(spanText)) {
            // If span is already active, remove it from the active list
            setSelectedSettings(selectedSettings.filter(active => active !== spanText));
        } else {
            // If span is not active, add it to the active list
            setSelectedSettings([...selectedSettings, spanText]);
        }
    };

    return (
        (<div className="settingsAdjustments-generalSettings">
            <div className="notificationsAdjustments">
                <h3>Notifications</h3>
                <ul>
                    {['To new events.', 'To review my highlights.'].map((option: string) => (
                        <li key={option}
                            className={selectedSettings.includes(option) ? 'li-active' : ''}
                            onClick={() => handleIsFilterOptionActive(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="appearanceAdjustments">
                <h3>Appearance</h3>
                <select name="theme"
                        id="themeAppearance"
                        value={themeMode}
                        onChange={handleUserThemePrefrence}>
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div className="languageAdjustment">
                <h3>Language</h3>
                <select name="language"
                        id="languagesSelection">
                    <option value="English">English</option>
                    <option value="Polish">Polish</option>
                </select>
            </div>

            <div className="languageAdjustment">
                <h3>Nav Bar</h3>
                <select name="language"
                        id="languagesSelection">
                    <option value="English">Horizontal (at the top)</option>
                    <option value="Polish">Vertical (on the left)</option>
                </select>
            </div>
        </div>)
    )
}