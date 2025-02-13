import {ReactNode, useEffect, useState} from "react";

import {themeContext} from "@/app/wide-state-management/AppThemeContext";

export default function ThemeProvider({children}: {children: ReactNode}){
    const [themeMode, setThemeMode] = useState<string>('system');

    // to apply preferred theme or system default
    useEffect(() => {
        const applyTheme = (mode: string): void => {
            if(mode === 'light'){
                document.documentElement.setAttribute('data-theme', 'light');
            }else if(mode === 'dark'){
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        // get saved theme from localstorage or default to 'system'
        const savedTheme = localStorage.getItem('themeMode') || 'system';
        setThemeMode(savedTheme);

        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        if (themeMode === 'system') {
            // apply system preference
            applyTheme(systemDarkMode.matches ? 'dark' : 'light');

            // to listen for changes in system theme
            const systemThemeListener = (e: MediaQueryListEvent) => {
                applyTheme(e.matches ? 'dark' : 'light');
            };
            systemDarkMode.addEventListener('change', systemThemeListener);

            return () => {
                systemDarkMode.removeEventListener('change', systemThemeListener);
            };
        } else {
            // Apply user-defined theme ('light' or 'dark')
            applyTheme(themeMode);
        }
    }, [themeMode]);

    const handleThemeModeChange = (themeMode: string): void => {
        setThemeMode(themeMode);
        localStorage.setItem('themeMode', themeMode);
    }

    return (
        <themeContext.Provider value={{themeMode, setThemeMode: handleThemeModeChange}}>
            {children}
        </themeContext.Provider>
    )
}