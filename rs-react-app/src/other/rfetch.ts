import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from './interfases';

export const rfetch = createApi({
  reducerPath: 'rfetch',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<IResponse, { search?: string; page?: number }>({
      query: ({ search, page }) => `/people/?search=${search}&page=${page}`,
    }),
  }),
});

export const { useFetchPeopleQuery } = rfetch;
