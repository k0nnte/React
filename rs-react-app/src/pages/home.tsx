import { Link } from 'react-router-dom';
import '../style/home.css';
import { formOne } from '../redux/formOne';
import Deteil from '../component/detail';
import { useSelector } from 'react-redux';
import { Iform } from '../other/interfase';
import { formTwo } from '../redux/formTwo';

const Home = () => {
  const form1 = useSelector(formOne) as Partial<Iform>;
  const form2 = useSelector(formTwo) as Partial<Iform>;
  return (
    <>
      <div className="top_wrapper">
        <div className="wrapper_links">
          <h1>Главная страница</h1>
          <nav>
            <ul className="navigate">
              <li>
                <Link to="/form">Форма из неконтролируемых компонентов</Link>
              </li>
              <li>
                <Link to="/hookform">Форма из React Hook Form</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="result">
        {form1 && Object.keys(form1).length > 0 && <Deteil data={form1} />}
        {form2 && Object.keys(form2).length > 0 && <Deteil data={form2} />}
      </div>
    </>
  );
};

export default Home;
