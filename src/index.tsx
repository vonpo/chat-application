import * as React from "react";
import * as ReactDOM from "react-dom";
import { Hello } from "./components/Hello";

require("./styles/main.less");
require("./styles/plain.css");

const element = document.createElement("div");

document.body.appendChild(element);

ReactDOM.render(<Hello compiler="Test" framework="marcin" />, element);
