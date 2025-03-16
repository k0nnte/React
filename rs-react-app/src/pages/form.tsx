import React, { useRef, useState } from 'react';
import '../style/formOne.css';
import { Iform } from '../other/interfase';
import shema from '../other/shema';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../redux/formOne';
import { selectCountries } from '../redux/coutry';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const NForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Iform, string>>>(
    {}
  );

  const dispatch = useDispatch();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const countries = useSelector(selectCountries);
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setErrors((prev) => ({ ...prev, image: 'Только PNG или JPEG' }));
        return;
      }

      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clickSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data: Iform = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password1: formData.get('password1') as string,
      password2: formData.get('password2') as string,
      coutry: country,
      gender: formData.get('gender') as 'male' | 'female',
      agree: formData.get('agree') === 'on',
      image: imageBase64 ? imageBase64 : (formData.get('image') as File),
    };

    try {
      await shema.validate(data, { abortEarly: false });

      setErrors({});
      dispatch(updateForm(data));
      navigate('/');
    } catch (valerror) {
      const formErrors: Partial<Record<keyof Iform, string>> = {};
      (valerror as yup.ValidationError).inner.forEach((error) => {
        formErrors[error.path as keyof Iform] = error.message;
      });
      setErrors(formErrors);
    }
  };
  return (
    <div className="wrapper_form">
      <form className="form_one" ref={formRef} onSubmit={clickSubmit}>
        <label className="form_group">
          Имя:
          <span className="error">{errors.name || '\u00A0'}</span>
          <input type="text" name="name" className="input_big" />
        </label>

        <label className="form_group">
          Возраст:
          <span className="error">{errors.age || '\u00A0'}</span>
          <input type="number" name="age" className="input_big" />
        </label>

        <label className="form_group">
          Email:
          <span className="error">{errors.email || '\u00A0'}</span>
          <input type="email" name="email" className="input_big" />
        </label>

        <label className="form_group">
          Пароль:
          <span className="error">{errors.password1 || '\u00A0'}</span>
          <input type="password" name="password1" className="input_big" />
        </label>

        <label className="form_group">
          Повторите пароль:
          <span className="error">{errors.password2 || '\u00A0'}</span>
          <input type="password" name="password2" className="input_big" />
        </label>
        <label className="form_group">
          Страна:
          <span className="error">{errors.coutry || '\u00A0'}</span>
          <input
            type="text"
            name="country"
            className="input_big"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            list="country-list"
          />
          <datalist id="country-list">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="form_group">
          Пол:
          <span className="error">{errors.gender || '\u00A0'}</span>
          <label className="form_radio">
            <input type="radio" name="gender" value="male" /> Мужской
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Женский
          </label>
        </label>

        <label className="form_group">
          <span className="error">{errors.agree || '\u00A0'}</span>
          <input type="checkbox" name="agree" /> Я принимаю условия
        </label>

        <label className="form_group">
          Загрузить изображение:
          <span className="error">{errors.image || '\u00A0'}</span>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit">click</button>
      </form>
    </div>
  );
};

export default NForm;
