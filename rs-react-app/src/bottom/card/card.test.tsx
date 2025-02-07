import Card from './card';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('')],
}));

const card = {
  name: 'person 1',
  height: '180',
  mass: '80',
  hair_color: 'brown',
  skin_color: 'white',
  id: '1',
};

describe('Card', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    render(<Card {...card} />);

    expect(screen.getByText('Height: 180')).toBeInTheDocument();
    expect(screen.getByText('Mass: 80')).toBeInTheDocument();
    expect(screen.getByText('Hair color: brown')).toBeInTheDocument();
    expect(screen.getByText('Skin color: white')).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component', () => {
    render(<Card {...card} />);

    fireEvent.click(screen.getByText('person 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/?details=1');
  });
});
