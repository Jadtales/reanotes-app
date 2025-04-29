'use client';

import GoBackToComponent from '@/app/compos/go-back-to-component/GoBackTo-Component';
import FrontDesignNoteBrowse from '@/app/compos/suggested-front-design-notecard/FrontDesignNote-browse';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, ReactElement, useState } from 'react';
import './userProfilePageStyling.css';
import AboutMeComponent from '@/app/compos/profile-page-components/AboutMeComponent';
import UploadUserProfileImg from '@/app/compos/profile-page-components/UploadUserProfileImg';
import UsernameProfilePageComponent from '@/app/compos/profile-page-components/UsernameComponent';
import WebsiteLinkIcon from '@/public/icons/copyUrlLink.svg';
import InstagramIcon from '@/public/icons/socialsIcons/instagram-line.svg';
// imported icons
import TwitterIcon from '@/public/icons/socialsIcons/twitter-x-line.svg';
import RetrievedUserCredentialsInterface from '@/utils/interfaces/user-credentials-interface';
import { useMediaQuery } from 'usehooks-ts';

export default function UserProfilePage(): ReactElement {
  const [
    RetrievedUserCredentialsInterface,
    setRetrievedUserCredentialsInterface,
  ] = useState<RetrievedUserCredentialsInterface>();

  const pageWidth = useMediaQuery('(width <= 700px)');

  return (
    <Fragment>
      <GoBackToComponent
        margin={pageWidth ? '0 5%' : '0 15% 50px 15%'}
        withText={!pageWidth}
        iconSize={'25px'}
        buttonTextSize={15}
      />

      <div className='userProfilePageContainer'>
        <div className='userIntroduction'>
          <div className='UserName_briefIntro'>
            <UsernameProfilePageComponent username={'jadtales'} />
            <p>I like sharing knowledge</p>
          </div>

          <div className='userInterests'>
            <h1>Jadtales Interests</h1>
            <ul>
              <li>#Fiction</li>
              <li>#Crime</li>
              <li>#Politics</li>
            </ul>
          </div>

          <div className='user_followers_followee'>
            <div className='userFollowers'>
              <h5>Followers</h5>
              <span>4232</span>
            </div>
            <div className='userFollowing'>
              <h5>Follows</h5>
              <span>321</span>
            </div>
          </div>

          <div className='aboutUserSection'>
            <AboutMeComponent
              aboutMeText={
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum expedita fugit maxime nisi officia\n' +
                'repellat sint temporibus voluptates.'
              }
            />
          </div>

          <div className='userCardnotes'>
            <h1>Jadtales Notecards - 421</h1>
            <div className='userPopularNotecards'>
              <FrontDesignNoteBrowse
                bookTitle={'there, there'}
                bookAuthor={'toomy orange'}
                notedByUsername={'Jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'there, there'}
                bookAuthor={'toomy orange'}
                notedByUsername={'Jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'there, there'}
                bookAuthor={'toomy orange'}
                notedByUsername={'Jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'there, there'}
                bookAuthor={'toomy orange'}
                notedByUsername={'Jadtales'}
              />
            </div>
          </div>
        </div>

        <div className='userSocials'>
          <UploadUserProfileImg />
          <div className='userSocialsLinks'>
            <Link href={'/instagram'}>
              Twitter
              <Image src={TwitterIcon} alt={'goToTwitter'} />
            </Link>
            <Link href={'/instagram'}>
              Instagram
              <Image src={InstagramIcon} alt={'goToInstagram'} />
            </Link>
            <Link href={'/instagram'}>
              Website
              <Image src={WebsiteLinkIcon} alt={'goToUserOfficialWebsite'} />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
