import React, { useState } from 'react';
import { useFetchPeopleQuery } from '../other/rfetch';
import { ResponseProps, Person } from '../other/interfases';
import Card from './card/card';
import './response.css';
import Loading from '../other/Loading/Loading';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';

const Response: React.FC<ResponseProps> = ({ search }) => {
  const itemInPage = 10;
  // const [data, setData] = useState<Person[] | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [errorband, setErrorband] = useState(false);
  // const [count] = useState<number>(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || '1');

  const clickError = () => {
    setErrorband(true);
  };

  const { data, error, isFetching } = useFetchPeopleQuery({ search, page });

  // const fetchData = async (search: string, pages: number) => {
  //   const result = await rfetch(search, pages);
  //   if ('error' in result) {
  //     setError(result.error);
  //     setData(null);
  //   } else {
  //     setCount(result.count);
  //     setData(result.results);
  //     setError(null);
  //   }
  // };

  const clickprev = () => {
    navigate(`?page=${Number(page) - 1}`);
  };

  const clicknext = () => {
    navigate(`?page=${Number(page) + 1}`);
  };
  // useEffect(() => {
  //   setData(null);
  //   fetchData(search, page ? Number(page) : 1);
  // }, [page, search]);

  const totalPages = data ? Math.ceil(data.count / itemInPage) : 0;

  if (errorband) {
    throw new Error('Error');
  }

  return (
    <div className="response_wrapper">
      {error ? (
        <div className="response_other">
          <p>Error: {error.toString()}</p>
        </div>
      ) : isFetching ? (
        <div className="response_other">
          <Loading />
        </div>
      ) : data?.results.length === 0 ? (
        <div>
          <p>Not Found</p>
        </div>
      ) : (
        <div className="response">
          <div className="response_left">
            {data?.results.map((person: Person, index: number) => (
              <Card
                key={person.name}
                {...person}
                id={`${Number(page) > 0 ? (Number(page) - 1) * itemInPage + index + 1 : index + 1}`}
              />
            ))}
            <div className="wrapper_pagination">
              <button
                className="btn_pagination"
                onClick={clickprev}
                disabled={Number(page) <= 1}
              >
                prev
              </button>
              <button
                className="btn_pagination"
                onClick={clicknext}
                disabled={Number(page) >= totalPages}
              >
                next
              </button>
            </div>
          </div>
          <div className="response_rigth">
            <Outlet />
          </div>
        </div>
      )}

      <button className="error_btn" onClick={clickError}>
        Error button
      </button>
    </div>
  );
};

export default Response;
