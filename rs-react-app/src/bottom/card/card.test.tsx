import { describe, expect, test, vi } from 'vitest';
import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../../other/context/theme';
import { add, deleteItem } from '../../redux/checkSave';
import { useTheme } from '../../other/context/useTheme';
import '@testing-library/jest-dom';
import {
  ReadonlyURLSearchParams,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

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

vi.mock('next/navigation', () => ({
  useRouter: vi.fn((): { push: (path: string) => void } => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

describe('test Card', () => {
  test('test clickbtn', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockPush = vi.fn();
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => 'page=1'),
    } as unknown as ReadonlyURLSearchParams;

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
    vi.mocked(useParams).mockReturnValue({});
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
    expect(mockPush).toHaveBeenCalledWith('/1/?page=1');
  });

  test('delete details', () => {
    const mockTheme = { theme: 'white', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    const mockGet = vi.fn().mockReturnValue('1');
    const mockHas = vi.fn().mockReturnValue(true);
    const mockPush = vi.fn();
    const mockSearchParams = {
      get: mockGet,
      has: mockHas,
      toString: vi.fn(() => ''),
    } as unknown as ReadonlyURLSearchParams;

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
    vi.mocked(useParams).mockReturnValue({ id: '1' });
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
    expect(mockPush).toHaveBeenCalledWith('/?');
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
    expect(screen.getByTestId('card_test')).toHaveClass('card black');
  });
});
