import 'server-only';
import dayjs from 'dayjs';
import { cookies, headers } from 'next/headers';
import { getClientIp } from '@/app/_utils/get-client-ip';

const PIXEL_ID = process.env.META_PIXEL_ID!;
const META_ACCESS_TOKEN = process.env.CONVERSIONS_API_ACCESS_TOKEN!;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bizSdk = require('facebook-nodejs-business-sdk');

export const sendInitCheckoutPixelEvent = async () => {
  const headersList = headers();
  const cookiesList = cookies();

  const access_token = META_ACCESS_TOKEN;
  bizSdk.FacebookAdsApi.init(access_token);
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const ServerEvent = bizSdk.ServerEvent;

  const pixel_id = PIXEL_ID;

  const userData = new UserData()
    .setClientIpAddress(getClientIp())
    .setClientUserAgent(headersList.get('user-agent') || '')
    .setExternalId(cookiesList.get('external_id')?.value)
    .setFbp(cookiesList.get('_fbp')?.value)
    .setFbc(cookiesList.get('_fbc')?.value);

  const serverEvent = new ServerEvent()
    .setEventName('InitiateCheckout')
    .setEventTime(dayjs().unix())
    .setUserData(userData)
    .setActionSource('website');

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
  // .setTestEventCode('TEST85816');

  await eventRequest.execute().then(
    (response: any) => {
      console.log('Response: ', response);
    },
    (err: any) => {
      console.error('Error: ', err);
    },
  );
};

export const sendPixelPurchaseEvent = async ({
  email,
  phone,
  amount,
}: {
  email: string;
  phone: string;
  amount: number;
}) => {
  const headersList = headers();
  const cookiesList = cookies();

  const access_token = META_ACCESS_TOKEN;
  bizSdk.FacebookAdsApi.init(access_token);
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const ServerEvent = bizSdk.ServerEvent;
  const CustomData = bizSdk.CustomData;

  const pixel_id = PIXEL_ID;

  const userData = new UserData()
    .setEmails([email])
    .setPhones([phone])
    .setClientIpAddress(getClientIp())
    .setClientUserAgent(headersList.get('user-agent') || '')
    .setExternalId(cookiesList.get('external_id')?.value)
    .setFbp(cookiesList.get('_fbp')?.value)
    .setFbc(cookiesList.get('_fbc')?.value);

  const customData = new CustomData().setCurrency('PLN').setValue(amount);

  const serverEvent = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(dayjs().unix())
    .setUserData(userData)
    .setCustomData(customData)
    .setActionSource('website');
  // TODO: add more data to the event
  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
  // .setTestEventCode('TEST85816');

  await eventRequest.execute().then(
    (response: any) => {
      console.log('Response: ', response);
    },
    (err: any) => {
      console.error('Error: ', err);
    },
  );
};
