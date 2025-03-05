import { GetServerSideProps } from 'next';
import { Irez } from './interfases';

interface FetchPersonProps {
  data: Irez | null;
  error: boolean;
  page: string;
}

export const fetchPersonData: GetServerSideProps<FetchPersonProps> = async (
  context
) => {
  const { id, page } = context.query;
  let data = null;
  let error = false;
  try {
    const res = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!res.ok) {
      return {
        props: {
          data: null,
          error: true,
          page: (page as string) || '',
        },
      };
    }
    data = await res.json();
  } catch (err) {
    console.error(err);
    error = true;
  }

  return {
    props: {
      data,
      error,
      page: (page as string) || '',
    },
  };
};
