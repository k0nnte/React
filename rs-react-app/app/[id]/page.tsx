import { notFound } from 'next/navigation';
import Response from '@/src/bottom/response';
import Details from '@/src/details/datails';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search: string;
    deteils?: string;
  }>;
}

async function fetchData(search: string, page: string) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search || ''}&page=${page}`
  );
  if (!res.ok) return null;
  return res.json();
}

async function fetchDetails(deteils: string) {
  console.log(deteils);

  const res = await fetch(`https://swapi.dev/api/people/${deteils}/`);
  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { search, deteils } = await searchParams;

  const data = await fetchData(search, id);
  if (!data) return notFound();

  const detailsData = deteils ? await fetchDetails(deteils) : null;

  return (
    <>
      <Response data={data} page={Number(id)} search={search} />
      {deteils && (
        <Details data={detailsData} page={Number(id)} search={search} />
      )}
    </>
  );
}
