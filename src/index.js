import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import "./styles/globals.css";

ReactDOM.render(
  <Router>
    <App className="no-scrollbar" />
  </Router>,
  document.getElementById("root")
);
