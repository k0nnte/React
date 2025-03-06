import Response from '@/src/bottom/response';
import Details from '@/src/details/datails';
import { IResponse, Irez } from '@/src/other/interfases';

interface Pages {
  data: IResponse | null;
  details: Irez | null;
  pages: number;
  search: string;
}

const Page = ({ data, details, pages, search }: Pages) => {
  return (
    <>
      <Response data={data} page={pages} search={search} />
      {details && <Details data={details} page={pages} search={search} />}
    </>
  );
};

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
  const data = await res.json();

  let detailsData = null;

  if (deteils) {
    const detailsRes = await fetch(`https://swapi.dev/api/people/${deteils}/`);
    detailsData = await detailsRes.json();
  }

  return { props: { data, details: detailsData, pages, search } };
}
