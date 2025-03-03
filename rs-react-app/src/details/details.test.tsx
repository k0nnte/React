import { describe, expect, test, vi } from 'vitest';
import Details from './datails';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../src/other/context/theme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useFetchPeopleQuery } from '../../src/other/fetchData';
import { useTheme } from '../../src/other/context/useTheme';
import '@testing-library/jest-dom';
import {
  ReadonlyURLSearchParams,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const mockStore = configureStore({
  reducer: (state = { checkSave: { person: [] } }) => state,
});
vi.mock('next/navigation', () => ({
  useRouter: vi.fn((): { push: (path: string) => void } => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));
vi.mock('../../src/other/context/useTheme', () => ({
  useTheme: vi.fn(),
}));
vi.mock('../../src/other/fetchData', () => ({
  useFetchPeopleQuery: vi.fn(),
}));

describe('test Details', () => {
  test('test btn close', () => {
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockPush = vi.fn();
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => 'page=1'),
    } as unknown as ReadonlyURLSearchParams;
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });
  test('test Loading', () => {
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: true,
      refetch: vi.fn(),
    };
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => 'page=1'),
    } as unknown as ReadonlyURLSearchParams;
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
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
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => 'page=1'),
    } as unknown as ReadonlyURLSearchParams;
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
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
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => 'page=1'),
    } as unknown as ReadonlyURLSearchParams;
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
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
