import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import 'typeface-roboto';
import { Main } from './layouts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 32,
    height: 'calc(100vh - 64px)',
  },
  "@global": {
    "body, html": {
      margin: 0
    }
  }
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <div className={classes.root}>
          <div>{children}</div>
        </div>
      </Main>
    </ThemeProvider>
  );
};

const App = ({ children }) => (
    <AppLayout>{children}</AppLayout>
);

export default App;
