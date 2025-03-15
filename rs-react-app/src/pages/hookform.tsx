import { SubmitHandler, useForm } from 'react-hook-form';
import { Iform } from '../other/interfase';
import { yupResolver } from '@hookform/resolvers/yup';
import shema from '../other/shema';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../redux/coutry';
import { useEffect } from 'react';
import { updateFormtwo } from '../redux/formTwo';
import { useNavigate } from 'react-router-dom';

const Hookform = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Iform>({
    resolver: yupResolver(shema),
    mode: 'all',
  });
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      trigger('image');
    }
  };
  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<Iform> = async (data) => {
    if (data.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedData = { ...data, image: base64String };
        dispatch(updateFormtwo(updatedData));
      };
      reader.readAsDataURL(data.image);
      navigate('/');
    }
  };

  return (
    <div className="wrapper_form">
      <form className="form_one" onSubmit={handleSubmit(onSubmit)}>
        <label className="form_group">
          Имя:
          <span className="error">{errors.name?.message || '\u00A0'}</span>
          <input type="text" {...register('name')} className="input_big" />
        </label>

        <label className="form_group">
          Возраст:
          <span className="error">{errors.age?.message || '\u00A0'}</span>
          <input type="number" {...register('age')} className="input_big" />
        </label>

        <label className="form_group">
          Email:
          <span className="error">{errors.email?.message || '\u00A0'}</span>
          <input type="email" {...register('email')} className="input_big" />
        </label>

        <label className="form_group">
          Пароль:
          <span className="error">{errors.password1?.message || '\u00A0'}</span>
          <input
            type="password"
            {...register('password1')}
            className="input_big"
          />
        </label>

        <label className="form_group">
          Повторите пароль:
          <span className="error">{errors.password2?.message || '\u00A0'}</span>
          <input
            type="password"
            {...register('password2')}
            className="input_big"
          />
        </label>

        <label className="form_group">
          Страна:
          <span className="error">{errors.coutry?.message || '\u00A0'}</span>
          <input
            type="text"
            list="country-list"
            {...register('coutry')}
            className="input_big"
          />
          <datalist id="country-list">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="form_group">
          Пол:
          <span className="error">{errors.gender?.message || '\u00A0'}</span>
          <div>
            <label>
              <input type="radio" value="male" {...register('gender')} />
              Мужской
            </label>
            <label>
              <input type="radio" value="female" {...register('gender')} />
              Женский
            </label>
          </div>
        </label>

        <label className="form_group">
          <input type="checkbox" {...register('agree')} />Я принимаю условия
          <span className="error">{errors.agree?.message || '\u00A0'}</span>
        </label>

        <label className="form_group">
          Загрузить изображение:
          <span className="error">{errors.image?.message || '\u00A0'}</span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Hookform;
