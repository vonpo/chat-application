import * as React from "react";
import { FunctionComponent } from "react";

import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { PageView } from "./layout/PageView";
import { Chat } from "./chat";

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
  return (
    <Grid direction="column" container className="main-container">
      <CssBaseline />
      <Header />
      <PageView>
        <Chat />
      </PageView>
      <Footer />
    </Grid>
  );
};
