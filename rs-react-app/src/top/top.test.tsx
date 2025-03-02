// import { describe, expect, test, vi } from 'vitest';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { ThemeProvider } from '../other/context/theme';
// import Top from './top';
// import { useTheme } from '../other/context/useTheme';
// const dispatch = vi.fn();

// vi.mock('../other/context/useTheme', () => ({
//   useTheme: vi.fn().mockReturnValue({ theme: 'white', setTheme: vi.fn() }),
// }));

// vi.mock('react-redux', () => ({
//   useDispatch: () => dispatch,
// }));
// const dataMock = vi.fn();
// vi.mock(import('../other/localhook'), async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useLocalStorage: vi.fn().mockReturnValue(['', () => dataMock]),
//   };
// });

// vi.mock('react-router-dom', () => ({
//   useNavigate: vi.fn(),
//   useSearchParams: vi.fn(),
// }));

// describe('test top', () => {
//   test('test click btn no text', () => {
//     const mockSearchParams = new URLSearchParams();
//     const mockSetSearchParams = vi.fn();
//     const mockNavigate = vi.fn();
//     vi.mocked(useNavigate).mockReturnValue(mockNavigate);
//     vi.mocked(useSearchParams).mockReturnValue([
//       mockSearchParams,
//       mockSetSearchParams,
//     ]);
//     render(
//       <ThemeProvider>
//         <Top />
//       </ThemeProvider>
//     );
//     const button = screen.getByText('Search');
//     fireEvent.click(button);
//     expect(mockNavigate).not.toHaveBeenCalled();
//     expect(dispatch).not.toHaveBeenCalled();
//     expect(dataMock).not.toHaveBeenCalled();
//   });
//   test('test click btn', () => {
//     const mockSearchParams = new URLSearchParams();
//     const mockSetSearchParams = vi.fn();
//     const mockNavigate = vi.fn();
//     vi.mocked(useNavigate).mockReturnValue(mockNavigate);
//     vi.mocked(useSearchParams).mockReturnValue([
//       mockSearchParams,
//       mockSetSearchParams,
//     ]);
//     render(
//       <ThemeProvider>
//         <Top />
//       </ThemeProvider>
//     );
//     const input = screen.getByRole('textbox');
//     fireEvent.change(input, { target: { value: 'new search text' } });
//     const button = screen.getByText('Search');
//     fireEvent.click(button);
//     expect(mockNavigate).toHaveBeenCalled();
//     expect(dispatch).toHaveBeenCalled();
//   });
//   test('toggle theme white', () => {
//     const mockSearchParams = new URLSearchParams();
//     const mockSetSearchParams = vi.fn();
//     const mockNavigate = vi.fn();
//     const mocksetTheme = vi.fn();
//     vi.mocked(useTheme).mockReturnValue({
//       theme: 'white',
//       setTheme: mocksetTheme,
//     });
//     vi.mocked(useNavigate).mockReturnValue(mockNavigate);
//     vi.mocked(useSearchParams).mockReturnValue([
//       mockSearchParams,
//       mockSetSearchParams,
//     ]);
//     render(
//       <ThemeProvider>
//         <Top />
//       </ThemeProvider>
//     );
//     const themeSelect = screen.getByRole('combobox');
//     fireEvent.change(themeSelect, { target: { value: 'dark' } });
//     expect(mocksetTheme).toHaveBeenCalledWith('dark');
//   });
//   test('toggle theme dark', () => {
//     const mockSearchParams = new URLSearchParams();
//     const mockSetSearchParams = vi.fn();
//     const mockNavigate = vi.fn();
//     const mocksetTheme = vi.fn();
//     vi.mocked(useTheme).mockReturnValue({
//       theme: 'dark',
//       setTheme: mocksetTheme,
//     });
//     vi.mocked(useNavigate).mockReturnValue(mockNavigate);
//     vi.mocked(useSearchParams).mockReturnValue([
//       mockSearchParams,
//       mockSetSearchParams,
//     ]);
//     render(
//       <ThemeProvider>
//         <Top />
//       </ThemeProvider>
//     );
//     const themeSelect = screen.getByRole('combobox');
//     fireEvent.change(themeSelect, { target: { value: 'white' } });
//     expect(mocksetTheme).toHaveBeenCalledWith('white');
//   });
// });

import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
// import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '../other/context/theme';
import Top from './top';
import { useTheme } from '../other/context/useTheme';
import { useRouter } from 'next/navigation';

const dispatch = vi.fn();

vi.mock('../other/context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({ theme: 'white', setTheme: vi.fn() }),
}));

vi.mock('react-redux', () => ({
  useDispatch: () => dispatch,
}));
const dataMock = vi.fn();
vi.mock(import('../other/localhook'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocalStorage: vi.fn().mockReturnValue(['', () => dataMock]),
  };
});
vi.mock('next/navigation', () => ({
  useRouter: vi.fn((): { push: (path: string) => void } => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

describe('test top', () => {
  test('test click btn no text', () => {
    // const mockGet = vi.fn().mockReturnValue('1');
    // const mockHas = vi.fn().mockReturnValue(true);
    const mockPush = vi.fn();
    // const mockSearchParams = {
    //   get: mockGet,
    //   has: mockHas,
    //   toString: vi.fn(() => ''),
    // } as unknown as ReadonlyURLSearchParams;
    // vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockPush).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(dataMock).not.toHaveBeenCalled();
  });
  test('test click btn', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
    render(
      <ThemeProvider>
        <Top />
      </ThemeProvider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new search text' } });
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
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
