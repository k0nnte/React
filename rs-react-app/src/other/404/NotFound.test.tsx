import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../../../pages/404';

describe('NotFound component', () => {
  test('renders the 404 message', () => {
    render(<NotFound />);

    const messageElement = screen.getByText(/404 Page Not Found/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('has the correct CSS class', () => {
    render(<NotFound />);
    const messageElement = screen.getByTestId('errorpage');
    expect(messageElement).toHaveTextContent('404 Page Not Found');
  });
});
