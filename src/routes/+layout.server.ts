import { USER_EMAIL, USER_PASSWORD } from '$env/static/private';

interface AuthResponse {
	data: {
		authTicket: {
			token: string;
		};
	};
}

interface ConnectionResponse {
	data: {
		patientId: string;
		glucoseMeasurement: {
			Value: number;
		};
		// Add other properties as needed
	}[];
}

interface GraphDataResponse {
	data: {
		graphData: unknown; // Define the appropriate type for graphData
		// Add other properties as needed
	};
}

const API_ENDPOINT = 'https://api.libreview.io/llu/auth/login';
const CONNECTIONS_ENDPOINT = 'https://api.libreview.io/llu/connections';
const HEADERS = {
	'Content-Type': 'application/json',
	'Accept-Encoding': 'gzip',
	'Cache-Control': 'no-cache',
	Connection: 'keep-alive',
	product: 'llu.android',
	version: '4.7.0'
};

export async function load({ cookies }) {
	try {
		let token = cookies.get('token');

		if (!token) {
			console.log('No token found, fetching new token');
			const authResponse: Response = await fetch(API_ENDPOINT, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					email: USER_EMAIL,
					password: USER_PASSWORD
				})
			});

			if (!authResponse.ok) {
				throw new Error(
					`Authentication Error: ${authResponse.status} - ${authResponse.statusText}`
				);
			}

			const authData: AuthResponse = await authResponse.json();
			token = authData?.data?.authTicket?.token;

			if (!token) {
				throw new Error('Invalid authentication response');
			}

			// Set the token as a cookie
			cookies.set('auth_token', token, {
				path: '/',
				httpOnly: true
				// Add other cookie options as needed, such as secure: true for HTTPS environments
			});
		}

		const connectionResponse: Response = await fetch(CONNECTIONS_ENDPOINT, {
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${token}`
			}
		});

		if (!connectionResponse.ok) {
			throw new Error(
				`Connection Error: ${connectionResponse.status} - ${connectionResponse.statusText}`
			);
		}

		const patientData: ConnectionResponse = await connectionResponse.json();
		const paitentId: string | undefined = patientData?.data?.[0]?.patientId;
		const glucoseMeasurement: number | undefined =
			patientData?.data?.[0]?.glucoseMeasurement?.Value;

		if (glucoseMeasurement === undefined) {
			throw new Error('Invalid patient data response');
		}

		const userDeviceDataResponse: Response = await fetch(
			`https://api.libreview.io/llu/connections/${paitentId}/graph`,
			{
				method: 'GET',
				headers: {
					...HEADERS,
					Authorization: `Bearer ${token}`
				}
			}
		);

		const userDeviceData: GraphDataResponse = await userDeviceDataResponse.json();
		const graphData: unknown = userDeviceData.data.graphData; // Define the appropriate type for graphData

		console.log('------------------------------- Graph Data ------------------------------');
		console.log(graphData);

		console.log('Success fetching patient data');
		console.log('------------------------------- Patient Data ------------------------------');
		console.log(patientData);

		return {
			patient: patientData,
			glucoseValue: glucoseMeasurement,
			graphData: userDeviceData.data.graphData
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			data: {
				error: (error as Error).message || 'Internal Server Error'
			}
		};
	}
}
