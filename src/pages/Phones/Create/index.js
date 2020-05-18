import React, { useState } from 'react';
import { FormControl } from 'baseui/form-control';
import { MaskedInput } from 'baseui/input';
import { useStyletron } from 'styletron-react';

import { HeaderContainer, Container } from '~/styles';

// import { Container } from './styles';

function CreatePhone() {
  const [startSequence, setStartSequence] = useState('');
  const [endSequence, setEndSequence] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const isLoading = false;

  const [css] = useStyletron();

  return (
    <>
      <HeaderContainer>
        <h1>Cadastrar Números</h1>
      </HeaderContainer>

      <Container>
        <form>
          <div className={css({ width: '100%' })}>
            <FormControl
              label="Primeiro número da sequência"
              error={validationErrors.startSequence}
            >
              <MaskedInput
                mask="(999) 99999-9999"
                clearable
                value={startSequence}
                onChange={(e) => setStartSequence(e.target.value)}
                error={validationErrors.startSequence}
                disabled={isLoading}
              />
            </FormControl>

            <FormControl
              label="Último número da sequência"
              error={validationErrors.endSequence}
            >
              <MaskedInput
                mask="(999) 99999-9999"
                clearable
                value={endSequence}
                onChange={(e) => setEndSequence(e.target.value)}
                error={validationErrors.endSequence}
                disabled={isLoading}
              />
            </FormControl>
          </div>
        </form>
      </Container>
    </>
  );
}

export default CreatePhone;
