import {ChangeEvent, ReactElement, useRef} from "react";
import Image from "next/image";
import '../../profile/[userProfile]/userProfilePageStyling.css'

import ReanotesIcon from "@/favicon.png";
import useWarningNotification from "@/app/compos/modals/warningNotificationModal/WarningNotification";

export default function UploadUserProfileImg(): ReactElement<any> {
    const {toggleElementActivation, warningContext} = useWarningNotification({typeOfWarning: 'error'});
    const inputRef = useRef<HTMLInputElement>(null);

    const handleProfileChange = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const handleUploadedProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files?.[0]
        const maxSizeInBytes: number = 2 * 1024 * 1024 // maxSizeInBytes is 10MB

        if (img && img.size > maxSizeInBytes) {
            event.target.value = ''
            toggleElementActivation(true)
        }
    }

    return <div className="userProfileImg_uploadImg">
        <Image src={ReanotesIcon} alt="userProfile" width={130} onClick={handleProfileChange}/>


        <div className="importUserProfileImg">
            <input style={{display: 'none'}}
                   type="file"
                   accept={'image/png' || 'image/jpeg'}
                   ref={inputRef}
                   onChange={handleUploadedProfileImg}
            />
        </div>
        {warningContext('Image must be under 10MB')}
    </div>
}