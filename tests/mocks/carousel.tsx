import React from 'react';

export const Carousel = React.forwardRef((props: any, ref: any) => {
  return React.createElement('div', { ...props, ref, 'data-testid': 'carousel' });
});

Carousel.displayName = 'CarouselMock';

export default Carousel;
