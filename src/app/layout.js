import '@/styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'Dream Intimacies - Wedding Photography & Cinematography',
  description: 'Crafting timeless wedding memories across Bengal and beyond. Professional wedding photography, pre-wedding shoots, and cinematic films.',
  keywords: 'wedding photography, Bangladesh, Dhaka, cinematography, pre-wedding, bridal, Dream Intimacies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
