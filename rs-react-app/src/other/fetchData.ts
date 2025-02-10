// const fetchData = async (id: string) => {
//   const result = await fetch(`https://swapi.dev/api/people/${id}/`);
//   const data = await result.json();
//   return data;
// };

// export default fetchData;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Irez } from './interfases';

export const fetchData = createApi({
  reducerPath: 'fetchData',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<Irez, { id: number }>({
      query: ({ id }) => `/people/${id}/`,
    }),
  }),
});

export const { useFetchPeopleQuery } = fetchData;
