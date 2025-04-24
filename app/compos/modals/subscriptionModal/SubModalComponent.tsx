'use client';
import React, { Fragment, ReactElement, useRef, useState } from 'react';
import Image from 'next/image';
import './subModalStyling.css';
import PremiumIcon from '@/public/icons/lock-star-line.svg';

import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';

interface Props {
  withIcon?: boolean;
}

export default function SubModalComponent({ withIcon = false }: Props): ReactElement<any> | null {

  const [userBillingMethod, setUserBillingMethod] = useState<string>('monthly');
  const modalRef = useRef<HTMLDialogElement>(null);

  const changeBillingMethod = (duration: string) => {
    setUserBillingMethod(duration);
  };

  const handleDialogOpening = (): void => {
    const isModalOpen = modalRef.current;

    if (!isModalOpen?.open) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  };

  return (
    <Fragment>
      <button onClick={handleDialogOpening} className={'getPremiumButton'}>
        {withIcon ? <Image src={PremiumIcon} alt='Premium-button' /> : 'Get Premium'}
      </button>

      <dialog className="subscriptionModalContainer" ref={modalRef}>
        <div className="subModal_topLayer">
          <h1 id="subModalHeader">Get yourself unlimited Notecards.</h1>
          {/* Close Modal when the icon is clicked */}
          <Image
            id="closingModalIcon"
            src={ClosingIcon}
            alt="closeSubModal"
            onClick={handleDialogOpening}
          />
        </div>

        <div className="monthlyAndAnnuallyButtons">
          <button
            onClick={() => changeBillingMethod('monthly')}
            className={
              userBillingMethod === 'monthly' ? 'userBillingMethodChoice' : ''
            }
          >
            Monthly Billing
          </button>
          <button
            onClick={() => changeBillingMethod('annually')}
            className={
              userBillingMethod === 'annually' ? 'userBillingMethodChoice' : ''
            }
          >
            Annually Billing
          </button>
        </div>

        <div className="subscriptionPlans">
          <div className="freePlan">
            <h1 id="offerHeader">Free plan</h1>
            <p>Basic features</p>
            <div className="userDecision">
              <button id="userWantsFreePlan">
                Continue with the free plan...
              </button>
            </div>
            <hr />
            <div className="offeredFeatures">
              <h3>FEATURES</h3>
              <ul>
                <li>10 Notecards to set up.</li>
                <li>Import 3 times from your kindle.</li>
                <li>Cannot import your Tweets.</li>
                <li>Cannot Set your Notes to private.</li>
                <li>Cannot Add more than 2 Folders.</li>
                <li>Cannot Edit your Note cards more than twice.</li>
                <li>Limited Status.</li>
              </ul>
            </div>
          </div>

          <div className="premiumPlan">
            <h1 id="offerHeader">Premium plan</h1>
            <div className="price_priceMeaning">
              {userBillingMethod === 'monthly' ? (
                <p id="planPrice">
                  $1.99<span id="billingPeriod">per month.</span>
                </p>
              ) : (
                <p id="planPrice">
                  $19.99<span id="billingPeriod">annually.</span>
                </p>
              )}
            </div>

            <div className="userDecision">
              <button id="userWantsPremiumPlan">Get started</button>
              <button id="userWantsFreePlan">
                Continue with the free plan...
              </button>
            </div>
            <hr />
            <div className="offeredFeatures">
              <h3>FEATURES</h3>
              <ul>
                <li>Better memorizing outcome.</li>
                <li>Unlimited Note cards to set up.</li>
                <li>Unlimited kindle clippings import.</li>
                <li>Unlimited Tweets import.</li>
                <li>You can set your Notes to private.</li>
                <li>Unlimited number of Folders to add.</li>
                <li>
                  Advanced Statistics to keep track of your Memorization
                  process.
                </li>
              </ul>
            </div>
          </div>

          <div className="UnlimitedPlan">
            <div className="UnlimitedPlanOfferHeaders">
              <h1 id="offerHeader">Unlimited plan</h1>
              <h1 id="offerSecondaryHeader">Popular</h1>
            </div>
            <div className="price_priceMeaning">
              {userBillingMethod === 'monthly' ? (
                <p id="planPrice">
                  $4.99<span id="billingPeriod">per month.</span>
                </p>
              ) : (
                <p id="planPrice">
                  $49.99<span id="billingPeriod">annually.</span>
                </p>
              )}
            </div>

            <div className="userDecision">
              <button id="userWantsPremiumPlan">Get started</button>
              <button id="userWantsFreePlan">
                Continue with the free plan...
              </button>
            </div>
            <hr />
            <div className="offeredFeatures">
              <h3>FEATURES</h3>
              <ul>
                <li>You can use AI to help you.</li>
                <li>Everything else in the Premium plan.</li>
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}