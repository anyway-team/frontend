declare module '@splidejs/react-splide' {
  import * as React from 'react';
  export interface SplideRef {
    go: (index: number) => void;
  }
  export interface SplideProps {
    [key: string]: unknown;
  }
  export const Splide: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<SplideProps> & React.RefAttributes<SplideRef>
  >;
  export const SplideSlide: React.FC<React.PropsWithChildren<object>>;
}
