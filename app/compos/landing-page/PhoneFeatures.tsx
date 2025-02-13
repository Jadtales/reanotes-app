import {ReactElement} from "react";
import Link from "next/link";
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";


interface ComponentProps {
    phoneFeatureHeader: string;
    phoneFeatureParagraph: string;
    imgSource: string | StaticImport;
}


export default function PhoneFeatures({
                                          phoneFeatureHeader,
                                          phoneFeatureParagraph,
                                          imgSource
                                      }: ComponentProps): ReactElement {
    return <div className="phoneFeaturesContainer"
                style={{
                    margin: '0 20%',
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

        <div style={{
            // backgroundColor: '#f4f2ec',
            boxShadow: 'var(--shadowing)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '25vw',
            height: '30vw',
            padding: '40px',
            borderRadius: '10px',
            color: 'var(--textColor_gray_dark)',
            textAlign: 'start',
            position: 'relative'
        }}>
            <h2>{phoneFeatureHeader}</h2>
            <p style={{
                fontWeight: 'lighter',
                color: 'var(--textColor_gray_dark)'
            }}>
                {phoneFeatureParagraph}
            </p>
            <Link href={'/'} style={{
                color: 'var(--textColor_gray_dark)'
            }}>
                Reanotes mobile app
            </Link>

            <div style={{
                // position: 'relative',
                borderRadius: '40px',
                justifyContent: 'center',
                display: 'flex',
                // textAlign: 'center'
            }}>
                <Image src={imgSource}
                       alt="notes"
                       width={190}/>
            </div>
        </div>
    </div>
}