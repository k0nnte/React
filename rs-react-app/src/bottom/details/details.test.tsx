import { describe, expect, test, vi } from 'vitest';
import Details from './details';
import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '../../other/context/theme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useFetchPeopleQuery } from '../../other/fetchData';

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
vi.mock('../../other/fetchData', () => ({
  useFetchPeopleQuery: vi.fn(),
}));

describe('test Details', () => {
  test('test btn close', () => {
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
});
