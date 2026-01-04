/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const basePath = '';

const PROD_API_URL = 'https://api.typer.io/api';
const DEV_API_URL = 'http://localhost:4002/api';

const PROD_SOCKET_URL = 'https://app.typer.io';
const DEV_SOCKET_URL = 'localhost:8000';

const PROD_BASE_URL = 'https://typer.io';
const DEV_BASE_URL = 'http://localhost:2000';

const DEV_SERVERS = true;

module.exports = {
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    BASE_URL: DEV_SERVERS ? DEV_BASE_URL : PROD_BASE_URL,
    API_URL: DEV_SERVERS ? DEV_API_URL : PROD_API_URL,
    SOCKET_URL: DEV_SERVERS ? DEV_SOCKET_URL : PROD_SOCKET_URL
  },
  basePath
};
