import { describe, expect, test, vi } from 'vitest';
import Main from '../app/page';
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Main component', () => {
  test(' search and details', async () => {
    const { redirect } = await import('next/navigation');

    await Main({
      searchParams: Promise.resolve({ search: 'test', deteils: '123' }),
    });

    expect(redirect).toHaveBeenCalledWith('/1?search=test&deteils=123');
  });

  test('empty params', async () => {
    const { redirect } = await import('next/navigation');

    await Main({
      searchParams: Promise.resolve({ search: '', deteils: undefined }),
    });

    expect(redirect).toHaveBeenCalledWith('/1?search=&deteils=');
  });
});
