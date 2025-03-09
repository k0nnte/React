import { beforeEach, describe, expect, test, vi } from 'vitest';
import Response from './response';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../other/context/theme';
import { destroy } from '../redux/checkSave';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';

const dispatch = vi.fn();
const saveas = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => dispatch,
  };
});
const mockpush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn((): { push: (path: string) => void } => ({
    push: mockpush,
  })),
  useSearchParams: vi.fn(),
  useParams: vi.fn(() => ({
    id: '1',
  })),
}));

vi.mock('file-saver', () => ({
  saveAs: () => saveas,
}));

const mockData = {
  count: 11,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
    {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
    },
  ],
};

vi.mock('next/link', () => {
  return {
    default: ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => <a href={href}>{children}</a>,
  };
});

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
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn(),
      append: vi.fn(),
      delete: vi.fn(),
      set: vi.fn(),
      sort: vi.fn(),
      size: 0,
      getAll: vi.fn(),
      has: vi.fn(),
      forEach: vi.fn(),
      entries: vi.fn(),
      keys: vi.fn(),
      values: vi.fn(),
      [Symbol.iterator]: vi.fn(),
    });
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockData} page={1} search="" />
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

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockData} page={1} search="" />
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
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockData} page={1} search="" />
        </ThemeProvider>
      </Provider>
    );
    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);
    expect(saveas).not.toHaveBeenCalled();
  });
  test('click next', () => {
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
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockData} page={1} search="" />
        </ThemeProvider>
      </Provider>
    );
    const nextButton = screen.getByText('next');

    const linkElement = nextButton.closest('a');
    expect(linkElement).toHaveAttribute('href', '/2?search=');
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

    const mocknulldata = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mocknulldata} page={1} search="" />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
  test('click prev', () => {
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
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockData} page={2} search="" />
        </ThemeProvider>
      </Provider>
    );
    const nextButton = screen.getByText('prev');

    const linkElement = nextButton.closest('a');
    expect(linkElement).toHaveAttribute('href', '/1?search=');
  });
  test('test error', () => {
    const mockError = null;
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
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Response data={mockError} page={1} search="" />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
