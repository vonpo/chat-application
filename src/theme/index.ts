import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export const whiteTheme = createMuiTheme({});
export const darkTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});
