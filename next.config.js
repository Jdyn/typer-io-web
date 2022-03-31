/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const basePath = '';

const PROD_API_URL = 'https://api.typer.io/api';
const DEV_API_URL = 'http://localhost:4000/api';

const PROD_SOCKET_URL = 'https://app.typer.io';
const DEV_SOCKET_URL = 'localhost:8000';

const PROD_BASE_URL = 'https://typer.io';
const DEV_BASE_URL = 'http://localhost:3000';

module.exports = {
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  paths: {
    '@/components/*': ['components/*'],
    '@/app/*': ['app/*']
  },
  env: {
    BASE_URL: false ? PROD_BASE_URL : DEV_BASE_URL,
    API_URL: false ? PROD_API_URL : DEV_API_URL,
    SOCKET_URL: false ? PROD_SOCKET_URL : DEV_SOCKET_URL
  },
  basePath
};
