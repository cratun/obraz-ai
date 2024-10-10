'use server';
import { Stripe } from 'stripe';

// eslint-disable-next-line @typescript-eslint/no-require-imports
// const bizSdk = require('facebook-nodejs-business-sdk');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// const sendPixelEvent = async ({ email, phone, amount }: { email: string; phone: string; amount: number }) => {
//   const headersList = headers();
//   const cookiesList = cookies();

//   const access_token = META_ACCESS_TOKEN;
//   bizSdk.FacebookAdsApi.init(access_token);
//   const EventRequest = bizSdk.EventRequest;
//   const UserData = bizSdk.UserData;
//   const ServerEvent = bizSdk.ServerEvent;
//   const CustomData = bizSdk.CustomData;

//   const pixel_id = PIXEL_ID;

//   const userData = new UserData()
//     .setEmails([email])
//     .setPhones([phone])
//     .setClientIpAddress(getClientIp())
//     .setClientUserAgent(headersList.get('user-agent') || '')
//     .setExternalId(cookiesList.get('external_id')?.value)
//     .setFbp(cookiesList.get('_fbp')?.value)
//     .setFbc(cookiesList.get('_fbc')?.value);

//   const customData = new CustomData().setCurrency('PLN').setValue(amount);

//   const serverEvent = new ServerEvent()
//     .setEventName('Purchase')
//     .setEventTime(dayjs().unix())
//     .setUserData(userData)
//     .setCustomData(customData)
//     .setActionSource('website');
//   // TODO: add more data to the event
//   const eventsData = [serverEvent];
//   const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
//   // .setTestEventCode('TEST53533');

//   await eventRequest.execute().then(
//     (response: any) => {
//       console.log('Response: ', response);
//     },
//     (err: any) => {
//       console.error('Error: ', err);
//     },
//   );
// };

const actionGetOrderInfo = async (sessionId: string) => {
  let customer;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session.customer_details || !session.amount_total) throw new Error('No customer details found or amount total');

  // if (process.env.NODE_ENV !== 'development') {
  //   await sendPixelEvent({
  //     email: session.customer_details.email as string,
  //     phone: session.customer_details.phone as string,
  //     amount: session.amount_total / 100,
  //   });
  // }

  if (typeof session.customer === 'string') {
    customer = await stripe.customers.retrieve(session.customer);
  }

  return { session, customer: customer as Stripe.Customer };
};

export default actionGetOrderInfo;
