'use client'
import {FormEvent, MouseEventHandler, ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import './registrationPageStyling.css'

// imported icons
import ReadnotesIcon from '@/favicon.png'
import GoogleIcon from '@/public/icons/google-fill.svg'
import AmazonIcon from '@/public/icons/socialsIcons/amazon-fill.svg'
import GoogleAuthComponent from "@/app/compos/registration-components/GoogleAuthComponent";
import {useRouter} from "next/navigation";

export default function RegistrationComponentPage(): ReactElement<any> {
    const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
    const [userCredentials, setUserCredentials] = useState<{ email: string, password: string }>({ email: '', password: '' });

    const router = useRouter();

    const handleRegistrationMethodSwitching = (): void => {
        setIsUserRegistered(!isUserRegistered);
    }

    const getUsername = (event: any): void => {
        setUserCredentials(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const endpoint = isUserRegistered ? 'sign-in' : 'sign-up';
        try {
            const response = await fetch(`http://localhost:3002/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Success:', result);

                // store accessToken in localstorage
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);

                router.push('/home/all');
                // Handle successful login or registration (e.g., redirect, store token)
            } else {
                console.error('Error:', result);
                // Handle errors (e.g., show error message to the user)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="registrationPageContainer">
            <div className="login_signup_container">
                <div className="registrationHeadTitle">
                    <Image src={ReadnotesIcon} alt="reanoesIcon" width={60}/> Reanotes.
                </div>

                {isUserRegistered ? <div className="registrationFormSwitch">
                        <span onClick={handleRegistrationMethodSwitching}>Sign up</span>
                        , if you don't have an account.</div>
                    : <div className="registrationFormSwitch">
                        <span onClick={handleRegistrationMethodSwitching}>Log in</span>
                        , if you already have an account
                    </div>}

                {isUserRegistered ?
                    <div className="loginForm">
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder={"Enter your email"}/>
                            <input type="password" placeholder={"Enter your password"}/>
                            <button type={'submit'}>Log in</button>

                            {/*<span style={{*/}
                            {/*    textAlign: 'center',*/}
                            {/*    fontWeight: 'lighter'*/}
                            {/*}}>or, connect with Google, Amazon.</span>*/}
                            {/*<button type="submit"><Image src={GoogleIcon} alt="signupWithGoogle"/></button>*/}
                            {/*<button type="submit"><Image src={AmazonIcon} alt="signupWithAmazon"/></button>*/}
                        </form>
                    </div>
                    :
                    <div className="registrationForm">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter your username" onChange={getUsername}/>
                            <input type="number" placeholder="Enter your age"/>
                            <input type="email" placeholder="Enter your email"/>
                            <input type="password" placeholder="Enter your password"/>
                            <button>Sign up</button>


                            {/*TODO: implement google & amazon auth*/}
                            {/*<span style={{*/}
                            {/*    textAlign: 'center',*/}
                            {/*    fontWeight: 'lighter'*/}
                            {/*}}>or, connect with google, Amazon.</span>*/}
                            {/*<GoogleAuthComponent/>*/}
                            {/*<button type="submit"><Image src={AmazonIcon} alt="signupWithAmazon"/></button>*/}
                        </form>
                    </div>}
            </div>
            <div className="quotes">
                <h1>“You can never get a cup of tea large enough or a book long enough to suit me.”</h1>
                <span style={{color: 'var(--thirdPrimaryTextColor)'}}>― C.S. Lewis</span>
            </div>
        </div>
    )
}