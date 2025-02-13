import {ReactElement, useEffect, useState} from "react";
import NavbarUserProfile from "@/app/compos/navbar/navbar_microComponents/navbar-user-profile";
import NotificationsCenterComponent
    from "@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsCenterComponent";

export default function NotificationUserProfileNavbar(): ReactElement | undefined {


    return <div className={'NavbarPhoneSize'} style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2% 5% 0 5%'

    }}>
        <NavbarUserProfile phoneScreenSize={true} userProfileWidth={35}/>
        <NotificationsCenterComponent usedForPhoneSize={false}/>
    </div>
}