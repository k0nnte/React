import { IResponse, IError } from './interfases';

async function rfetch(search: string): Promise<IResponse | IError> {
  const url = 'https://swapi.dev/api/people/?search=' + search;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data: IResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message };
  }
}

export default rfetch;
