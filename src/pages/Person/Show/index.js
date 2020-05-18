import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Label3, Paragraph3, H6, Paragraph4 } from 'baseui/typography';
import { MdPhone, MdCreate } from 'react-icons/md';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';
import { Datepicker } from 'baseui/datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { Button, KIND } from 'baseui/button';
import * as Yup from 'yup';
import { format } from 'date-fns';

import { HeaderContainer, Container } from '~/styles';
import { Line, StyledPhoneLink, Section } from './styles';
import { getValidationErrors, isEmpty } from '~/utils';
import { addRecordRequest } from '~/store/ducks/person';
import history from '~/services/history';

const schema = Yup.object().shape({
  record: Yup.string().required('Informe uma descrição'),
  recordDate: Yup.date().required(),
});

function ShowPerson() {
  const { id } = useParams();
  const person = useSelector((state) =>
    state.person.list.find((p) => p.id === id)
  );

  const records = useMemo(() => {
    return person.records
      .map((data) => {
        const date = new Date(data.date);
        const dateFormated = format(date, 'dd/MM/yyyy');

        return { record: data.record, date, dateFormated };
      })
      .sort((a, b) => b.date - a.date);
  }, [person]);

  const [record, setRecord] = useState('');
  const [recordDate, setRecordDate] = useState(new Date());
  const [recordError, setRecordError] = useState({});

  const dispatch = useDispatch();
  const [css] = useStyletron();

  const isLoading = useSelector((state) => state.person.loading);
  const hasSubmitError = useSelector((state) => state.person.hasError);

  useEffect(() => {
    if (!isLoading && !hasSubmitError) {
      setRecord('');
      setRecordDate(new Date());
    }
  }, [isLoading, hasSubmitError]);

  async function handleSubmitRecord(event) {
    event.preventDefault();

    if (!isEmpty(recordError)) setRecordError({});

    try {
      await schema.validate({ record, recordDate }, { abortEarly: false });

      dispatch(addRecordRequest(person.id, record, recordDate));
    } catch (errors) {
      setRecordError(getValidationErrors(errors));
    }
  }

  return (
    <>
      <HeaderContainer>
        <Button
          kind={KIND.tertiary}
          className={css({ position: 'absolute', left: '0px' })}
          onClick={() => history.push('/persons')}
        >
          Voltar
        </Button>
        <h1>Interessado</h1>
      </HeaderContainer>

      <Container>
        <Line>
          <Label3>Nome</Label3>
          <strong>{person.name ? person.name : 'Sem nome'}</strong>
        </Line>

        <Button
          kind={KIND.tertiary}
          className={css({ position: 'absolute', right: '0px' })}
          onClick={() => history.push(`/persons/edit/${person.id}`)}
        >
          <MdCreate />
        </Button>

        <div className={css({ display: 'flex' })}>
          <Line className={css({ width: '50%' })}>
            <Label3>O interessado é</Label3>
            <strong>{person.lifeStage}</strong>
          </Line>
          <Line className={css({ width: '50%' })}>
            <Label3>Sexo</Label3>
            <strong>{person.sex}</strong>
          </Line>
        </div>

        <Section>
          <H6>Números</H6>
          <Paragraph4>
            Toque em um número para <strong>iniciar uma ligação</strong>
          </Paragraph4>

          {person.numbers.map((n) => (
            <StyledPhoneLink key={n} href={`tel:${n}`}>
              <MdPhone size="1.2rem" /> {n}
            </StyledPhoneLink>
          ))}
        </Section>

        <Section>
          <H6>Registros de conversas</H6>

          <form
            className={css({ marginTop: '20px' })}
            onSubmit={handleSubmitRecord}
          >
            <FormControl label="Adicionar conversa" error={recordError.record}>
              <Textarea
                value={record}
                onChange={(e) => setRecord(e.target.value)}
                placeholder="Digite uma nova conversa com o interessado"
                clearable
                disabled={isLoading}
                error={recordError.record}
              />
            </FormControl>

            {record && (
              <FormControl
                label="Dia da conversa"
                error={
                  recordError.recordDate ? 'Informe uma data válida' : null
                }
              >
                <Datepicker
                  value={recordDate}
                  locale={ptBR}
                  formatString="dd/MM/yyyy"
                  placeholder="DD/MM/AAAA"
                  onChange={({ date }) => setRecordDate(date)}
                  clearable
                  error={recordError.recordDate}
                />
              </FormControl>
            )}

            <Button
              type="submit"
              className={css({ width: '100%' })}
              disabled={!record || isLoading}
              isLoading={isLoading}
            >
              Salvar Conversa
            </Button>
          </form>
        </Section>
        <Section>
          {records &&
            records.map((recordItem) => (
              <div
                key={`${recordItem.date.getTime()}`}
                className={css({ padding: '10px 0' })}
              >
                <Label3>
                  <strong>{recordItem.dateFormated}</strong>
                </Label3>
                <Paragraph3>{recordItem.record}</Paragraph3>
              </div>
            ))}
        </Section>
      </Container>
    </>
  );
}

export default ShowPerson;
