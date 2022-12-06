function headers() {
  const token = localStorage.getItem('token') || '';

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`
  };
}

function parseResponse(response) {
  return response.json().then((json) => json);
}

function queryString(params) {
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, _opts = {}, params = {}) {
    return fetch(`${process.env.API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: { ...headers() }
    })
      .then(parseResponse)
      .catch((error) => error);
  }
};
