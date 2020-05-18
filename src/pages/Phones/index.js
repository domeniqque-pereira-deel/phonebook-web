import React from 'react';
import { MdAdd } from 'react-icons/md';
import { KIND } from 'baseui/button';

import { HeaderContainer, Container } from '~/styles';
import { ButtonAddNumber } from './styles';
import history from '~/services/history';

function Phones() {
  return (
    <>
      <HeaderContainer>
        <h1>Minha Sequência de Números</h1>
      </HeaderContainer>

      <Container>
        <ButtonAddNumber
          kind={KIND.tertiary}
          onClick={() => history.push('/phones/create')}
        >
          <MdAdd /> <span>Adicionar números</span>
        </ButtonAddNumber>
      </Container>
    </>
  );
}

export default Phones;
