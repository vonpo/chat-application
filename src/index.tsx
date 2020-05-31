import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./components/main";

require("./styles/main.less");
require("./i18n");

const element = document.createElement("div");

document.body.appendChild(element);

ReactDOM.render(<AppComponent />, element);
