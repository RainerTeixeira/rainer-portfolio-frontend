'use client';

import { cn } from '@/lib/utils';
import { SHADOWS } from '@rainer/design-tokens';
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border',
            SHADOWS.LARGE,
            'dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:border-cyan-400/20'
          ),
          title: 'dark:text-gray-100',
          description:
            'group-[.toast]:text-muted-foreground dark:text-gray-400',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error: 'dark:bg-red-900/20 dark:border-red-400/30',
          success: 'dark:bg-green-900/20 dark:border-green-400/30',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
