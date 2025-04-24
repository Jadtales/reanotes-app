'use client';

import { Fragment, ReactElement } from 'react';
import './browse-page-styling.css';
import SearchInputFieldComponent from '../compos/navbar/navbar_microComponents/SearchInputFieldComponent';
import GoBackToComponent from '@/app/compos/go-back-to-component/GoBackTo-Component';
import FrontDesignNoteBrowse from '@/app/compos/suggested-front-design-notecard/FrontDesignNote-browse';
import UserNotecard from '@/app/compos/user-notecards-component/user-notecard';
import { useSearchContext } from '@/utils/providers/searchInputFieldProvider';
import { useWindowScroll } from 'react-use';
import { useMediaQuery } from 'usehooks-ts';

export default function BrowsePage(): ReactElement<any> {
  const { userSearchedText } = useSearchContext();
  const isInPhoneSize = useMediaQuery('(width <= 700px)');

  // const isInExploreSection = useMediaQuery({ query: '(max-height: 1px)' });

  const { y } = useWindowScroll();

  return (
    <Fragment>
      {isInPhoneSize && (
        <GoBackToComponent
          withText={true}
          margin={'50px 0 0 10%'}
          iconSize={'20px'}
        />
      )}

      <div style={{ margin: '0 15%' }}>
        <SearchInputFieldComponent />
      </div>

      {userSearchedText.length > 0 ? (
        <div className='browsePage-searching'>
          <div className='searchedHighlights'>
            <h2>Searched highlights.</h2>

            <div className='searchedHighlights-components'>
              {userSearchedText}
            </div>
          </div>

          <div className='searchedPeople'>
            <h2>Searched people.</h2>

            <div className='searchedPeople-profiles'>{userSearchedText}</div>
          </div>
        </div>
      ) : (
        <div className='browsePage'>
          <div className='recommendationsBasedOnFlavour-section'>
            <h2>Daily recommendations based on your flavour.</h2>
            <div className='recommendationsBasedOnFlavour'>
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              {/* Repeat as needed */}
            </div>
          </div>

          <div className='popularNotes-section'>
            <h2>Weekly Popular notes.</h2>
            <div className='popularNotes'>
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              {/* Repeat as needed */}
            </div>
          </div>

          <div className='popularByGenre-section'>
            <h2>Popular notes by genre.</h2>
            <div className='popularByGenre'>
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              <FrontDesignNoteBrowse
                bookTitle={'There there'}
                bookAuthor={'Tommy Orange'}
                notedByUsername={'jadtales'}
              />
              {/* Repeat as needed */}
            </div>
          </div>

          {/*<div className="browsing-section">*/}
          {/*    <div className={'heading'}>*/}
          {/*        <h2 className={!isInExploreSection ? 'exploreHeading' : undefined}*/}
          {/*            style={{opacity: y >= 1500 ? 0 : 1, transition: 'opacity .5s ease-in-out'}}>*/}
          {/*            Explore Other's interest and Notecards*/}
          {/*        </h2>*/}
          {/*    </div>*/}
          {/*    */}
          {/*</div>*/}
        </div>
      )}
    </Fragment>
  );
}
