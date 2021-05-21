/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const basePath = '';

const PROD_API_URL = 'https://typer-io-server.herokuapp.com/api/v1';
const DEV_API_URL = 'http://localhost:4000/api/v1';

const PROD_SOCKET_URL = 'https://typer-io-node.herokuapp.com';
const DEV_SOCKET_URL = 'localhost:8000';

const PROD_BASE_URL = 'https://typer.io';
const DEV_BASE_URL = 'http://localhost:3000';

module.exports = {
  productionBrowserSourceMaps: false,
  env: {
    BASE_URL: true ? PROD_BASE_URL : DEV_BASE_URL,
    API_URL: true ? PROD_API_URL : DEV_API_URL,
    SOCKET_URL: true ? PROD_SOCKET_URL : DEV_SOCKET_URL,
  },
  basePath
};
