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
