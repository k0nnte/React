import { Irez } from '@/src/other/interfases';
import Page from '@/src/other/page';

export default Page;

export async function getServerSideProps(context: {
  params: { id: number };
  query: { deteils: Irez | null; search: string };
}) {
  const pages = context.params.id || '1';
  const { deteils, search = '' } = context.query;

  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search || ''}&page=${pages || `1`}`
  );

  if (!res.ok) {
    return { props: {} };
  }
  const data = await res.json();

  let detailsData = null;

  if (deteils) {
    const detailsRes = await fetch(`https://swapi.dev/api/people/${deteils}/`);
    if (!detailsRes.ok) {
      return { props: {} };
    }
    detailsData = await detailsRes.json();
  }

  return { props: { data, details: detailsData, pages, search } };
}
