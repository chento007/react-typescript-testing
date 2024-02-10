import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Providers from "./store/Providers";
// import { Provider } from 'react-redux';
// import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Providers>
      <App></App>
    </Providers>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
