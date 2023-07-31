import CoursePage from '@/components/courses/CoursePage';
import Footer from '@/components/Footer';
import Head from 'next/head';
export default async function Home() {
  return (
    <>
      <main className='min-h-screen flex flex-col'>
        <CoursePage />
        <div className='mt-auto mb-2'>
          <Footer />
        </div>
      </main>
    </>
  );
}
