import {Fragment} from "react";
import LandingPageNavbar from "@/app/compos/landing-page/Navbar";
import './pageStyling.css'
import LandingPageComparisonTable from "@/app/compos/landing-page/ComparisonTable";
import Image from "next/image";
import PresentationalComponents from "@/app/compos/landing-page/PresentationalComponents";
import {TextEffect} from "@/animationStyling/TextEffect";
import PhoneFeatures from "@/app/compos/landing-page/PhoneFeatures";
import ReanotesHomePageImg from '@/public/examples/reanotesHomePage.png'

import test from '@/public/landing-page-imgs/mobileFrontPage.png'


export default function LandingPage() {
    return <Fragment>
        {/*<LandingPageNavbar/>*/}

        <div className="offers">
            <h1><TextEffect>Meet Reanotes</TextEffect></h1>
            <h4>A better way to memorize your book highlights with the power of flashcards.
                <br/>
                <span>The alternative for Readwise!</span>
            </h4>

            <div className="reanotesHomePageImg">
                <Image src={ReanotesHomePageImg} alt={'reanotes_homePage'}/>
            </div>

            <div className="reanotes_readwise_comparison_section">
                <h1>Comparing Reanotes with Readwise</h1>

                <LandingPageComparisonTable/>
            </div>
            <PresentationalComponents/>
            <hr style={{margin: '3% 10%'}}/>

            <PhoneFeatures phoneFeatureHeader={'Revise your notes with AI.'}
                           phoneFeatureParagraph={'   With ai now, you can use AI to help you deepen your knowledge during revision time.\n' +
                               '            Reanotes AI also helps you to remember what you could have forgotten.'}
                           imgSource={test}/>
            {/*<PhoneFeatures phoneFeatureHeader={'Revise your notes with AI.'}*/}
            {/*               phoneFeatureParagraph={'   With ai now, you can use AI to help you deepen your knowledge during revision time.\n' +*/}
            {/*                   '            Reanotes AI also helps you to remember what you could have forgotten.'}*/}
            {/*               imgSource={test}/>*/}
        </div>
    </Fragment>
}