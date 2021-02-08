import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let counter = 0;

const handleCounter = () => {
  counter++;
};

ReactDOM.render(
  <React.StrictMode>
    <App counter={counter} />
  </React.StrictMode>,
  document.getElementById("root")
);


