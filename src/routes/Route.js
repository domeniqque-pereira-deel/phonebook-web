import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/Default/index';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const signed = useSelector((state) => state.auth.isLogged);

  if (!signed && isPrivate) {
    return <Redirect to="/signin" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  return (
    <DefaultLayout>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </DefaultLayout>
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false,
};

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  isPrivate: PropTypes.bool,
};

export default RouteWrapper;
