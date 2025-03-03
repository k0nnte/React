import { beforeEach, describe, expect, test, vi } from 'vitest';
import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../../other/context/theme';
import { add, deleteItem } from '../../redux/checkSave';
import { useTheme } from '../../other/context/useTheme';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

const cardProps = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  id: '1',
};
const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
  const actualRedux = await vi.importActual('react-redux');
  return {
    ...actualRedux,
    useDispatch: () => mockDispatch,
  };
});
const mockStore = createStore((state = { checkSave: { person: [] } }) => state);

vi.mock('../../other/context/useTheme', () => ({
  useTheme: vi.fn(),
}));

// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn((): { push: (path: string) => void } => ({
//     push: vi.fn(),
//   })),
//   useSearchParams: vi.fn(),
//   useParams: vi.fn(),
// }));
const mockpush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: { page: '1' },
    push: mockpush,
    pathname: '/',
    isReady: true,
  })),
}));

describe('test Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('test clickbtn', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    vi.mocked(useTheme).mockReturnValue(mockTheme);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );

    const cardElement = screen.getByText(/Luke Skywalker/i);
    cardElement.click();
    expect(mockpush).toHaveBeenCalledWith('/1/?page=1');
  });

  test('delete details', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    vi.mocked(useRouter).mockReturnValue({
      route: '/1',
      pathname: '/1',
      query: { id: '1' },
      asPath: '/1?page=1',
      push: mockpush,
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
      isReady: true,
      basePath: '',
      isLocaleDomain: false,
      forward: function (): void {
        throw new Error('Function not implemented.');
      },
      isPreview: false,
    });
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    const cardElement = screen.getByText(/Luke Skywalker/i);
    cardElement.click();
    expect(mockpush).toHaveBeenCalledWith('/?');
  });
  test('checked', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    const checkbox = screen.getByRole('checkbox');
    checkbox.click();
    expect(mockDispatch).toHaveBeenCalledWith(add(cardProps));
  });
  test('delete item store', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(deleteItem(cardProps));
  });
  test('class theme', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('card_test')).toHaveClass('black');
  });
});
