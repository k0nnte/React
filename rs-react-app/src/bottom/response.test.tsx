import { beforeEach, describe, expect, test, vi } from 'vitest';
import Response from './response';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../other/context/theme';
import { destroy } from '../redux/checkSave';
import { configureStore } from '@reduxjs/toolkit';
import { useFetchPeopleQuery } from '../other/rfetch';
import '@testing-library/jest-dom';

const dispatch = vi.fn();
const saveas = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => dispatch,
  };
});

vi.mock(import('../other/rfetch'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useFetchPeopleQuery: vi.fn(),
  };
});
const mockpush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { page: '1' },
    push: mockpush,
    pathname: '/',
    isReady: true,
  })),
}));

vi.mock('file-saver', () => ({
  saveAs: () => saveas,
}));

describe('test response', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('click error', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: { person: [] },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    expect(() => {
      fireEvent.click(screen.getByText('Error button'));
    }).toThrow();
  });
  test('destroy btn', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: { person: [] },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    const unselectButton = screen.getByText('Unselect all');

    fireEvent.click(unselectButton);
    expect(dispatch).toHaveBeenCalledWith(destroy());
  });
  test('donload btn', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: { person: [] },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: null,
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);
    expect(saveas).not.toHaveBeenCalled();
  });
  test('click next', () => {
    const result = [
      { id: 1, name: 'Test Person' },
      { id: 2, name: 'Test Person' },
      { id: 1, name: 'Test Person' },
      { id: 3, name: 'Test Person' },
      { id: 4, name: 'Test Person' },
      { id: 5, name: 'Test Person' },
      { id: 6, name: 'Test Person' },
      { id: 7, name: 'Test Person' },
      { id: 8, name: 'Test Person' },
      { id: 9, name: 'Test Person' },
      { id: 10, name: 'Test Person' },
      { id: 11, name: 'Test Person' },
    ];

    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: {
            person: [],
          },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: {
        results: result,
      },
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('next'));
    expect(mockpush).toBeCalled();
  });
  test('not found', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: {
            person: [],
          },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: {
        results: [],
      },
      isFetching: false,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
  test('error response', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: {
            person: [],
          },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: {
        results: [],
      },
      isFetching: false,
      error: 'oops',
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Error: oops')).toBeInTheDocument();
  });
  test('Loading', () => {
    const mockStore = configureStore({
      reducer: (
        state = {
          checkSave: {
            person: [],
          },
          searchSave: {
            search: 'test',
          },
        }
      ) => state,
    });
    const mockuseFetchPeopleQuery = {
      data: {
        results: [],
      },
      isFetching: true,
      refetch: vi.fn(),
    };
    vi.mocked(useFetchPeopleQuery).mockReturnValue(mockuseFetchPeopleQuery);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });
});
