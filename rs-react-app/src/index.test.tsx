import { render, screen } from '@testing-library/react';
import Main, { getServerSideProps } from '../pages/index';
import { describe, test, expect } from 'vitest';

describe('Main component', () => {
  test('renders without crashing', () => {
    render(<Main />);
    expect(screen.queryByTestId('main_component')).toBeNull();
  });
  test('redirects not params', async () => {
    const context = { query: { search: 'Luke', deteils: '123' } };
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      redirect: {
        destination: '/1?search=Luke&deteils=123',
        permanent: false,
      },
    });
  });
});
