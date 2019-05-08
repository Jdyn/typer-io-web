import { actions } from "../actions/ForumActions";

const initialState = {
  feed: {
    currentFilter: "Popular",
    posts: [],
    isLoading: false,
    errored: false,
    error: null
  },
  post: {
    post: {},
    isLoading: false,
    errored: false,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_FEED_REQUEST:
      return {
        ...state,
        feed: {
          ...state.feed,
          isLoading: action.isLoading,
          errored: false,
          error: null
        }
      };
    case actions.FETCH_FEED_SUCCESS:
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: action.posts,
          isLoading: false
        }
      };
    case actions.FETCH_POST_REQUEST:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: action.isLoading,
          errored: false,
          error: null
        }
      };
    case actions.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          post: action.post,
          isLoading: false
        }
      };
    default:
      return state;
  }
};
