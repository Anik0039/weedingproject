'use client';
import { createContext, useContext, useState, useCallback } from 'react';

export const THEMES = {
  rose: {
    name: 'Red Rose',
    primary: '#b5243a',
    light: '#d44058',
    dark: '#7a1528',
    glow: 'rgba(232,80,104,0.19)',
    bg: '#0d0607',
    bgCard: '#140a0c',
    bgCard2: '#1a0d10',
    cream: '#faf0f0',
    creamDim: 'rgba(250,240,240,0.53)',
    creamFaint: 'rgba(250,240,240,0.27)',
    scrollThumb: 'rgba(139,26,43,0.53)',
    tint: 'rgba(120,15,30,0.12)',
    dot: '#b5243a',
  },
  plum: {
    name: 'Royal Plum',
    primary: '#8b2f8b',
    light: '#b84db8',
    dark: '#5c1a5c',
    glow: 'rgba(184,77,184,0.19)',
    bg: '#0a060d',
    bgCard: '#100a14',
    bgCard2: '#150d1a',
    cream: '#f5f0fa',
    creamDim: 'rgba(245,240,250,0.53)',
    creamFaint: 'rgba(245,240,250,0.27)',
    scrollThumb: 'rgba(139,47,139,0.53)',
    tint: 'rgba(80,15,80,0.12)',
    dot: '#8b2f8b',
  },
  blush: {
    name: 'Soft Blush',
    primary: '#c76b8a',
    light: '#e08da8',
    dark: '#8f4562',
    glow: 'rgba(224,141,168,0.19)',
    bg: '#0d0809',
    bgCard: '#140d0f',
    bgCard2: '#1a1013',
    cream: '#faf2f4',
    creamDim: 'rgba(250,242,244,0.53)',
    creamFaint: 'rgba(250,242,244,0.27)',
    scrollThumb: 'rgba(199,107,138,0.53)',
    tint: 'rgba(140,50,80,0.12)',
    dot: '#c76b8a',
  },
  wine: {
    name: 'Deep Wine',
    primary: '#722f37',
    light: '#9c4a54',
    dark: '#4a1520',
    glow: 'rgba(156,74,84,0.19)',
    bg: '#080405',
    bgCard: '#0f0a0b',
    bgCard2: '#150e10',
    cream: '#f5eded',
    creamDim: 'rgba(245,237,237,0.53)',
    creamFaint: 'rgba(245,237,237,0.27)',
    scrollThumb: 'rgba(114,47,55,0.53)',
    tint: 'rgba(80,15,25,0.12)',
    dot: '#722f37',
  },
  mauve: {
    name: 'Lavender Love',
    primary: '#7b5ea7',
    light: '#9f82c7',
    dark: '#553d78',
    glow: 'rgba(159,130,199,0.19)',
    bg: '#08070d',
    bgCard: '#0e0c14',
    bgCard2: '#13101a',
    cream: '#f3f0fa',
    creamDim: 'rgba(243,240,250,0.53)',
    creamFaint: 'rgba(243,240,250,0.27)',
    scrollThumb: 'rgba(123,94,167,0.53)',
    tint: 'rgba(70,40,110,0.12)',
    dot: '#7b5ea7',
  },
  burgundy: {
    name: 'Burgundy Gold',
    primary: '#8c2040',
    light: '#b83858',
    dark: '#5e1028',
    glow: 'rgba(184,56,88,0.19)',
    bg: '#0a0506',
    bgCard: '#12090c',
    bgCard2: '#180c10',
    cream: '#faf0ee',
    creamDim: 'rgba(250,240,238,0.53)',
    creamFaint: 'rgba(250,240,238,0.27)',
    scrollThumb: 'rgba(140,32,64,0.53)',
    tint: 'rgba(100,15,35,0.12)',
    dot: '#8c2040',
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('rose');
  const theme = THEMES[themeKey];
  const setTheme = useCallback((key) => setThemeKey(key), []);
  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
