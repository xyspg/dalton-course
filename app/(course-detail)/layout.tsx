import Header from '@/components/Header';


export default function CourseDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col min-h-screen px-4 pt-4 md:px-12 md:pt-12 w-screen'>
      {children}
    </section>
  );
}
