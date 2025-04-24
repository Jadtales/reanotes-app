'use client';

import { useRouter } from 'nextjs-toploader/app';
import React, { ReactElement } from 'react';
import './navbarStyling.css';
import BrowsingComponent from '@/app/compos/browsing/BrowsingComponent';
import SubModalComponent from '@/app/compos/modals/subscriptionModal/SubModalComponent';
import SearchInputFieldComponent from '@/app/compos/navbar/navbar_microComponents/SearchInputFieldComponent';
import NavbarUserProfile from '@/app/compos/navbar/navbar_microComponents/navbar-user-profile';
import NotificationsCenterComponent from '@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsCenterComponent';
import { useMediaQuery } from 'usehooks-ts';

export default function Navbar(): ReactElement<HTMLDivElement> | undefined {
  const router = useRouter();

  const isPhoneSize = useMediaQuery('(width >= 700px)');

  if (!isPhoneSize) {
    return undefined;
  }
  return (
    <nav id='navbarContainer'>
      <div className='iconContainer'>
        <h1
          id='reanotesIcon'
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/home/all')}
        >
          Reanotes
        </h1>

        <div className='user-search_buttons'>
          <NavbarUserProfile phoneScreenSize={false} />
          <BrowsingComponent />
          {isPhoneSize && <SearchInputFieldComponent />}
        </div>
      </div>

      <div className='userInteractionButtons'>
        <SubModalComponent />
        {/*<NotificationsCenterComponent/>*/}
        <NotificationsCenterComponent />
      </div>
    </nav>
  );
}
