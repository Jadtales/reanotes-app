'use server'

import Link from "next/link";
import './user-page-styling.css'

import RetrievedUserCredentialsInterface from "@/utils/interfaces/user-credentials-interface";

export default async function VisitedUser(): Promise<React.ReactElement<HTMLDivElement>> {
    const userCredentials: RetrievedUserCredentialsInterface | undefined = {
        username: 'jadtales',
        briefIntro: 'I read and read :)',
        totalUserNotecards: 22,
        followers_following: {
            followers: 200,
            following: 5000,
        },
        aboutMeText:
            'KazanExpress is an international marketplace with 3m monthly users and #26 on the AppStore, which was lately acquired by AliExpress. I joined as the second B2C Product Designer.',
        userInterests: ['Poetry', 'History'],
        userSocialLinks: {
            instagram: 'instagram.com/jadtales.com',
            twitter: 'twitter.com/jadtales',
        },
    };

    const capitalizedUsername: string = userCredentials.username.at(0)?.toUpperCase() + userCredentials.username.slice(1);

    return (
        <div className={'container'}>
            <div className={'leftSection'}>
                <div className={'userHeader'}>
                    <div className={'userHeaderRow'}>
                        <h1 className={'username'}>{capitalizedUsername}</h1>
                        <form>
                            <input type="hidden" name="userId" value="user-id-here" /> {/* Replace with actual user ID */}
                            <button type="submit" className={'followButton'}>
                                Follow {capitalizedUsername}
                            </button>
                        </form>
                    </div>
                    <p className={'briefIntro'}>{userCredentials?.briefIntro}</p>
                </div>

                <div className={'interestsSection'}>
                    <h2 className={'interestsHeader'}>{capitalizedUsername} Interests</h2>
                    <div className={'interestsList'}>
                        {userCredentials?.userInterests.map((interest, index) => (
                            <ul key={index} className={'interestTag'}>
                                <li>#{interest}</li>
                            </ul>
                        ))}
                    </div>
                </div>

                <div className={'followersFollowing'}>
                    <div className="userFollowers">
                        <h5>Followers</h5>
                        <span>{userCredentials?.followers_following.followers}</span>
                    </div>
                    <div className="userFollowing">
                        <h5>Follows</h5>
                        <span>{userCredentials?.followers_following.following}</span>
                    </div>
                </div>

                <div className={'aboutSection'}>
                    <h1 className={'aboutHeader'}>About {capitalizedUsername}</h1>
                    <p className={'aboutText'}>{userCredentials?.aboutMeText}</p>
                </div>

                <h1 className={'notecardsHeader'}>
                    {capitalizedUsername} Notecards - {userCredentials?.totalUserNotecards}
                </h1>
            </div>

            <div className={'socialsSection'}>
                <h1 className={'socialsHeader'}>User Socials</h1>
                {Object.entries(userCredentials.userSocialLinks!).map((socialLink, index) => (
                    <Link key={index} href={`/${socialLink[1]}`} className={socialLink}>
                        {socialLink[0]}
                    </Link>
                ))}
            </div>
        </div>
    );
}