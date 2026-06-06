import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const res = http.get('http://127.0.0.1:3000/api/restaurantes');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has data': (r) => r.body.includes('data'),
    });

    sleep(1);
}