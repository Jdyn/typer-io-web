import { API_KEY } from './Keys'

const API_HOSTNAME = 'https://api.themoviedb.org/3'

const constructUrl = (url, queries) => `${API_HOSTNAME}${url}?api_key=${API_KEY}${queries}`;

export const MOVIES_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'

export const test = constructUrl('/movie', '&query=bat')