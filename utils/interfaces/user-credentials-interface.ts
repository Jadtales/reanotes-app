export default interface RetrievedUserCredentialsInterface {
    username: string;
    briefIntro: string;
    userInterests: string[];
    aboutMeText: string;
    totalUserNotecards: number;

    followers_following: {
        followers: number;
        following: number;
    };

    userSocialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        website?: string;
    }
}