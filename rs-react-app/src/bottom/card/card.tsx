import React from 'react';
import { ICard } from '../../other/interfases';
import './card.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, deleteItem } from '../../redux/checkSave';
import { RootState } from '../../redux/store';
import { useTheme } from '../../other/context/useTheme';

const Card: React.FC<ICard> = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const details = searchParams.get('details');
  const dispatch = useDispatch();
  const checkId = useSelector((state: RootState) => state.checkSave.person);
  const { theme } = useTheme();
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
      dispatch(add(props));
    } else {
      dispatch(deleteItem(props));
    }
  };
  return (
    <div className={theme === 'white' ? 'card' : 'card black'} onClick={click}>
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
        checked={checkId.some((id) => id.id === props.id)}
      />
    </div>
  );
};

export default Card;
