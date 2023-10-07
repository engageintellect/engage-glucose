import { USER_EMAIL, USER_PASSWORD } from "$env/static/private";

const API_ENDPOINT = 'https://api.libreview.io/llu/auth/login';
const CONNECTIONS_ENDPOINT = 'https://api.libreview.io/llu/connections';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'product': 'llu.android',
  'version': '4.7.0',
};

export async function load({ cookies }:any) {
  try {
    let token = cookies.get('token');

    if (!token) {
      console.log('No token found, fetching new token')
      const authResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          email: USER_EMAIL,
          password: USER_PASSWORD,
        }),
      });

      if (!authResponse.ok) {
        throw new Error(`Authentication Error: ${authResponse.status} - ${authResponse.statusText}`);
      }

      const { data } = await authResponse.json();
      console.log(data)
      token = data?.authTicket?.token;

      if (!token) {
        throw new Error('Invalid authentication response');
      }

      // Set the token as a cookie
      cookies.set('auth_token', token, {
        path: '/',
        httpOnly: true,
        // Add other cookie options as needed, such as secure: true for HTTPS environments
      });
    }

    const connectionResponse = await fetch(CONNECTIONS_ENDPOINT, {
      method: 'GET',
      headers: {
        ...HEADERS,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!connectionResponse.ok) {
      throw new Error(`Connection Error: ${connectionResponse.status} - ${connectionResponse.statusText}`);
    }

    const stuff = await fetch('https://api.libreview.io/llu/connections/58b1f3ba-5c08-11ee-8809-aed2337633a5/graph', {
      method: 'GET',
      headers: {
        ...HEADERS,
        'Authorization': `Bearer ${token}`,
      },

    });

    let things = await stuff.json();

    console.log('-------------------------------this is stuff ------------------------------')

    console.log(things.data.connection.glucoseMeasurement)



    const patientData = await connectionResponse.json();
    const glucoseMeasurement = patientData?.data?.[0]?.glucoseMeasurement?.Value;

    if (glucoseMeasurement === undefined) {
      throw new Error('Invalid patient data response');
    }

    console.log('Success fetching patient data')
    console.log(patientData)

    return {
      patient: patientData,
      glucoseValue: glucoseMeasurement,
    };
  } catch (error:any) {
    console.error(error);
    console.log('hey world')
    return {
      status: 500,
      data: {
        error: error.message || 'Internal Server Error',
      },
    };
  }
}
