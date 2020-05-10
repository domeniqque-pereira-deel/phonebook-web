import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, StyledAction, StyledTitle } from 'baseui/card';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { StyledLink } from 'baseui/link';
import { Input } from 'baseui/input';
import { useStyletron } from 'baseui';
import * as Yup from 'yup';

import { getValidationErrors, isEmpty } from '~/utils';
import { signUpRequest } from '~/store/ducks/auth';

function SignUp() {
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
      const payload = { email, password };
      await schema.validate(payload, { abortEarly: false });

      dispatch(signUpRequest(payload));
    } catch (errors) {
      setValidationErrors(getValidationErrors(errors));
    }
  }

  return (
    <>
      <h1 className={css({ marginBottom: theme.sizing.scale900 })}>
        Phonebook
      </h1>

      <Card
        overrides={{ Root: { style: { width: '100%', maxWidth: '360px' } } }}
      >
        <StyledTitle style={{ marginBottom: '15px' }}>Criar conta</StyledTitle>

        <form onSubmit={handleSubmit} style={{ paddingBottom: '20px' }}>
          <FormControl
            label="Email"
            caption="Seu email pessoal"
            error={validationErrors.email ?? null}
          >
            <Input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={validationErrors.email}
              disabled={isLoading}
            />
          </FormControl>

          <FormControl
            label="Senha"
            caption="Crie uma senha de pelo menos 5 digitos"
            error={validationErrors.password ?? null}
          >
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
              Criar conta
            </Button>
          </StyledAction>
        </form>

        <StyledLink href="/signin">Já tenho conta</StyledLink>
      </Card>
    </>
  );
}

export default SignUp;
