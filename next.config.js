module.exports = {
  reactStrictMode: true,
  env: {
    API_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://typer-io-server.herokuapp.com/api/v1'
        : 'http://localhost:4000/api/v1',
    SOCKET_URL:
      process.env.NODE_ENV === 'development'
        ? 'https://typer-io-node.herokuapp.com'
        : 'localhost:8000'
  }
};
