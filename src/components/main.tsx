import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { StylesProvider } from "@material-ui/core/styles";
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
import i18n from "i18next";
import Styles from "./main.module.less";

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

  useEffect(() => {
    if (settingsContext.state.language !== i18n.language) {
      i18n.changeLanguage(settingsContext.state.language);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <SettingsContext.Provider value={settingsContext}>
        <SettingsContext.Consumer>
          {({ state }) => {
            return (
              <ThemeProvider theme={state.isDark ? darkTheme : whiteTheme}>
                <BrowserRouter>
                  <Grid
                    justify="center"
                    container
                    className={
                      state.isDark ? Styles.darkTheme : Styles.whiteTheme
                    }
                  >
                    <Grid
                      direction="column"
                      container
                      className={Styles.mainContainer}
                    >
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
                  </Grid>
                </BrowserRouter>
              </ThemeProvider>
            );
          }}
        </SettingsContext.Consumer>
      </SettingsContext.Provider>
    </StylesProvider>
  );
};
