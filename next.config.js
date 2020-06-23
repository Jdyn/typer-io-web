module.exports = {
  reactStrictMode: true,
  env: {
    API_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://typer.io/api/v1'
        : 'http://localhost:4000/api/v1',
    SOCKET_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://typer-io-node.herokuapp.com'
        : 'https://typer-io-node.herokuapp.com'
  }
};
