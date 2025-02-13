import { describe, expect, test, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useEffect, useState } from 'react';

const Problemcomp = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!hasError) {
      setHasError(true);
      throw new Error('Произошла ошибка!');
    }
  }, [hasError]);

  return <div>Все хорошо!</div>;
};

describe('ErrorBoundary', () => {
  test('render children in Errorboundary', () => {
    render(
      <ErrorBoundary>
        <div>Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
  test('crash', async () => {
    render(
      <ErrorBoundary>
        <Problemcomp />
      </ErrorBoundary>
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(screen.getByText('Ой ошибка. Перезагрузим?')).toBeInTheDocument();
  });
  test('click reset', () => {
    render(
      <ErrorBoundary>
        <Problemcomp />
      </ErrorBoundary>
    );
    expect(screen.getByText('Ой ошибка. Перезагрузим?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Перезагрузить'));
  });
});
