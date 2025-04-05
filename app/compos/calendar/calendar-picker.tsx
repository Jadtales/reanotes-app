import {Dispatch, SetStateAction, useEffect, useState} from "react";
import './day-picker-styling.css'
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import {AdvancedSettingsInterface} from "@/utils/interfaces/advanced-settings-interfaces/advanced-settings-interfaces";

interface Props {
    getDate: (date: Dispatch<SetStateAction<AdvancedSettingsInterface>>) => void;
}

export function CalendarPicker({getDate}: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isDatePickerShown, setIsDatePickerShown] = useState(false);

    const currentDate = new Date();

    useEffect(() => {
        getDate(prevState => ({
            ...prevState,
            toBeMasteredDate: selectedDate
        }));
    }, [selectedDate])

    return (

        <>
            <div style={{
                position: 'relative'
            }}>
                <div style={{
                    border: '1px solid black',
                    padding: '5px 10px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '13px'
                }} onClick={() => setIsDatePickerShown(!isDatePickerShown)}>
                    {selectedDate ? selectedDate.toLocaleDateString() : currentDate.toLocaleDateString()}
                </div>

                {isDatePickerShown && <DayPicker
                    onDayClick={() => setIsDatePickerShown(!isDatePickerShown)}
                    style={{
                        backgroundColor: 'var(--darkThemeBody)',
                        padding: '10px',
                        borderRadius: 10,
                        border: 'var(--border_tags)',
                        position: 'absolute',
                        right: 0,
                        zIndex: 99,
                        top: 30,
                    }}
                    classNames={{
                        disabled: 'navButtons',
                        selected: 'selectedDayColor',
                        chevron: 'calendarNavButtons',
                        today: 'todayDay',
                    }}
                    animate
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}

                />}
            </div>

        </>
    );
}