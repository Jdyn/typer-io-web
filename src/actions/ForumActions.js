import keyMirror from "../lib/keyMirror";
import ApiService from "../services/ApiService";

export const actions = keyMirror(
  "FETCH_FEED_REQUEST",
  "FETCH_FEED_SUCCESS",
  "FETCH_FEED_FAILURE",

  "FETCH_POST_REQUEST",
  "FETCH_POST_SUCCESS",
  "FETCH_POST_FAILURE",
);

export const fetchFeedRequest = isLoading => ({
  type: actions.FETCH_FEED_REQUEST,
  isLoading
});

export const fetchFeedFailure = (hasErrored, error) => ({
  type: actions.FETCH_FEED_FAILURE,
  hasErrored,
  error
});

export const fetchFeedSuccess = posts => ({
  type: actions.FETCH_FEED_SUCCESS,
  posts
});

export const fetchFeed = query => dispatch => {
  dispatch(fetchFeedRequest(true));

  ApiService.fetch(query)
    .then(response => {
      if (response.ok) {
        dispatch(fetchFeedSuccess(response.result.posts));
      }
    })
    .catch(error => {
      dispatch(fetchFeedFailure(true, "Failed to fetch"));
    });
};

export const fetchPostRequest = isLoading => ({
  type: actions.FETCH_POST_REQUEST,
  isLoading
});

export const fetchPostSuccess = post => ({
  type: actions.FETCH_POST_SUCCESS,
  post
});

export const fetchPostFailure = (hasErrored, error) => ({
  type: actions.FETCH_POST_FAILURE,
  hasErrored,
  error
});

export const fetchPost = id => dispatch => {
  dispatch(fetchPostRequest(true));

  ApiService.fetch(`/forum/post/${id}`)
    .then(response => {
      if (response.ok) {
        dispatch(fetchPostSuccess(response.result.post));
      }
    })
    .catch(error => {
      dispatch(fetchPostFailure(true, "Failed to fetch"));
    });
};
