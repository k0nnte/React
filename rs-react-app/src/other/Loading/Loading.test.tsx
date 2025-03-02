import { describe, test, vi } from 'vitest';
import Loading from './Loading';
import { render } from '@testing-library/react';

interface ImageProps {
  src: string | { src: string };
  alt: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
}

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: ImageProps) => (
    <img
      src={typeof src === 'object' ? src.src : src}
      alt={alt}
      width={width}
      height={height}
    />
  ),
}));

describe('Loading test', () => {
  test('render', () => {
    render(<Loading />);
  });
});
