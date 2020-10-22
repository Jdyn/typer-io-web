module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: false ? 'https://typer-io-server.herokuapp.com/api/v1' : 'http://localhost:4000/api/v1',
    SOCKET_URL: false ? 'https://typer-io-node.herokuapp.com' : 'localhost:8000'
  }
};
