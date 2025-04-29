import RNICON from '@/public/RN-icon.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import React, { Fragment, ReactElement, useState } from 'react';
import '../navbarStyling.css';
import LeftArrowIcon from '@/public/icons/leftarrow.svg';
import RightArrowIcon from '@/public/icons/rightarrow.svg';

interface ComponentProps {
  phoneScreenSize?: boolean;
  userProfileWidth?: number;
  getIsUserProfileClicked?: (value: boolean) => void;
}

export default function NavbarUserProfile({
  phoneScreenSize = true,
  userProfileWidth,
  getIsUserProfileClicked,
}: ComponentProps): ReactElement<any> {
  const [isUserProfileClicked, setIsUserProfileClicked] =
    useState<boolean>(false);

  const router = useRouter();

  const handleUserProfileClicked = (): void => {
    getIsUserProfileClicked(!isUserProfileClicked);
    setIsUserProfileClicked(!isUserProfileClicked);
  };

  const handleGoingToUserProfile = (): void => {
    // router.push(
    //   `/profile/${document
    //     .getElementById('userUsername')
    //     ?.innerText.toLowerCase()}`
    // );
    setIsUserProfileClicked(!isUserProfileClicked);
  };

  const handleUserLogOut = (): void => {
    router.push(`/registration`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2% 5% 0 5%',
      }}
      className={
        isUserProfileClicked && !phoneScreenSize
          ? 'userProfile-active'
          : 'userProfile'
      }
      onClick={handleUserProfileClicked}
    >
      <Image
        src={RNICON}
        alt='userProfileImg'
        onClick={() => phoneScreenSize && handleGoingToUserProfile()}
        width={userProfileWidth ? userProfileWidth : 20}
        style={{ borderRadius: '3px', display: 'flex' }}
      />

      {!phoneScreenSize && (
        <Fragment>
          <h1 id='userUsername' onClick={handleGoingToUserProfile}>
            Jadtales
          </h1>

          <div
            className={
              isUserProfileClicked ? 'userButtons-active' : 'userButtons'
            }
          >
            <Link href={`/settings`}>Settings</Link>

            <button onClick={handleUserLogOut}>Log out</button>
          </div>

          <Image
            src={isUserProfileClicked ? LeftArrowIcon : RightArrowIcon}
            alt='expendUserSettings'
            id='expandUserProfile'
          />
        </Fragment>
      )}
    </div>
  );
}
