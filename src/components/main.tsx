import * as React from "react";
import { FunctionComponent } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { PageView } from "./layout/PageView";
import { Chat } from "./chat";
import { Settings } from "./settings";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, whiteTheme } from "../theme";

import { SettingsContext } from "../store/settings";
import { ChatContext, useChat } from "../store/chat/chatContext";
import { useSettings } from "../store/settings";

/**
 * App component consists of main elements of app:
 *
 * Header
 * PageView
 * Footer
 *
 * Has also CssBaseline which removes not needed browser styles.
 *
 * @constructor
 */
export const AppComponent: FunctionComponent = () => {
  const settingsContext = useSettings();
  const chatContext = useChat();

  return (
    <SettingsContext.Provider value={settingsContext}>
      <SettingsContext.Consumer>
        {({ state }) => {
          console.info(state, "main");
          return (
            <ThemeProvider theme={state.isDark ? darkTheme : whiteTheme}>
              <BrowserRouter>
                <Grid direction="column" container className="main-container">
                  <ChatContext.Provider value={chatContext}>
                    <CssBaseline />
                    <Header />
                    <PageView>
                      <Route component={Chat} path="/" exact />
                      <Route component={Settings} path="/settings" />
                    </PageView>
                    <Footer />
                  </ChatContext.Provider>
                </Grid>
              </BrowserRouter>
            </ThemeProvider>
          );
        }}
      </SettingsContext.Consumer>
    </SettingsContext.Provider>
  );
};
