import http from 'k6/http';
import { check } from 'k6';
import { exec } from 'k6/execution';

const sso_url = '';
const app_url = 'https://www.polestar.com/se/test-drive/booking/ps4/';
const secrets = JSON.parse(open('./secrets.json'));

export function setup() {
    const res = http.post(sso_url, {
        client_id: secrets.client_id,
        client_secret: secrets.client_secret,
        grant_type: 'client_credentials',
    });

    if (res.status !== 200) {
        exec.test.abort(`Received '${res.status_text}' from '${res.url}'`);
    }

    return res.json().access_token;
}

export const options = {
    scenarios: {
        projects: {
            exec: 'projects',
            executor: 'constant-arrival-rate',
            rate: 1,
            timeUnit: '1s',
            duration: '30s',
            preAllocatedVUs: 25,
            env: {
                authToken: setup()
            }
        },
    },
};

export function projects() {
    const authToken = __ENV.authToken;
    const res = http.get(
        app_url,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    check(
        res,
        {
            'is status 200': (r) => r.status === 200,
            //'is status 401?': (r) => r.status === 401,
        },
        { status: res.status }
    );
}