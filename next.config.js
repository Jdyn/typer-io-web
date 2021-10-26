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
  env: {
    BASE_URL: true ? PROD_BASE_URL : DEV_BASE_URL,
    API_URL: true ? PROD_API_URL : DEV_API_URL,
    SOCKET_URL: true ? PROD_SOCKET_URL : DEV_SOCKET_URL
  },
  basePath
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (true) {
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: isServer ? 8888 : 8889,
  //         openAnalyzer: true
  //       })
  //     );
  //   }
  //   return config;
  // }
};
