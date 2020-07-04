module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: true ? 'https://typer-io-server.herokuapp.com/api/v1' : 'http://localhost:4000/api/v1',
    SOCKET_URL: true ? 'https://typer-io-node.herokuapp.com' : 'localhost:8000'
  }
};
