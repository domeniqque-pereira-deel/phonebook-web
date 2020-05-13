import React from 'react';
import { StyledBody } from 'baseui/card';
import { KIND } from 'baseui/button';
import { MdAdd } from 'react-icons/md';

import { PersonList, ButtonAddPerson, CardPerson } from './styles';
import history from '~/services/history';

function Person() {
  return (
    <>
      <h1>Interessados</h1>

      <PersonList>
        <ButtonAddPerson
          kind={KIND.tertiary}
          onClick={() => history.push('/persons/create')}
        >
          <MdAdd /> <span>Adicionar interessado</span>
        </ButtonAddPerson>

        <CardPerson>
          <StyledBody>
            <span>Domeniqque Dylluar</span>
          </StyledBody>
        </CardPerson>
      </PersonList>
    </>
  );
}

export default Person;
