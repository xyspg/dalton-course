import CoursePage from '@/app/_components/CoursePage';
import Footer from '@/components/Footer';
import PageLayout from './pageLayout';

export default async function Home() {
  return (
    <PageLayout>
      <main className='min-h-screen flex flex-col'>
        <CoursePage />
        <div className='mt-auto mb-2'>
          <Footer />
        </div>
      </main>
    </PageLayout>
  );
}
