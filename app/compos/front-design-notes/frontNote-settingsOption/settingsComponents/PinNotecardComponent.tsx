import React, {ReactElement, useState} from "react";
import Image from "next/image";
import PinNoteIcon from "@/public/icons/frontNoteSetting-icons/pushpin-2-line.svg";
import PinnedNotecardIcon from '@/public/icons/frontNoteSetting-icons/pushpin-2-fill.svg'

interface ComponentReturnTypes {
    isPinned: boolean;
    pinElement: ReactElement<HTMLLIElement>;
}

interface ComponentProps {
    isInPhoneSize: boolean;
    checkIsNotecardPinned: (checkIsNotecardPinned: boolean) => void;
}

type PinReturnedType = boolean | 'Pin' | 'Pinned';

export default function PinNotecardComponent({isInPhoneSize, checkIsNotecardPinned}: ComponentProps): ComponentReturnTypes {
    const [isPinned, setIsPinned] = useState<boolean>(false);

    const handleNotecardPinning = (): void => {
        setIsPinned(!isPinned);
        checkIsNotecardPinned(!isPinned);
    };

    const isNotecardPinned: PinReturnedType =
        !isInPhoneSize && !isPinned && 'Pin'
        || !isInPhoneSize && isPinned && 'Pinned'
        || isInPhoneSize;

    const pinElement: ReactElement<HTMLLIElement> = (
        <li onClick={handleNotecardPinning}>
            <Image src={isPinned ? PinnedNotecardIcon : PinNoteIcon} width={20} alt="pinNote"/>
            {isNotecardPinned}
        </li>

    );
    return {
        isPinned,
        pinElement,
    };
}