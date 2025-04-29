import RNICON from '@/public/RN-icon.png';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import React, { Fragment, ReactElement, useState } from 'react';
import '../navbarStyling.css';
import LeftArrowIcon from '@/public/icons/leftarrow.svg';
import RightArrowIcon from '@/public/icons/rightarrow.svg';

interface ComponentProps {
  getIsReanotesButtonClicked: (isClicked: boolean) => void;
}

export default function ReanotesNavbarIcon({
  getIsReanotesButtonClicked,
}: ComponentProps): ReactElement<HTMLButtonElement> {
  const test: boolean = false;

  return (
    <button
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2% 5% 0 5%',
        border: 'none',
      }}
      type='button'
      aria-label='reanotes-navbar'
      onClick={() => getIsReanotesButtonClicked(!test)}
    >
      <Image
        style={{ borderRadius: '4px' }}
        src={RNICON}
        alt='reanotes-navbar-icon'
        width={35}
      />
    </button>
  );
}
