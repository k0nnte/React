// import { IResponse, IError } from './interfases';

// async function rfetch(
//   search?: string,
//   page?: number
// ): Promise<IResponse | IError> {
//   const url = `https://swapi.dev/api/people/?search=${search}&page=${page}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Error fetching data');
//     }
//     const data: IResponse = await response.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//     return { error: (error as Error).message };
//   }
// }

// export default rfetch;

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
