export interface Iform {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  coutry: string;
  gender: 'male' | 'female';
  image: File | null | string;
  agree: boolean;
}
