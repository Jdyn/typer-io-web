const { API_URL } = process.env;

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
    return fetch(`${API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: { ...headers() }
    })
      .then(parseResponse)
      .catch((error) => error);
  },

  post(url, data) {
    const body = JSON.stringify(data);
    return fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  patch(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API_URL}${url}`, {
      method: 'PATCH',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  delete(url) {
    return fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: headers()
    }).then(parseResponse);
  }
};
