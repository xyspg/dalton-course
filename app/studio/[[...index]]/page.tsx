import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio/metadata';

import { Studio } from './Studio';
import Link from "next/link";

// Set the right `viewport`, `robots` and `referer` meta tags
export const metadata: Metadata = {
  ...studioMetadata,
  // Overrides the viewport to resize behavior
  viewport: `${studioMetadata.viewport}, interactive-widget=resizes-content`,
};

export default function StudioPage() {
  return (
    <>
      {/*<div className="h-8 text-sm flex justify-center items-center">*/}
      {/*  <Link href="/" className='underline'>Go Back to Main Site</Link>*/}
      {/*</div>*/}
      <Studio />
    </>
  );
}
