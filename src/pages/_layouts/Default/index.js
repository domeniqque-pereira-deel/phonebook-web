import React from 'react';
import { styled } from 'baseui';
import PropTypes from 'prop-types';
import Menu from './Menu';

const Centered = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '10px 10px 60px',
});

function Login({ children }) {
  return (
    <>
      <Menu />
      <Centered>{children}</Centered>
    </>
  );
}

Login.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

export default Login;
