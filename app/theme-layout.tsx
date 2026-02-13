"use client";

import { useTheme } from 'next-themes';
import { StarsBackground } from "@/src/components/animate-ui/components/backgrounds/stars";
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Navbar } from "../components/site/navbar";
import { Footer } from "../components/site/footer";

export function ThemedLayout({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple loading state until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4">{children}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Stars background - behind everything */}
      <StarsBackground
        starColor={mounted && resolvedTheme === 'dark' ? '#FFF' : '#000'}
        className={cn(
          'fixed inset-0 -z-10',
          'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]',
        )}
      />
      
      {/* Content - in front, clickable */}
      <div className="relative z-10">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
}