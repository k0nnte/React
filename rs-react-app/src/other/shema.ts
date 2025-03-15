import * as yup from 'yup';
import { Iform } from './interfase';

const shema: yup.ObjectSchema<Iform> = yup.object().shape({
  name: yup
    .string()
    .required('Поле обязательно для ввода')
    .matches(/^[А-ЯA-Z]/, {
      message: 'Имя должно начинаться с заглавной буквы',
      excludeEmptyString: true,
    }),

  age: yup
    .number()
    .required('Поле обязательно для ввода')
    .typeError('Введите число')
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть целым числом'),

  email: yup
    .string()
    .required('Поле обязательно для ввода')
    .email('Некорректный email'),

  password1: yup
    .string()
    .required('Поле обязательно для ввода')

    .matches(/[A-Z]/, 'Добавьте заглавную букву')
    .matches(/[a-z]/, 'Добавьте строчную букву')
    .matches(/[0-9]/, 'Добавьте цифру')
    .matches(/[\W]/, 'Добавьте спец. символ')
    .min(8, 'Минимум 8 символов'),

  password2: yup
    .string()
    .required('Поле обязательно для ввода')
    .oneOf([yup.ref('password1')], 'Пароли не совпадают'),

  coutry: yup.string().required('Поле обязательно для ввода'),
  image: yup
    .mixed<File | string>()
    .test('fileRequired', 'Загрузите изображение', (value) => {
      if (value instanceof File) {
        return value.size > 0;
      }
    }),

  gender: yup
    .mixed<'male' | 'female'>()
    .required('Обязательное поле')
    .oneOf(['male', 'female'], 'Выберите пол'),

  agree: yup
    .boolean()
    .required('Необходимо согласие с условиями')
    .isTrue('Необходимо согласие с условиями'),
}) as unknown as yup.ObjectSchema<Iform>;

export default shema;
