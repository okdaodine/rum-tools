import request from 'request';
import { API_BASE_URL } from './common';
import { IDecryptedContent } from 'rum-sdk-browser';
import qs from 'query-string';

export default {
  async list(options: { seed: string, count?: number }) {
    const res: IDecryptedContent[] = await request(`${API_BASE_URL}/contents?${qs.stringify(options)}`);
    return res;
  }
}
