import * as React from "react";
import * as ReactDom from "react-dom";
import {App} from "../App";
import { BrowserRouter as Router } from "react-router-dom";

window.addEventListener("load", () => {
  ReactDom.hydrate(
      <Router>
        <App  />
      </Router>

      , document.getElementById("react_root"));
});
