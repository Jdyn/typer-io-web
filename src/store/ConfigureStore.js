import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import socket from "../services/socket";

export default function configureStore(initialState) {
  const middleware = [
    thunk,
    socket(
      process.env.NODE_ENV === "production"
        ? "54.84.200.205:8000/"
        : "54.84.200.205:8000/"
    )
  ];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
