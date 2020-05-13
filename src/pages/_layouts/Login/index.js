import React from 'react';
import { styled } from 'baseui';
import PropTypes from 'prop-types';

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  padding: '10px',
});

function Login({ children }) {
  return <Centered>{children}</Centered>;
}

Login.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

export default Login;
