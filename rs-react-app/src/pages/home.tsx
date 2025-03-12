import { Link } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
  return (
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
  );
};

export default Home;
