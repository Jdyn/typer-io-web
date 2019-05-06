import keyMirror from "../lib/keyMirror";
import ApiService from "../services/ApiService";

export const actions = keyMirror(
  "FETCH_FEED_REQUEST",
  "FETCH_FEED_SUCCESS",
  "FETCH_FEED_FAILURE"
);

export const fetchFeedRequest = isLoading => ({
  type: actions.FETCH_FEED_REQUEST,
  isLoading
});

export const fetchFeedFailure = hasErrored => ({
  type: actions.FETCH_FEED_FAILURE,
  hasErrored
});

export const fetchFeedSuccess = posts => ({
  type: actions.FETCH_FEED_SUCCESS,
  posts
});

export const fetchFeed = query => dispatch => {
  dispatch(fetchFeedRequest(true));

  ApiService.fetch("/forum/posts")
    .then(response => {
      if (response.ok) {
        dispatch(fetchFeedSuccess(response.result.posts));
      }
    })
    .catch(error => {
      console.log(error);
    });
};
