import {ChangeEvent, ReactElement, useState} from "react";
import './notificationsComponentStyling.css'
import useWarningNotification from "@/app/compos/modals/warningNotificationModal/WarningNotification";

const priorityButtons: string[] = ['Basic', 'Important', 'Urgent'];

export default function ReportBugsComponent(): ReactElement<any> {
    const [activePriority, setActivePriority] = useState<string>('');

    const {warningContext, toggleElementActivation} = useWarningNotification({typeOfWarning: 'error'})
    const [warningDescription, setWarningDescription] = useState<string>('')

    const [report, setReport] = useState<{
        priority: string;
        descriptionIssue: string;
    }>({priority: '', descriptionIssue: ''});

    //
    // const chosenPriorityOption = (): void => {
    //
    // }


    const handlePriority = (priority: string): void => {
        setReport((prevState) => ({
            ...prevState,
            priority: priority
        }));
    }

    const handleReport = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        if (event.target.value.length >= 0 && event.target.value) {
            setReport(prevState =>
                ({...prevState, descriptionIssue: event.target.value})
            );
        }
    }

    const handleBugReportSubmission = (event: MouseEvent): void => {
        event.preventDefault();

        if (report?.priority === '') {
            setWarningDescription('Choose a priority to the issue');
            toggleElementActivation(true)
            return;
        }

        if (report?.descriptionIssue === '') {
            setWarningDescription('Your description issue is required.');
            toggleElementActivation(true)
            return;
        }

        if (report?.descriptionIssue.length <= 100) {
            setWarningDescription('Description is short.');
            toggleElementActivation(true)
            return;
        }

    }

    return (
        <div className="reportBugsContainer">
            <h1>Issue priority</h1>
            <div className="issuePriority">
                {priorityButtons.map((button, index) => {
                    return <button key={index}
                                   className={report?.priority === button ? 'active-button' : undefined}
                                   onClick={() => handlePriority(button)}>{button}</button>
                })}
            </div>

            <h1>Issue description</h1>
            <form id="formElement" onSubmit={handleBugReportSubmission}>
                <textarea name="textarea"
                          onChange={handleReport}
                          id="issueDescription"
                          cols={30}
                          rows={30}
                          defaultValue={'Write your issue description'}></textarea>
                <button type="submit">Submit</button>
            </form>

            {warningContext(warningDescription)}
        </div>
    )
}