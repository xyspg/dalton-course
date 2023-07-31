"use client"
import { Button } from '@/components/ui/button';

export const GoHome = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Button variant='outline' onClick={handleGoHome}>
      Home
    </Button>
  );
};
