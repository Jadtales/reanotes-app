'use client';

import ThemeProvider from '../utils/providers/ThemeProvider';
import Footer from '@/app/compos/footer/Footer';
import Navbar from '@/app/compos/navbar/Navbar';
import NotificationUserProfileNavbar from '@/app/compos/navbar/navbar-screen-sizes/NotificationUserProfileNavbar';
import SearchInputFieldProvider from '@/utils/providers/searchInputFieldProvider';
import './globals.css';
import AddNoteComponentButton from './compos/add-note-button-Compo/AddNoteButtonComponent';
import NavbarUserProfile from './compos/navbar/navbar_microComponents/navbar-user-profile';
import ReanotesNavbarIcon from './compos/navbar/reanotes-icon/reanotes-navbar-icon';
import VerticalNavbar from './compos/navbar/vertical-navbar/vertical-navbar';
import FoldersStateManagerContext from '@/app/wide-state-management/FoldersState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

// routes
const routes = [
  '/home',
  '/browse',
  '/stats',
  '/settings',
  '/profile',
  '/',
  '/create-notecard',
  '/shared-content',
];

const queryClient = new QueryClient();

export const existingFolders: string[] = ['poetry', 'fiction'];

export default function HomeLayout({ children }: { children: ReactNode }) {
  // todo: implement user authentication check

  // const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);
  const [isReanotesNavbarClicked, setIsReanotesNavbarClicked] =
    useState<boolean>(false);
  const [theme, setTheme] = useState('');

  const isInPhoneSize = useMediaQuery('(width <= 700px)');

  const pathname = usePathname();
  // const router = useRouter();

  const isHighlightsReviewPage =
    pathname.startsWith('/highlightsreview') ||
    pathname.startsWith('/registration') ||
    pathname.startsWith('/shared-content');
  const isInLandingPage = routes.some((route) => pathname.startsWith(route));

  // // check user token
  // useEffect(() => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (!accessToken && !pathname.startsWith('/registration')){
  //         router.push('/');
  //         return;
  //     }
  //
  //     if(!accessToken && !pathname.startsWith('/')){
  //         setIsUserLoggedIn(false);
  //         router.push('/registration');
  //     }else{
  //         setIsUserLoggedIn(true)
  //     }
  // }, [router]);

  // set current theme mode

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(matchMedia.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <html lang={'en'}>
      <body>
        <NextTopLoader
          color={theme === 'dark' ? '#e1e1e16b' : '#000000'}
          height={2}
          speed={600}
          showSpinner={false}
        />

        <ThemeProvider>
          <FoldersStateManagerContext value={existingFolders}>
            <SearchInputFieldProvider>
              <QueryClientProvider client={queryClient}>
                {!isHighlightsReviewPage && (
                  <>
                    {/* {isInPhoneSize && (
                      <NavbarUserProfile
                        phoneScreenSize={true}
                        userProfileWidth={35}
                      />
                    )} */}

                    {isInPhoneSize && (
                      <ReanotesNavbarIcon
                        getIsReanotesButtonClicked={setIsReanotesNavbarClicked}
                      />
                    )}
                    {/* {isInLandingPage && !isInPhoneSize && <Navbar />} */}
                  </>
                )}
                {!isHighlightsReviewPage &&
                  pathname.length > 1 &&
                  !isInPhoneSize && (
                    <VerticalNavbar
                      getIsReanotesButtonClicked={setIsReanotesNavbarClicked}
                    />
                  )}

                {isInPhoneSize &&
                  isReanotesNavbarClicked &&
                  pathname.length > 1 && (
                    <VerticalNavbar
                      getIsReanotesButtonClicked={setIsReanotesNavbarClicked}
                    />
                  )}

                <div style={{ padding: '2rem 0' }}>{children}</div>
              </QueryClientProvider>
            </SearchInputFieldProvider>
          </FoldersStateManagerContext>
          {!isHighlightsReviewPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
