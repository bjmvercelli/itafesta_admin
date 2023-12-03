import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import 'typeface-roboto';
import { Main } from './layouts';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 32,
    height: '100vh',
  },
  loginRoot: {
    height: '100vh',
  },
  "@global": {
    "body, html": {
      margin: 0
    }
  }
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <div className={isLoginPage ? classes.loginRoot : classes.root}>
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
