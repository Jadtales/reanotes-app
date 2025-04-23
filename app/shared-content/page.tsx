'use client';

import { ReactElement, useEffect, useState } from 'react';
import './sharedContentPageStyling.css';
import ReanotesIcon from '@/favicon.png';
import StarIcon from '@/public/icons/star-fill.svg';
import UnStarIcon from '@/public/icons/star-line.svg';
import { capitalize } from '@/utils/helper-functions/string-type-helper-functions';
import SharedContentInterface from '@/utils/interfaces/shared-content-interface';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SharedContentPage(): ReactElement<HTMLDivElement> {
  const [retrievedSharedContent, setRetrievedSharedContent] =
    useState<SharedContentInterface>({
      user: '',
      book_title_author: 'There, there by Tommy Orange',
      shared_content:
        'The perceptron’s roots lie in a 1943 paper by an unlikely combination of a philosophically minded neuroscientist in his mid-forties and a homeless teenager. Warren McCulloch6 was an American neurophysiologist trained in philosophy, psychology, and medicine. During the 1930s, he worked on neuroanatomy, creating maps of the connectivity of parts of monkey brains. While doing so, he also obsessed over the “logic of the brain.”7 By then, the work of mathematicians and philosophers like Alan Turing, Alfred North Whitehead, and Bertrand Russell was suggesting a deep connection between computation and logic. The statement “If P is true AND Q is true, then S is true” is an example of a logical proposition. The assertion was that all computation8 could be reduced to such logic. Given this way of thinking about computation, the question bothering McCulloch was this: If the brain is a computational device, as many think it is, how does it implement such logic?',
    });

  const [isStarIconShown, setIsStarIconShown] = useState(false);
  const [isSharedContentStared, setIsSharedContentStared] = useState(false);

  const router = useRouter();
  const getURLQueries = useSearchParams();
  const user: string | null | false =
    getURLQueries.has('user') && getURLQueries.get('user');
  const userId: string | null | false =
    getURLQueries.has('id') && getURLQueries.get('content-id');

  useEffect(() => {
    async function fetchUserSharedContent(): Promise<void> {
      const getUserSharedContent = await fetch(
        `http://localhost:3001//shared-content?content-id=${userId}&user=${user}`
      );
      const data: SharedContentInterface | false =
        getUserSharedContent.ok && getUserSharedContent.json();

      if (data) {
        setRetrievedSharedContent({
          user: user,
          shared_content: data.shared_content,
          book_title_author: data.book_title_author,
          user_period_stats: data.user_period_stats,
        });
      }
    }
  }, [retrievedSharedContent]);

  const handleUserPageRoute = (): void => {
    router.push(`${user}`);
  };

  return (
    <div
      className={'sharedContentPageContainer'}
      onMouseEnter={() => setIsStarIconShown(true)}
      onMouseLeave={() => setIsStarIconShown(false)}
    >
      <div className={'topLayer'}>
        {isStarIconShown && (
          <button
            aria-label='star-notecard'
            className={'starIcon'}
            onClick={() => setIsSharedContentStared(!isSharedContentStared)}
          >
            <Image
              src={isSharedContentStared ? StarIcon : UnStarIcon}
              alt={'start-unstar-highlight'}
              width={20}
            />
          </button>
        )}
      </div>

      <p className='content'>{retrievedSharedContent.shared_content}</p>

      <div className='username_authorName'>
        <cite
          style={{ color: 'var(--secondPrimaryTextColor)' }}
          onClick={handleUserPageRoute}
          className={'username'}
        >
          {capitalize(user)}
        </cite>
        <cite>- {retrievedSharedContent.book_title_author}</cite>
      </div>
    </div>
  );
}
