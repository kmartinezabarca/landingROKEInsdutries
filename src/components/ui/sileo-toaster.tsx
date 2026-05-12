import { Toaster as SileoToaster } from 'sileo';
import { useTheme } from 'next-themes';

export const Toaster = () => {
  const { theme = 'system' } = useTheme();

  return (
    <SileoToaster
      theme={theme as 'light' | 'dark' | 'system'}
      position="top-right"
    />
  );
};
