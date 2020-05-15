import React, { useEffect } from 'react';
import { StyledBody } from 'baseui/card';
import { Button, KIND, SIZE } from 'baseui/button';
import { MdAdd, MdAutorenew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Paragraph2 } from 'baseui/typography';

import { PersonList, ButtonAddPerson, CardPerson } from './styles';
import history from '~/services/history';
import { fetchPersonsRequest } from '~/store/ducks/person';
import { HeaderContainer } from '~/styles';

function Person() {
  const dispatch = useDispatch();

  const persons = useSelector((state) => state.person.list);
  const fetchError = useSelector((state) => state.person.hasError);
  const isLoading = useSelector((state) => state.person.loading);

  useEffect(() => {
    dispatch(fetchPersonsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderContainer>
        <h1>Interessados</h1>
      </HeaderContainer>

      <PersonList>
        <ButtonAddPerson
          kind={KIND.tertiary}
          onClick={() => history.push('/person/create')}
        >
          <MdAdd /> <span>Adicionar interessado</span>
        </ButtonAddPerson>

        {persons &&
          persons.map((person) => (
            <CardPerson
              key={person.id}
              onClick={() => history.push(`/person/${person.id}`)}
            >
              <StyledBody>
                <Paragraph2>
                  {person.name ? person.name : 'Sem nome'}
                </Paragraph2>
                {person.numbers && <small>{person.numbers.join(', ')}</small>}
              </StyledBody>
            </CardPerson>
          ))}
      </PersonList>

      {fetchError && (
        <>
          <p>Não foi possível atualizar as informações</p>
          <Button
            size={SIZE.compact}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => dispatch(fetchPersonsRequest())}
          >
            <MdAutorenew /> Tentar novamente
          </Button>
        </>
      )}
    </>
  );
}

export default Person;
