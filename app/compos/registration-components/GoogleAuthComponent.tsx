import {ReactElement, useEffect} from "react";
import Image from "next/image";
import GoogleIcon from "@/public/icons/google-fill.svg";

export default function GoogleAuthComponent(): ReactElement<any> {
    const clientId = "856143639650-76ksq2v4gfes4s0o3fprtnj53jfpun70.apps.googleusercontent.com";
    const clientSecret = "YOUR_GOOGLE_CLIENT_SECRET"; // Use your actual client secret here
    const redirectUri = encodeURIComponent("http://localhost:3001/registration");
    const scope = encodeURIComponent("email profile"); // Request email and basic profile info

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    const handleGoogleAuth = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        window.location.href = googleLoginUrl; // Redirect to Google Login
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const authCode = query.get("code");

        if (authCode) {
            // Now exchange the authorization code for an ID token from Google's token endpoint
            fetch('http://localhost:3002/auth/google-auth')
                .then(response => response.json())
                .then(data => {
                    const idToken = data.id_token; // Get the ID token
                    // Send the Google ID token to your backend for verification and user creation/login
                    fetch('http://localhost:3002/auth/google-auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            googleLoginTicket: idToken, // Send the ID token
                        }),
                    })
                        .then(result => result.json())
                        .then(userData => {
                            console.log('User authenticated:', userData);
                        })
                        .catch(err => console.error('Error sending ID token:', err));
                })
                .catch(err => console.error('Error exchanging code for token:', err));
        }
    }, []);

    return (
        <button onClick={handleGoogleAuth} aria-label="Sign up with Google">
            <Image src={GoogleIcon} alt="Sign up with Google"/>
        </button>
    );
}
