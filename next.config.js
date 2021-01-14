/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: true ? 'https://typer.io' : 'http://localhost:3000',
    API_URL: true
      ? 'https://typer-io-server.herokuapp.com/api/v1'
      : 'http://localhost:4000/api/v1',
    SOCKET_URL: true ? 'https://typer-io-node.herokuapp.com' : 'localhost:8000'
  }
};
