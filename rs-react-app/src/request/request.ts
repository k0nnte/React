const request = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  const response = await fetch(url);
  return await response.json();
};

export default request;
