'use client'

import {ReactElement} from "react";
import './landingPageStyling.css'
import {useRouter} from "next/navigation";

export default function LandingPageNavbar(): ReactElement<any> {
    const router = useRouter();
    const handleRegistrationRouting = (): void => {
        router.push('registration')
    }
    return <nav className={'landingPageNavBar'}>
        <button className="importHighlightsButton">
            Import Kindle Clippings
        </button>
        <ul>
            <li>Comparison</li>
            <li>Pricing</li>
            <li id={'Reanotes'}>Reanotes</li>
            <li>Purpose</li>
            <li>Explore</li>
        </ul>

        <button className="getStartedButton" onClick={handleRegistrationRouting}>Get started</button>
    </nav>
}