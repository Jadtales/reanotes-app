'use client';

import Image from 'next/image';
import React, {
  Fragment,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import './frontNoteSettingStyling.css';
import PinNotecardComponent from '@/app/compos/front-design-notes/frontNote-settingsOption/settingsComponents/PinNotecardComponent';
import DeleteNotecardModal from '@/app/compos/modals/notecard-settings-modals/delete-notecard-modal/DeleteNotecardModal';
import ExportNotecardModal from '@/app/compos/modals/notecard-settings-modals/export-notecard-highlights-modal/ExportNotecardModal';
import MoveToFolderModal from '@/app/compos/modals/notecard-settings-modals/move-notecard-modal/move-to-folder-modal';
// imported icons
import EditNoteIcon from '@/public/icons/frontNoteSetting-icons/pencil-line.svg';
import MoreIcon from '@/public/icons/more-line.svg';
import { BookCredentialsInterface } from '@/utils/interfaces/front-notecard-interface';
import { useRouter } from 'nextjs-toploader/app';
import { useMediaQuery } from 'usehooks-ts';

interface FrontNoteSettingsProps extends BookCredentialsInterface {
  deleteThisNotecardById: (bookId: string, toCloseModalRef: any) => void;
  checkIsNotecardPinned: (checkIsNotecardPinned: boolean) => void;
}

export default function FrontNotecardSettings({
  bookCredentials,
  deleteThisNotecardById,
  checkIsNotecardPinned,
}: FrontNoteSettingsProps): ReactElement<any> {
  const isInPhoneSize = useMediaQuery('(width <= 700px)');

  const { bookId, bookTitle, bookTags } = bookCredentials;

  const settingsRef = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  // check if a notecard is pinned
  const { pinElement } = PinNotecardComponent({
    isInPhoneSize,
    checkIsNotecardPinned,
  });

  const handleSettingsToggling = (event: ReactMouseEvent): void => {
    event.stopPropagation();
    if (!settingsRef.current?.open) {
      settingsRef.current?.show();
    }
  };

  // to prevent propagation during the interaction with settings modal
  const handleSettingsModalClosing = (event: ReactMouseEvent): void => {
    if (settingsRef.current?.open) {
      event.stopPropagation();
    }
  };

  // --- to go to the edit page of the NoteCard
  const handleForwardToReviewPage = () => {
    router.push(`/createnotes/${bookTitle?.replaceAll(' ', '-')}-${bookId}`);
  };

  const handleDeleteNotecard = (
    event: ReactMouseEvent,
    toCloseModalRef: any
  ) => {
    if (event) {
      deleteThisNotecardById(bookId, toCloseModalRef);
    }
  };

  // Add event listeners for click outside and Escape key
  useEffect(() => {
    const dialog = settingsRef.current;

    const handleClickOutside = (event: MouseEvent): void => {
      if (dialog && !dialog.contains(event.target as Node)) {
        dialog.close();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        dialog?.close();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <Fragment>
      <button
        aria-label='more-options'
        className={'settingsButton'}
        onClick={handleSettingsToggling}
      >
        <Image src={MoreIcon} alt='MoreIcon' priority />
      </button>

      <dialog
        className={
          !isInPhoneSize
            ? 'frontNoteSettingContainer'
            : 'frontNoteSettingContainer-phoneSize'
        }
        ref={settingsRef}
        onClick={handleSettingsModalClosing}
      >
        <ul>
          {pinElement}
          <li onClick={handleForwardToReviewPage}>
            <Image src={EditNoteIcon} width={20} alt='editNote' />
            {!isInPhoneSize && 'Edit Notecard'}
          </li>
          <MoveToFolderModal
            isPhoneSize={isInPhoneSize}
            notecardCredentials={{ bookId, bookTags }}
          />
          <ExportNotecardModal
            isPhoneSize={isInPhoneSize}
            bookCredentials={bookCredentials}
          />
          <hr style={{ margin: '5px 0' }} />
          <DeleteNotecardModal
            deleteIsClicked={handleDeleteNotecard}
            isPhoneSize={isInPhoneSize}
          />
        </ul>
      </dialog>
    </Fragment>
  );
}
