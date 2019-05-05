import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import socket from "../services/socket";

export default function configureStore(initialState) {
  const middleware = [
    thunk,
    socket(
      process.env.NODE_ENV === "production"
        ? "ec2-54-89-213-209.compute-1.amazonaws.com:8000/"
        : "192.168.0.14:8000/"
    )
  ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
