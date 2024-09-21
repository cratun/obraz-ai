import { SVGProps } from 'react';

const CardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" height="34" viewBox="0 0 52 34" width="52" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M5.19665 0H46.7699C49.654 0 51.9666 1.89125 51.9666 4.25V29.75C51.9666 32.1087 49.654 34 46.7699 34H5.19665C2.31251 34 0 32.1087 0 29.75L0.0259832 4.25C0.0259832 1.89125 2.31251 0 5.19665 0ZM5.19665 29.75H46.7699V17V8.5V4.25H5.19665V8.5V17V29.75Z"
      fill="#F3F3F3"
      fillRule="evenodd"
    />
    <path d="M5.19043 11H46.7712V17H5.19043V11Z" fill="#CCCCCC" />
  </svg>
);

export default CardIcon;
