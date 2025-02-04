import React, { useState, useEffect } from 'react';
import rfetch from '../other/rfetch';
import { ResponseProps, Person } from '../other/interfases';
import Card from './card/card';
import './response.css';
import Loading from '../other/Loading/Loading';

const Response: React.FC<ResponseProps> = ({ search }) => {
  const [data, setData] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorband, setErrorband] = useState(false);

  const clickError = () => {
    setErrorband(true);
  };

  const fetchData = async (search: string) => {
    const result = await rfetch(search);
    if ('error' in result) {
      setError(result.error);
      setData(null);
    } else {
      setData(result.results);
      setError(null);
    }
  };

  useEffect(() => {
    setData(null);
    fetchData(search);
  }, [search]);

  if (errorband) {
    throw new Error('Error');
  }

  return (
    <div className="response_wrapper">
      {error ? (
        <div className="response_other">
          <p>Error: {error}</p>
        </div>
      ) : !data ? (
        <div className="response_other">
          <Loading />
        </div>
      ) : (
        <div className="response">
          {data.map((person) => (
            <Card key={person.name} {...person} />
          ))}
        </div>
      )}
      <button className="error_btn" onClick={clickError}>
        Error button
      </button>
    </div>
  );
};

export default Response;
