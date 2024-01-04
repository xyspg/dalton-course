"use client";
import React, { useEffect } from "react";

const PrintImmediately = () => {
  useEffect(() => {
    window.print();
  }, []);

  return null;
};

export const PrintButton = () => {
  return (
      <p className='flex flex-row'>
          <span>Please wait while your printing starts. If it doesn&apos;t start please&nbsp;</span>{' '}
        <button
            className="underline"
            onClick={() => {
              window.print()
            }}
        >
          click here
        </button>
      </p>

  );
};

export default PrintImmediately;
