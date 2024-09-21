import { SVGProps } from 'react';

const StyleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" height="44" viewBox="0 0 38 44" width="38" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clip-rule="evenodd"
      d="M30.8 4.4V8.8H33V17.6H11V41.8C11 43.01 11.99 44 13.2 44H17.6C18.81 44 19.8 43.01 19.8 41.8V22H37.4V4.4H30.8Z"
      fill="#F3F3F3"
      fill-rule="evenodd"
    />
    <path
      clip-rule="evenodd"
      d="M30.8 4.4V2.2C30.8 0.99 29.81 0 28.6 0H2.2C0.99 0 0 0.99 0 2.2V11C0 12.21 0.99 13.2 2.2 13.2H28.6C29.81 13.2 30.8 12.21 30.8 11V8.8V4.4ZM4.4 8.8H26.4V4.4H4.4V8.8Z"
      fill="#CCCCCC"
      fill-rule="evenodd"
    />
  </svg>
);

export default StyleIcon;
