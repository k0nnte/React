export interface TopProps {
  search: string;
  onSearch: (newData: string) => void;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

export interface IResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface IError {
  error: string;
}

export interface ResponseState {
  data: Person[] | null;
  error: string | null;
  errorband: boolean;
}

export interface ResponseProps {
  search: string;
}

export interface ICard {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
