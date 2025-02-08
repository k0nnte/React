import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Details from './details';
import fetchData from '../../other/fetchData';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => {
  return {
    useSearchParams: () => [new URLSearchParams('?details=1')],
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../other/fetchData', () => ({
  default: vi.fn(() => Promise.resolve({ name: 'Person 1' })),
}));

describe('details', () => {
  test('additional API call to fetch detailed information', async () => {
    render(<Details />);
    await waitFor(() => expect(fetchData).toHaveBeenCalled());
  });
  test('Check that a loading indicator is displayed while fetching data', () => {
    render(<Details />);
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });
  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(<Details />);
    await waitFor(() =>
      expect(screen.getByText('name Person 1')).toBeInTheDocument()
    );
  });
  test('Ensure that clicking the close button hides the component', async () => {
    render(<Details />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('close'));
      expect(mockNavigate).toHaveBeenCalledWith('/?');
    });
  });
});
