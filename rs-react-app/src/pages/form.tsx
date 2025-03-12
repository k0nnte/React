import '../style/formOne.css';

const NForm = () => {
  return (
    <div className="wrapper_form">
      <form className="form_one">
        <label className="form_group">
          Имя:
          <input type="text" name="name" className="input_big" />
        </label>

        <label className="form_group">
          Возраст:
          <input type="number" name="age" className="input_big" />
        </label>

        <label className="form_group">
          Email:
          <input type="email" name="email" className="input_big" />
        </label>

        <label className="form_group">
          Пароль:
          <input type="password" name="password1" className="input_big" />
        </label>

        <label className="form_group">
          Повторите пароль:
          <input type="password" name="password2" className="input_big" />
        </label>

        <label className="form_group">
          Пол:
          <label className="form_radio">
            <input type="radio" name="gender" value="male" /> Мужской
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Женский
          </label>
        </label>

        <label className="form_group">
          <input type="checkbox" name="agree" /> Я принимаю условия
        </label>

        <label className="form_group">
          Загрузить изображение:
          <input type="file" name="image" accept="image/png, image/jpeg" />
        </label>
      </form>
    </div>
  );
};

export default NForm;
