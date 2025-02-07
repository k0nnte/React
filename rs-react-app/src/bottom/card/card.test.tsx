import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useNavigate, useSearchParams } from 'react-router-dom';

// vi.mock('react-router-dom', () => ({
//   useNavigate: () => mockNavigate,
//   useSearchParams: () => [new URLSearchParams('')],
// }));

const card = {
  name: 'person 1',
  height: '180',
  mass: '80',
  hair_color: 'brown',
  skin_color: 'white',
  id: '1',
};

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.mock('react-router-dom', () => ({
      useNavigate: vi.fn(),
      useSearchParams: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  test('Ensure that the card component renders the relevant card data', () => {
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    render(<Card {...card} />);

    expect(screen.getByText('Height: 180')).toBeInTheDocument();
    expect(screen.getByText('Mass: 80')).toBeInTheDocument();
    expect(screen.getByText('Hair color: brown')).toBeInTheDocument();
    expect(screen.getByText('Skin color: white')).toBeInTheDocument();
  });
  test('Validate that clicking on a card opens a detailed card component', () => {
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(<Card {...card} />);
    fireEvent.click(screen.getByText('person 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/?details=1');
  });

  test('delete details', () => {
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams('details=1');
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(<Card {...card} />);
    fireEvent.click(screen.getByText('person 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/?');
  });
});
