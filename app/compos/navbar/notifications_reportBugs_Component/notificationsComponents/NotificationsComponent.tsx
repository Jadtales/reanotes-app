import {ReactElement} from "react";
import '../notificationsComponentStyling.css'
import Link from "next/link";

interface INotification {
    username: string;
    purpose: "Updated" | "Posted";
    targetChange: string;
}

export default function NotificationsComponent({username, purpose, targetChange}: INotification): ReactElement<any> {
    return (
        <div className="notificationsComponent">
            <h1 id="NotifierUsername">@{username}</h1>

            <div className="whatChanged">
                <Link href={"/browse"} className="actionOfChange">{purpose} {targetChange} Note.</Link>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ducimus ea eos, et eveniet fuga hic id
                in ipsa laborum magnam mollitia non numquam perferendis possimus praesentium reprehenderit sed vero.
            </div>
        </div>
    )
}