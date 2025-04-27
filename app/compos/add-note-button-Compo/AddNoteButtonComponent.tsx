'use client';

import { useRouter } from 'nextjs-toploader/app';
import { ReactElement, useState, useRef } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';
import './addNoteButtonComponentStyling.css';
import KindleHighlightsImportModal from '@/app/compos/modals/kindle-highlights-import-modal/kindle-highlights-import-modal';
import FrontNotecardInterface from '@/utils/interfaces/front-notecard-interface';

interface ComponentsProps {
  getNewSelectedKindleHighlights: (
    selectedHighlights: Set<FrontNotecardInterface>
  ) => void;
}

export default function AddNoteComponentButton({
  getNewSelectedKindleHighlights,
}: ComponentsProps): ReactElement<HTMLDivElement> | undefined {
  const [isAddNoteButtonClicked, setIsAddNoteButtonClicked] =
    useState<boolean>(false);
  const isInPhoneSize = useMediaQuery('(width <= 700px)');
  const buttonRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleAddNoteButtonClicked = (): void => {
    setIsAddNoteButtonClicked(!isAddNoteButtonClicked);

    // Add document click listener when expanded
    if (!isAddNoteButtonClicked) {
      document.addEventListener('click', handleClickOutside, true);
    }

    if (isAddNoteButtonClicked) {
      let notecardId: string = uuid();
      let query = encodeURIComponent(notecardId);

      router.push(`/createnotes/notecard?id=${query}`);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    // Check if the click is outside the buttonRef
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsAddNoteButtonClicked(false);

      // Remove the event listener after collapsing
      document.removeEventListener('click', handleClickOutside, true);
    }
  };

  if (isInPhoneSize) return;

  return (
    <div className='addNoteButtonWrapper' ref={buttonRef}>
      {isAddNoteButtonClicked && (
        <KindleHighlightsImportModal
          newSelectedKindleHighlights={getNewSelectedKindleHighlights}
        />
      )}
      <button className='addNoteButton' onClick={handleAddNoteButtonClicked}>
        Add a note +
      </button>
    </div>
  );
}
