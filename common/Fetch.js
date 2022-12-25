import getConfig from 'next/config';
import { ApiUrlsByAppEnv } from './environments';

// This imports NODE_ENV from next.config.js
const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

// APP_ENV must be set in the .env.{environment} files
export const API_BASE_URL =
  ApiUrlsByAppEnv[APP_ENV] || 'https://api.decentral.games';

console.log('APP_ENV (NODE_ENV): ', APP_ENV);
console.log('API_BASE_URL: ', API_BASE_URL);

const Fetch = {};

export default Fetch;
