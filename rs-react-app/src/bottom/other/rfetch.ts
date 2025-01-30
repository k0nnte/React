interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

async function rfetch(search: string): Promise<IResponse> {
  const url = 'https://swapi.dev/api/people/?search=' + search;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results);
  return data;
}

export default rfetch;
