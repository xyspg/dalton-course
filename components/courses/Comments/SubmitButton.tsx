"use client";
import { Button } from "@/components/ui/button";
//@ts-expect-error
import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button disabled={pending}>{children}</Button>
    </>
  );
};
