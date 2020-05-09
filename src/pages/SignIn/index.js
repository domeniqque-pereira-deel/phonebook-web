import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, StyledAction, StyledTitle } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import * as Yup from 'yup';

import { getValidationErrors, isEmpty } from '~/utils';
import { signInRequest } from '~/store/ducks/auth';

function SignIn() {
  const [css, theme] = useStyletron();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe seu email')
      .required('O email é obrigatório'),
    password: Yup.string()
      .min(5, 'Sua senha deve ter pelo menos 5 digitos')
      .required('A senha é obrigatória'),
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isEmpty(validationErrors)) setValidationErrors({});

    try {
      await schema.validate({ email, password }, { abortEarly: false });

      dispatch(signInRequest(email, password));
    } catch (errors) {
      setValidationErrors(getValidationErrors(errors));
    }
  }

  useEffect(() => {
    if (!isLoading) setPassword('');
  }, [isLoading]);

  return (
    <>
      <h1 className={css({ marginBottom: theme.sizing.scale900 })}>
        Phonebook
      </h1>

      <Card
        overrides={{ Root: { style: { width: '100%', maxWidth: '360px' } } }}
      >
        <StyledTitle style={{ marginBottom: '15px' }}>Entrar</StyledTitle>

        <form onSubmit={handleSubmit}>
          <FormControl label="Email" error={validationErrors.email ?? null}>
            <Input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={validationErrors.email}
              disabled={isLoading}
              autoFocus
            />
          </FormControl>

          <FormControl label="Senha" error={validationErrors.password ?? null}>
            <Input
              value={password}
              type="password"
              error={validationErrors.password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </FormControl>

          <StyledAction>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              overrides={{ BaseButton: { style: { width: '100%' } } }}
            >
              Entrar
            </Button>
          </StyledAction>
        </form>
      </Card>
    </>
  );
}

export default SignIn;
