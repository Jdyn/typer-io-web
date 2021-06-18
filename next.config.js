/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const basePath = '';

const PROD_API_URL = 'https://typer-io-server.herokuapp.com/api';
const DEV_API_URL = 'http://localhost:4000/api';

const PROD_SOCKET_URL = 'https://typer-io-node.herokuapp.com';
const DEV_SOCKET_URL = 'localhost:8000';

const PROD_BASE_URL = 'https://typer.io';
const DEV_BASE_URL = 'http://localhost:3000';

module.exports = {
  productionBrowserSourceMaps: false,
  env: {
    BASE_URL: false ? PROD_BASE_URL : DEV_BASE_URL,
    API_URL: false ? PROD_API_URL : DEV_API_URL,
    SOCKET_URL: false ? PROD_SOCKET_URL : DEV_SOCKET_URL
  },
  basePath
};
