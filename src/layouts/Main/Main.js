import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import palette from '../../theme/palette';
import { Sidebar } from './components';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: palette.primary.light,
    position: 'relative',
  },
  shiftContent: {
    paddingLeft: 240,
  },
}));

const Main = (props) => {
  const { children } = props;
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  const classes = useStyles();
  const isDesktop = true;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop && !isLoginPage,
      })}
    >
      <Sidebar onClose={() => {}} open={!isLoginPage} variant={isDesktop ? 'persistent' : 'temporary'} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
