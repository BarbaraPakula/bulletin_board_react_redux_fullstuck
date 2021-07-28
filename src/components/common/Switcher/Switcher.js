/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Switcher.module.scss';
import { connect } from 'react-redux';
import { getUserStatus } from '../../../redux/userSwitcherRedux.js';

class Component extends React.Component {
  handleOnChange = (event) => {
    const { userActiveChange, user } = this.props;

    if (event === 'true') {
      user.active = true;
      userActiveChange(user);
    } else {
      user.active = false;
      userActiveChange(user);
    }
  };
  render() {
    const { className } = this.props;

    return (
      <div>
        <div className={clsx(className, styles.root)}>
          <select
            name='statusUser'
            id='isLogged'
            onChange={(event) => this.handleOnChange(event.target.value)}
          >
            <option value='true'>View for logged user</option>
            <option value='false'>View for unlogged user</option>
          </select>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
  userActiveChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  userActiveChange: (status) => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as Switcher, Component as SwitcherComponent };
