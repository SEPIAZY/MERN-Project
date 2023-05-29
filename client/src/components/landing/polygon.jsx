import { memo } from 'react';

const Polygon1Icon = (props) => (
  <svg preserveAspectRatio='none' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M15 30L2.00962 7.5L27.9904 7.5L15 30Z' fill='black' />
  </svg>
);

const Memo = memo(Polygon1Icon);
export { Memo as Polygon1Icon };