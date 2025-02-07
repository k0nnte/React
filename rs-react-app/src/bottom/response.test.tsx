import { describe, expect, Mock, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Response from './response';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import rfetch from '../other/rfetch';

const mocknav = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mocknav,
    useSearchParams: () => [new URLSearchParams('?page=1')],
  };
});
const mockData = {
  count: 2,
  results: [
    {
      id: 1,
      name: 'Person 1',
      height: '180',
      mass: '75',
      hair_color: 'black',
      skin_color: 'white',
    },
    {
      id: 2,
      name: 'Person 2',
      height: '170',
      mass: '65',
      hair_color: 'brown',
      skin_color: 'tan',
    },
  ],
};

const mockMoreData = {
  count: 15,
  results: [
    {
      id: 1,
      name: 'Person 1',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
    {
      id: 2,
      name: 'Person 2',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
    {
      id: 3,
      name: 'Person 3',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
    {
      id: 4,
      name: 'Person 4',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
    {
      id: 5,
      name: 'Person 5',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
    {
      id: 6,
      name: 'Person 6',
      height: '180',
      mass: '75',
      hair_color: 'black',
    },
  ],
};

vi.mock('../other/rfetch');

describe('Response', () => {
  test('should render data', async () => {
    (rfetch as Mock).mockResolvedValue(mockData);
    render(
      <BrowserRouter>
        <Response search="" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Person 1')).toBeInTheDocument();
      expect(screen.getByText('Person 2')).toBeInTheDocument();
    });
  });
  test('no data', async () => {
    (rfetch as Mock).mockResolvedValue({ count: 0, results: [] });
    render(
      <BrowserRouter>
        <Response search="" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });
  test('Make sure the component updates URL query parameter when page changes', async () => {
    (rfetch as Mock).mockResolvedValue(mockMoreData);
    render(
      <BrowserRouter>
        <Response search="" />
      </BrowserRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('next'));
      expect(mocknav).toHaveBeenCalledWith('?page=2');
    });
  });

  test('error btn', () => {
    render(
      <BrowserRouter>
        <Response search="" />
      </BrowserRouter>
    );
    const errorButton = screen.getByText('Error button');
    expect(() => {
      fireEvent.click(errorButton);
    }).toThrow('Error');
  });
});
