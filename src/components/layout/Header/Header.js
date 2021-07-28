/* eslint-disable linebreak-style */
import React from 'react';
import { AUTH_URL } from '../../../config';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userSwitcherRedux.js';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { green } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Component = ({ className, children, userStatus }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position='static'>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            component={Link}
            to={'/'}
          >
            <HomeIcon style={{ color: green[500] }} />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Bulletin
          </Typography>

          {!userStatus && (
            <div>
              <Link to={`${AUTH_URL}/google`}>

                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  color='inherit'
                >
                  <AccountCircle />
                  Login
                </IconButton>
              </Link>
            </div>
          )}
          {userStatus && (
            <div>
              <Button
                variant='contained'
                color='secondary'
                component={Link}
                to={'/youradds'}
              >
                Go toyour adds
              </Button>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                component={Link}
                to={`http://localhost:8000/auth/logout`}
              >
                <AccountCircle />
                Logout
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
