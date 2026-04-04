/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

module.exports = {
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    SOCKET_URL: process.env.SOCKET_URL
  },
  basePath: ''
};
