import {createContext} from 'react';

interface ThemeContextInterface {
    themeMode: string;
    setThemeMode: (themeMode: string) => void;
}

export const themeContext = createContext<ThemeContextInterface>({
    themeMode: 'system',
    setThemeMode: () => {}
});