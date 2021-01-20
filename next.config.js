/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = '';

const PROD_API_URL = 'https://typer-io-server.herokuapp.com/api/v1';
const DEV_API_URL = 'http://localhost:4000/api/v1';

const PROD_SOCKET_URL = 'https://typer-io-node.herokuapp.com';
const DEV_SOCKET_URL = 'localhost:8000';

const PROD_BASE_URL = 'https://typer.io';
const DEV_BASE_URL = 'http://localhost:3000';

module.exports = {
  productionBrowserSourceMaps: true,
  env: {
    BASE_URL: true ? PROD_BASE_URL : DEV_BASE_URL,
    API_URL: true ? PROD_API_URL : DEV_API_URL,
    SOCKET_URL: true ? PROD_SOCKET_URL : DEV_SOCKET_URL,
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(
          options.isServer.toString()
        )
      })
    );

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: COMMIT_SHA
        })
      );
    }

    return config;
  },
  basePath
};
