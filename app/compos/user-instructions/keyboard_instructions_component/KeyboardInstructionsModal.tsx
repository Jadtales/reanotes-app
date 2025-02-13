'use client';

import { Fragment, useRef } from 'react';
import Image from 'next/image';
import './keyboardInstructionsStyling.css';

// imported icons
import RightToIcon from '@/public/icons/rightTo.svg';
import LeftToIcon from '@/public/icons/leftTo.svg';
import KeyboardIcon from '@/public/icons/keyboard-line.svg';
import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';

export default function KeyboardInstructionsModal() {
  const keyboardInstructionsModalRef = useRef<HTMLDialogElement>(null);

  const handleDialogToggling = (): void => {
    const modal = keyboardInstructionsModalRef.current;

    if (!modal?.open) {
      keyboardInstructionsModalRef.current?.showModal();
    } else {
      keyboardInstructionsModalRef.current?.close();
    }
  };

  return (
    <Fragment>
      <button className="keyboardInstructions" onClick={handleDialogToggling}>
        <Image src={KeyboardIcon} alt="keyboardInstruction" width={40} />
      </button>

      <dialog
        className="keyboardInstructionsContainer"
        ref={keyboardInstructionsModalRef}
      >
        <div className="closeKeyboardInstructionsModal">
          <h2>Keyboard Shortcuts</h2>
          <Image
            src={ClosingIcon}
            alt="closingKeyboardInstructions"
            width={30}
            onClick={handleDialogToggling}
          />
        </div>

        <div className="difficultyLevelKeys">
          <h1>To submit Difficulty level</h1>
          <div className="keys">
            <span className="againKey">1 | F</span>
            <span className="hardKey">2 | U</span>
            <span className="goodKey">3 | G</span>
            <span className="easyKey">4 | P</span>
          </div>
        </div>

        <div className="nextPreviousCards">
          <h1>Go to/back next or previous cards</h1>
          <div className="keys">
            <span className="rightArrowkey">
              <Image src={RightToIcon} alt="nextCard" />
            </span>
            <span className="rightArrowkey">
              <Image src={LeftToIcon} alt="previousCard" />
            </span>
          </div>
        </div>

        <div className="switchTermDefinition">
          <h1>View Definition or Term</h1>
          <div className="keys">
            <span className="spaceBarKey">Space bar</span>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}
