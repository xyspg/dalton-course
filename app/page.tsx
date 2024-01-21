import CoursePage from '@/app/components/CoursePage';
import Footer from '@/components/Footer';
import PageLayout from './pageLayout';
import {Button} from "@/components/ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { FileIcon } from "@radix-ui/react-icons";
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <PageLayout>
      <main className='min-h-screen flex flex-col'>
        <CoursePage />
        <div className='mt-auto mb-2'>
            <Button variant={"outline"} className='relative flex flex-row gap-2 items-center'>
                <Link href="/print" className='absolute inset-0' target='_blank' />
                Download PDF
                <OpenInNewWindowIcon />
            </Button>
          <Footer />
        </div>
      </main>
    </PageLayout>
  );
}
