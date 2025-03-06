import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../other/context/theme';
import Top from './top';
import { useTheme } from '../other/context/useTheme';

const dispatch = vi.fn();

vi.mock('../other/context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({ theme: 'white', setTheme: vi.fn() }),
}));

const dataMock = vi.fn();
vi.mock(import('../other/localhook'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocalStorage: vi.fn().mockReturnValue(['', () => dataMock]),
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

describe('test top', () => {
  test('test click btn no text', () => {
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockpush).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(dataMock).not.toHaveBeenCalled();
  });
  test('test click btn', () => {
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new search text' } });
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockpush).toHaveBeenCalled();
  });
  test('toggle theme white', () => {
    const mocksetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'white',
      setTheme: mocksetTheme,
    });
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const themeSelect = screen.getByRole('combobox');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    expect(mocksetTheme).toHaveBeenCalledWith('dark');
  });
  test('toggle theme dark', () => {
    const mocksetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mocksetTheme,
    });
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const themeSelect = screen.getByRole('combobox');
    fireEvent.change(themeSelect, { target: { value: 'white' } });
    expect(mocksetTheme).toHaveBeenCalledWith('white');
  });
});
