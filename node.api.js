import React from "react";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import { SheetsRegistry } from "react-jss/lib/jss";

// Your Material UI Custom theme
import theme from "./src/theme";

export default () => ({
  // NOTE: This whole process could likely be extracted into a reusable
  // react-static-plugin-jss plugin. Thoughts?

  beforeRenderToElement: (App, { meta }) => props => {
    // Create a sheetsRegistry instance.
    meta.sheetsRegistry = new SheetsRegistry();

    // Create a MUI theme instance.
    const muiTheme = createMuiTheme(theme);

    const generateClassName = createGenerateClassName();

    const sheetsManager = new Map();

    return (
      <JssProvider
        registry={meta.sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={muiTheme} sheetsManager={sheetsManager}>
          <App {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  },
  Head: ({ meta }) => (
    <React.Fragment>
      <style
        id="jss-server-side"
        dangerouslySetInnerHTML={{ __html: meta.sheetsRegistry.toString() }}
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        rel="stylesheet"
      />
    </React.Fragment>
  )
});
