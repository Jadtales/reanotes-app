'use client'

import {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function NotFoundPage(): ReactElement<any> {
    const [counter, setCounter] = useState<number>(3);
    const router = useRouter();


    useEffect(() => {

        const intervalId = setInterval(() => {
            if(counter > 0){
                setCounter((prevState) => prevState - 1);
            }
        }, 1000)

        const timeoutId = setTimeout(() => {
            router.push("/home/all");
        }, 3500)

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [])

    return <div className={'notFoundPageContainer'} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '50',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--darkThemeBody)',
        color: 'var(--textColor_gray_dark)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'


    }}>
        <h1 style={{fontSize: '5rem', letterSpacing: '5px'}}>Reanotes</h1>
        <p style={{letterSpacing: '1px'}}>
            Reanotes does not recognize the page!
            <br/>
            You'll be directed to the Home page in {counter}
        </p>
    </div>
}