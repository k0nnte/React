import { beforeEach, describe, expect, test, vi } from 'vitest';
import Details from './datails';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../src/other/context/theme';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useTheme } from '../../src/other/context/useTheme';
import '@testing-library/jest-dom';
const mockStore = configureStore({
  reducer: (state = { checkSave: { person: [] } }) => state,
});
vi.mock('../../src/other/context/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockData = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  birth_year: '19BBY',
  gender: 'male',
  eye_color: 'blue',
};

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

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details data={mockData} page={1} search={''} />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('close'));
    expect(mockpush).toHaveBeenCalledWith('/1?search=');
  });
  test('class theme', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details data={mockData} page={1} search={''} />
        </ThemeProvider>
      </Provider>
    );
    const divElement = screen.getByTestId('div_test');
    expect(divElement).toHaveClass('black');
  });
  test('response info', () => {
    const mockTheme = { theme: 'dark', setTheme: vi.fn() };
    vi.mocked(useTheme).mockReturnValue(mockTheme);
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <Details data={mockData} page={1} search={''} />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('name Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('birth_year 19BBY')).toBeInTheDocument();
  });
});
