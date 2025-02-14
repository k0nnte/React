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
