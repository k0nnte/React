import { beforeEach, describe, expect, test, vi } from 'vitest';
import Details from './datails';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../src/other/context/theme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useFetchPeopleQuery } from '../../src/other/fetchData';
import { useTheme } from '../../src/other/context/useTheme';
import '@testing-library/jest-dom';
const mockStore = configureStore({
  reducer: (state = { checkSave: { person: [] } }) => state,
});
// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn((): { push: (path: string) => void } => ({
//     push: vi.fn(),
//   })),
//   useSearchParams: vi.fn(),
//   useParams: vi.fn(),
// }));
vi.mock('../../src/other/context/useTheme', () => ({
  useTheme: vi.fn(),
}));
vi.mock('../../src/other/fetchData', () => ({
  useFetchPeopleQuery: vi.fn(),
}));

const mockpush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { page: '1' },
    push: mockpush,
    pathname: '/',
    isReady: true,
  })),
}));

describe('test Details', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('test btn close', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };

    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(mockpush).toHaveBeenCalledWith('/?page=1');
  });
  test('test Loading', () => {
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: true,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByAltText('Loading...'));
  });
  test('class theme', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    const divElement = screen.getByTestId('div_test');
    expect(divElement).toHaveClass('black');
  });
  test('response info', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockuseFetchPeopleQuery = {
      data: {
        name: 'test1',
        birth_year: 'test2',
      },
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('name test1')).toBeInTheDocument();
    expect(screen.getByText('birth_year test2')).toBeInTheDocument();
  });
});
