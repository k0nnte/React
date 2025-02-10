import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Irez } from '../../other/interfases';
import load from '../../assets/loadtwo.gif';
import './details.css';
import { useFetchPeopleQuery } from '../../other/fetchData';

const Details: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get('details');
  // const [rez, setRez] = useState<Irez | null>(null);

  const { data, isFetching } = useFetchPeopleQuery({
    id: Number(details),
  });

  const click = () => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`);
  };

  // useEffect(() => {
  //   if (details) {
  //     fetchData(details).then((data) => {
  //       setRez(data);
  //     });
  //   }
  // }, [details]);

  return (
    <>
      {isFetching ? (
        <img className="loadtwo" src={load} alt="Loading..." />
      ) : (
        <div className="details">
          <p>name {data?.name}</p>
          <p>birth_year {data?.birth_year}</p>
          <p>Height: {data?.height}</p>
          <p>Mass: {data?.mass}</p>
          <p>Hair color: {data?.hair_color}</p>
          <p>Skin color: {data?.skin_color}</p>
          <p>Skin eye: {data?.eye_color}</p>

          <button className="btn_close" onClick={click}>
            close
          </button>
        </div>
      )}
    </>
  );
};
export default Details;
