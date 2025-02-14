import { describe, test } from 'vitest';
import Loading from './Loading';
import { render } from '@testing-library/react';

describe('Loading test', () => {
  test('render', () => {
    render(<Loading />);
  });
});
