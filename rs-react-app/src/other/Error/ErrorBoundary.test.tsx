import { describe, expect, test } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const Problemcomp = () => {
  throw new Error('Test Error');
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
  test('crash', () => {
    render(
      <ErrorBoundary>
        <Problemcomp />
      </ErrorBoundary>
    );
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
    expect(screen.queryByText('Child component')).not.toBeInTheDocument();
  });
});
