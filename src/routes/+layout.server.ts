// import fetch from 'node-fetch';

import { USER_EMAIL, USER_PASSWORD } from "$env/static/private";

const API_ENDPOINT = 'https://api.libreview.io/llu/auth/login';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'product': 'llu.android',
  'version': '4.7.0',
};

export async function load() {
  const requestBody = {
    email: USER_EMAIL,
    password: USER_PASSWORD,
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const { data } = await response.json();
      const token = data.authTicket.token;

      const connectionResponse = await fetch(`https://api.libreview.io/llu/connections`, {
        method: 'GET',
        headers: {
          ...HEADERS,
          'authorization': `Bearer ${token}`,
        },
      });

      if (connectionResponse.ok) {
        const patientData = await connectionResponse.json();
        const { glucoseMeasurement } = patientData.data[0];
        return {
          patientName: patientData,
          glucoseValue: glucoseMeasurement.Value
        };
      } else {
        throw new Error(`Error: ${connectionResponse.status} - ${connectionResponse.statusText}`);
      }
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: 'Internal Server Error',
    };
  }
}

