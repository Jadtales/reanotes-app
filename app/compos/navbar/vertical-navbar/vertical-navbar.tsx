'use client'

import React, { ReactElement } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ReanotesIcon from '@/public/RN-icon.png';
import HomeIcon from '@/public/icons/homeIcon.svg';
import StatsIcon from '@/public/icons/statsIcon.svg'
import SettingsIcon from '@/public/icons/settings-3-line.svg';
import FoldersIcon from '@/public/icons/folder-line.svg';
import BrowseIcon from '@/public/icons/search-2-line.svg';

import './vertical-navbar-styling.css';
import SubModalComponent from '../../modals/subscriptionModal/SubModalComponent';


export default function VerticalNavbar(): ReactElement<HTMLDivElement> {

  const router = useRouter();

  const handleNavigationRoutes = (url: string): void => {
    router.push(url);
  }


  return (
    <div className={'vertical-navbar-container'}>
      <div className='navbar-container'>
        <div className='navbar-top-section-container'>
          <Image src={ReanotesIcon} alt="Reanotes" className="reanotes-icon" />

          <hr style={{ width: '80%', color: 'white' }} />

          <div className="navigators">
            <button type='button' aria-label='home' onClick={() => handleNavigationRoutes('/home/all')} >
              <Image src={HomeIcon} alt="Home" width={25} height={25} />
            </button>
            <button type='button' aria-label='home' onClick={() => handleNavigationRoutes('/browse')} >
              <Image src={BrowseIcon} alt="Home" width={25} height={25} />
            </button>
            <button type='button' aria-label='stats' onClick={() => handleNavigationRoutes('/stats')}>
              <Image src={StatsIcon} alt="Home" width={25} height={25} />
            </button>
            <button type='button' aria-label='folders' onClick={() => handleNavigationRoutes('/folders')}>
              <Image src={FoldersIcon} alt="Home" width={25} height={25} />
            </button>
          </div>
        </div>

        <div className="navbar-bottom-section-container">
          <button aria-label='profile' className='user-avatar' type='button' onClick={() => handleNavigationRoutes('/jadtales')}>
            <Image src={ReanotesIcon} alt="Reanotes" width={25} height={25} className={'no-user-avatar'} />
          </button>

          <SubModalComponent withIcon={true} />

          <button aria-label='settings' type='button' onClick={() => handleNavigationRoutes('/settings')}>
            <Image src={SettingsIcon} alt="Home" width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  )
}
