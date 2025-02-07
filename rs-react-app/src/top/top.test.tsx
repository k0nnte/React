import { describe, expect, test, vi } from 'vitest';
import Top from './top';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const func = vi.fn();

describe('test top', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage.', () => {
    render(<Top search="" onSearch={func} />);

    fireEvent.click(screen.getByText('Search'));
    expect(func).toBeCalled();
  });

  test('Check that the component retrieves the value from the local storage upon mounting.', () => {
    render(<Top search="qq" onSearch={func} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('qq');
  });
});
