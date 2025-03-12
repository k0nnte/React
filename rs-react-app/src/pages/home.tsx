import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <nav>
        <ul>
          <li>
            <Link to="/form">Форма из неконтролируемых компонентов</Link>
          </li>
          <li>
            <Link to="/hookform">Форма из React Hook Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
