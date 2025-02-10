import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteItem } from '../../redux/checkSave';
import { RootState } from '../../redux/store';

const Card: React.FC<ICard> = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');
  const dispatch = useDispatch();
  const checkId = useSelector((state: RootState) => state.checkSave.id);
  const click = () => {
    if (details) {
      searchParams.delete('details');
    } else {
      if (props.id !== undefined) {
        searchParams.set('details', props.id.toString());
      }
    }
    navigate(`/?${searchParams.toString()}`);
  };

  const clickCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      dispatch(add(Number(props.id)));
    } else {
      dispatch(deleteItem(Number(props.id)));
    }
  };
  return (
    <div className="card" onClick={click}>
      <p className="item">{props.name}</p>
      <div className="description">
        <p>Height: {props.height}</p>
        <p>Mass: {props.mass}</p>
        <p>Hair color: {props.hair_color}</p>
        <p>Skin color: {props.skin_color}</p>
      </div>
      <input
        type="checkbox"
        onClick={(e) => e.stopPropagation()}
        onChange={clickCheck}
        checked={checkId.includes(Number(props.id))}
      />
    </div>
  );
};

export default Card;
