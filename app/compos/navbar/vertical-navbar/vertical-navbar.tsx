'use client';

import ReanotesIcon from '@/public/RN-icon.png';
import LeftLongArrowIcon from '@/public/icons/arrow-left-long-line.svg';
import FoldersIcon from '@/public/icons/folder-line.svg';
import HomeIcon from '@/public/icons/homeIcon.svg';
import BrowseIcon from '@/public/icons/search-2-line.svg';
import SettingsIcon from '@/public/icons/settings-3-line.svg';
import StatsIcon from '@/public/icons/statsIcon.svg';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';
import './vertical-navbar-styling.css';
import SubModalComponent from '../../modals/subscriptionModal/SubModalComponent';
import { useMediaQuery } from 'usehooks-ts';

interface ComponentProps {
  getIsReanotesButtonClicked: (isClicked: boolean) => void;
}

export default function VerticalNavbar({
  getIsReanotesButtonClicked,
}: ComponentProps): ReactElement<HTMLDivElement> {
  const router = useRouter();
  const pathname = usePathname();

  const isInPhoneSize: Boolean = useMediaQuery('(width <= 700px)');

  const handleNavigationRoutes = (url: string): void => {
    router.push(url);
  };

  return (
    <div className={'vertical-navbar-container'}>
      <div className='navbar-container'>
        <div className='navbar-top-section-container'>
          {!isInPhoneSize && (
            <Image
              src={ReanotesIcon}
              alt='Reanotes'
              className='reanotes-icon'
            />
          )}
          {isInPhoneSize && (
            <button
              className='vertical-navbar-collapse-button'
              type='button'
              aria-label='vertical-navbar-collapse-button'
              onClick={() => getIsReanotesButtonClicked(true ? false : true)}
            >
              <Image src={LeftLongArrowIcon} alt='vertical-navbar-collapse' />
            </button>
          )}

          <hr style={{ width: '80%', color: 'white' }} />

          <div className='navigators'>
            <button
              type='button'
              aria-label='home'
              className={pathname.includes('home') ? 'current-page' : undefined}
              onClick={() => handleNavigationRoutes('/home/all')}
            >
              <Image src={HomeIcon} alt='Home' width={25} height={25} />
            </button>
            <button
              type='button'
              aria-label='home'
              className={
                pathname.includes('browse') ? 'current-page' : undefined
              }
              onClick={() => handleNavigationRoutes('/browse')}
            >
              <Image src={BrowseIcon} alt='Home' width={25} height={25} />
            </button>
            <button
              type='button'
              aria-label='stats'
              className={
                pathname.includes('stats') ? 'current-page' : undefined
              }
              onClick={() => handleNavigationRoutes('/stats')}
            >
              <Image src={StatsIcon} alt='Home' width={25} height={25} />
            </button>
            <button
              type='button'
              aria-label='folders'
              className={
                pathname.includes('folders') ? 'current-page' : undefined
              }
              onClick={() => handleNavigationRoutes('/folders')}
            >
              <Image src={FoldersIcon} alt='Home' width={25} height={25} />
            </button>
          </div>
        </div>

        <div className='navbar-bottom-section-container'>
          <button
            aria-label='profile'
            className='user-avatar'
            type='button'
            onClick={() => handleNavigationRoutes('/profile/jadtales')}
          >
            <Image
              src={ReanotesIcon}
              alt='Reanotes'
              width={25}
              height={25}
              className={'no-user-avatar'}
            />
          </button>

          <SubModalComponent withIcon={true} />

          <button
            aria-label='settings'
            type='button'
            className={
              pathname.includes('settings') ? 'current-page' : undefined
            }
            onClick={() => handleNavigationRoutes('/settings')}
          >
            <Image src={SettingsIcon} alt='Home' width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
