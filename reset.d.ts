// eslint-disable-next-line import/no-extraneous-dependencies
import '@total-typescript/ts-reset';

declare global {
  interface Window {
    Cookiebot?: any;
    dataLayer?: any;
  }
}
