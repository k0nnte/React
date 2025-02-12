import { describe, expect, test, vi } from 'vitest';
import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../../other/context/theme';
import { add, deleteItem } from '../../redux/checkSave';

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

vi.mock('react-router-dom', async () => {
  const actualRouter = await vi.importActual('react-router-dom');
  return {
    ...actualRouter,
    useNavigate: vi.fn(),
  };
});

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('test Card', () => {
  test('test clickbtn', () => {
    const mockNavigate = vi.fn();
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );

    const cardElement = screen.getByText(/Luke Skywalker/i);
    cardElement.click();
    expect(mockNavigate).toHaveBeenCalledWith('/?details=1');
  });
  test('delete details', () => {
    const mockNavigate = vi.fn();
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams('?details=1');

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    const cardElement = screen.getByText(/Luke Skywalker/i);
    cardElement.click();
    expect(mockNavigate).toHaveBeenCalledWith('/?');
  });
  test('checked', () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Card {...cardProps} />
        </ThemeProvider>
      </Provider>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(add(cardProps));
  });
  test('delete item store', () => {
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
});
