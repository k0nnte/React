const fetchData = async (id: string) => {
  const result = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = await result.json();
  return data;
};

export default fetchData;
