import GoBackIcon from '@/public/icons/goBackIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

interface ComponentProps {
  margin?: string;
  iconSize: number | string;
  withText: boolean;
  buttonTextSize?: number;
}

export default function ({
  margin,
  withText,
  iconSize,
  buttonTextSize,
}: ComponentProps): ReactElement<any> {
  const router = useRouter();

  return (
    <div
      className={'goBackToButton'}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--darkTheme_componentsBackgroundColor)',
        width: 'fit-content',
        color: 'var(--textColor_in_dark_mode)',
        padding: withText ? '6px 15px' : '0 0',
        borderRadius: '4px',
        margin: `${margin}`,
        cursor: 'pointer',
        fontSize: buttonTextSize ?? '16px',
      }}
      onClick={() => router.back()}
    >
      <Image
        src={GoBackIcon}
        alt='goBackToThePreviousPage'
        style={{
          width: iconSize ? `${iconSize}` : 'fit-content',
          height: iconSize ? `${iconSize}` : 'fit-content',
        }}
      />
      {withText && 'Go back'}
    </div>
  );
}
