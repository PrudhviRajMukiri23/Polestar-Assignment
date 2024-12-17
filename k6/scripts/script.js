import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    scenarios: {
        projects: {
            exec: 'projects',
            executor: 'constant-vus',
            vus: 25,
            duration: '30s',
        },
    },
};

export function projects() {
    const res = http.get('https://www.polestar.com/se/test-drive/booking/ps4/')
    sleep(1)
    console.log(res.status)
    check(res, {'is success 200':(r)=>r.status===200},{ status: res.status })
}

