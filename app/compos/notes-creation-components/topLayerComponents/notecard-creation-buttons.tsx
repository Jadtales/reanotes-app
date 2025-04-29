'use client';

import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import '../notesCreationCompoStyling.css';
import GoBackToComponent from '@/app/compos/go-back-to-component/GoBackTo-Component';
import ImportExternal_NotecardComponents from '@/app/compos/notes-creation-components/topLayerComponents/import-external-notes-components/import-external-notecards-component';
import ArrowUpIcon from '@/public/icons/arrow-up-line.svg';
import LockIcon from '@/public/icons/notesIcons/lockIcon.svg';
import OpenLockIcon from '@/public/icons/notesIcons/openLockIcon.svg';
import { useParams, useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

interface ComponentProps {
  isNotecardsPublic: (isPublic: boolean) => void;
}

export default function NotecardCreationNavbar({
  isNotecardsPublic,
}: ComponentProps): ReactElement<HTMLDivElement> {
  const [isSharingButtonClicked, setIsSharingButtonClicked] =
    useState<boolean>(true);

  const pageHeight = useMediaQuery('(height >= 300px)');
  const pageWidth = useMediaQuery('(width >= 700px)');

  const urlParams = useSearchParams();

  const handleGoBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchSharingOption = (): void => {
    setIsSharingButtonClicked((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    isNotecardsPublic(isSharingButtonClicked);
  }, [isSharingButtonClicked]);

  return (
    <div className='createnotes-topLayer'>
      <div
        className={
          pageHeight
            ? 'creationButton-layer-withNavbar'
            : 'creationButton-layer'
        }
      >
        <div className='lastSaveTime'>
          <GoBackToComponent
            withText={pageWidth}
            iconSize={!pageWidth ? '37px' : '25px'}
          />
        </div>

        {/*<span>Last saved, 3 seconds ago.</span>*/}

        <div className='creationButtons'>
          {pageHeight && (
            <button
              aria-label='go-up-button'
              onClick={handleGoBackToTop}
              className='arrow-up-button'
            >
              <Image src={ArrowUpIcon} alt='goUp' className='go-up-icon' />
            </button>
          )}

          <button className='sharingOption' onClick={switchSharingOption}>
            {
              <Image
                src={isSharingButtonClicked ? OpenLockIcon : LockIcon}
                alt={'share-these-notecards'}
                width={20}
              />
            }
            <span>{isSharingButtonClicked ? 'Public' : 'Private'}</span>
          </button>

          <button className='noteCreationButton'>Create</button>
        </div>
      </div>
      <ImportExternal_NotecardComponents />
    </div>
  );
}
