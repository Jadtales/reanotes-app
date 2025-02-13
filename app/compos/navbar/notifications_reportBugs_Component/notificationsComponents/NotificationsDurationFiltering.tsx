import NotificationsComponent
    from "@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsComponent";
import React, {Fragment, useState} from "react";

interface Notification {
    username: string;
    purpose: 'Updated' | 'Posted';
    targetChange: string;
    dateOfReceiving?: Date;
}

interface ComponentProps {
    NotificationsData: Notification[];
}

export default function NotificationsDurationFiltering({NotificationsData}: ComponentProps) {
    const [filterDuration, setFilterDuration] = useState<string>("");
    const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(NotificationsData);

    // Function to filter notifications based on the selected duration
    const filterNotifications = (duration: string) => {
        const now = new Date();
        let filtered: Notification[] = [];

        if(filterDuration === duration){
            setFilteredNotifications(NotificationsData)
            setFilterDuration('')
        }

        if (duration === "Today") {
            filtered = NotificationsData.filter(
                notification =>
                    notification.dateOfReceiving &&
                    notification.dateOfReceiving.toDateString() === now.toDateString()
            );
        } else if (duration === "Last week") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            filtered = NotificationsData.filter(
                notification =>
                    notification.dateOfReceiving &&
                    notification.dateOfReceiving >= oneWeekAgo &&
                    notification.dateOfReceiving < now
            );
        } else if (duration === "Last two weeks") {
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(now.getDate() - 14);
            filtered = NotificationsData.filter(
                notification =>
                    notification.dateOfReceiving &&
                    notification.dateOfReceiving >= twoWeeksAgo &&
                    notification.dateOfReceiving < now
            );
        }

        setFilteredNotifications(filtered);
        setFilterDuration(duration);
    };

    return (
        <Fragment>
            <div className="duration">
                <button onClick={() => filterNotifications("Today")}
                        className={filterDuration === 'Today' ? 'active-duration' : undefined}>Today
                </button>
                <button onClick={() => filterNotifications("Last week")}
                        className={filterDuration === 'Last week' ? 'active-duration' : undefined}>Last week</button>
                <button onClick={() => filterNotifications("Last two weeks")}
                        className={filterDuration === 'Last two weeks' ? 'active-duration' : undefined}>Last two weeks</button>
            </div>

            <div className="receivedNotifications-inactive">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification, index) => (
                        <NotificationsComponent
                            key={index} // It's better to use a unique key if possible
                            username={notification.username}
                            purpose={notification.purpose}
                            targetChange={notification.targetChange}
                        />
                    ))
                ) : (
                    <p className="emptyNotificationsWarning">
                        No notification have been received yet
                    </p>
                )}
            </div>
        </Fragment>
    );
}
