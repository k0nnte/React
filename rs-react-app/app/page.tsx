import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{
    search: string;
    deteils?: string;
  }>;
}

const Main = async ({ searchParams }: PageProps) => {
  const search = (await searchParams)?.search;
  const details = (await searchParams)?.deteils;

  redirect(`/1?search=${search || ''}&deteils=${details || ''}`);

  // return null;
};

export default Main;
