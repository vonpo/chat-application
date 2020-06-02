import { createMuiTheme } from "@material-ui/core/styles";

export const whiteTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#ffffffe3",
      },
    },
  },
});
export const darkTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#424242de",
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      50: "#e0f3f4",
      100: "#b3e0e5",
      200: "#80cbd3",
      300: "#4db6c1",
      400: "#26a7b4",
      500: "#0097a7",
      600: "#008f9f",
      700: "#008496",
      800: "#007a8c",
      900: "#00697c",
      A100: "#a9efff",
      A200: "#76e6ff",
      A400: "#43ddff",
      A700: "#2ad8ff",
    },
    secondary: {
      50: "#ffe8f0",
      100: "#ffc6d9",
      200: "#ffa0c0",
      300: "#ff79a6",
      400: "#ff5d93",
      500: "#ff4080",
      600: "#ff3a78",
      700: "#ff326d",
      800: "#ff2a63",
      900: "#ff1c50",
      A100: "#ffffff",
      A200: "#ff4080",
      A400: "#ff4080",
      A700: "#ffb3c3",
    },
  },
});
