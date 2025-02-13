'use client'

import {ReactElement, useEffect, useState} from "react";
import './warningNotificationStyling.css'

interface ComponentProps{
    typeOfWarning: 'error' | 'notify';
}

export default function useWarningNotification({typeOfWarning}: ComponentProps): {
    toggleElementActivation: (value: boolean) => void
    warningContext: (errorContext: string) => ReactElement | null
} {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    let timer: number;

    useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer); // Clear timeout if the component unmounts
            }
        };
    }, []);

    const toggleElementActivation = (value: boolean = false) => {

        if (value) {
            setIsExiting(value)

            timer = window.setTimeout(() => {
                setIsActive(true);

                window.setTimeout(() => {
                    window.clearTimeout(timer)
                    setIsActive(false);
                    setIsExiting(false)
                    return
                }, 5000)

            }, 0)
        }
    }

    const warningContext = (errorContext: string): ReactElement<any> | null => {
        if (isExiting) {
            return (
                <div
                    className={
                        isActive ? 'warningNotification-active' : 'warningNotification-inactive'
                    }>
                    Error: {errorContext}
                </div>
            );
        }else {
            window.clearTimeout(timer)
            return null; // Return null when not active
        }
    };


    return {
        toggleElementActivation,
        warningContext
    }
}