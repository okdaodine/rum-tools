import request from 'request';
import { API_BASE_URL } from './common';
import { ITrx } from 'rum-sdk-browser';
import qs from 'query-string';

export default {
  async send(payload: any, options: { seed: string }) {
    console.log(payload);
    const res: { trx_id: string } = await request(`${API_BASE_URL}/trx?${qs.stringify(options)}`, {
      method: 'POST',
      body: payload
    });
    return res;
  },

  async get(options: { trxId: string, seed: string }) {
    const res: ITrx = await request(`${API_BASE_URL}/trx?${qs.stringify(options)}`);
    return res;
  }
}
