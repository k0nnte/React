import { beforeEach, describe, expect, test, vi } from 'vitest';
import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../../other/context/theme';
import { add, deleteItem } from '../../redux/checkSave';
import { useTheme } from '../../other/context/useTheme';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';

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

describe('test Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  // test('test clickbtn', () => {
  //   const mockTheme = { theme: 'white', setTheme: vi.fn() };
  //   vi.mocked(useTheme).mockReturnValue(mockTheme);
  // vi.mocked(useSearchParams).mockReturnValue({
  //   get: vi.fn(),
  //   append: vi.fn(),
  //   delete: vi.fn(),
  //   set: vi.fn(),
  //   sort: vi.fn(),
  //   size: 0,
  //   getAll: vi.fn(),
  //   has: vi.fn(),
  //   forEach: vi.fn(),
  //   entries: vi.fn(),
  //   keys: vi.fn(),
  //   values: vi.fn(),
  //   [Symbol.iterator]: vi.fn(),
  // });

  //   render(
  //     <Provider store={mockStore}>
  //       <ThemeProvider>
  //         <Card {...cardProps} />
  //       </ThemeProvider>
  //     </Provider>
  //   );
  // });

  test('checked', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
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
