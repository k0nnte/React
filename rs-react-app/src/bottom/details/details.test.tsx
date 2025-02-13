import { describe, expect, test, vi } from 'vitest';
import Details from './details';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '../../other/context/theme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useFetchPeopleQuery } from '../../other/fetchData';
import { useTheme } from '../../other/context/useTheme';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: (state = { checkSave: { person: [] } }) => state,
});
const navigate = vi.fn();
vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
    useSearchParams: vi.fn(),
  };
});
vi.mock('../../other/context/useTheme', () => ({
  useTheme: vi.fn(),
}));
vi.mock('../../other/fetchData', () => ({
  useFetchPeopleQuery: vi.fn(),
}));

describe('test Details', () => {
  test('test btn close', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockSetSearchParams = vi.fn();
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    const mockSearchParams = new URLSearchParams('?details=1');
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(navigate).toHaveBeenCalledWith('/?');
  });

  test('test Loading', () => {
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: true,
      refetch: vi.fn(),
    };
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams('?details=1');
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
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
    const mockSetSearchParams = vi.fn();
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    const mockSearchParams = new URLSearchParams('?details=1');
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    const divElement = screen.getByTestId('div_test');
    expect(divElement).toHaveClass('details black');
  });
  test('response info', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockSetSearchParams = vi.fn();
    const mockuseFetchPeopleQuery = {
      data: {
        name: 'test1',
        birth_year: 'test2',
      },
      isFetching: false,
      refetch: vi.fn(),
    };
    const mockSearchParams = new URLSearchParams('?details=1');
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
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
