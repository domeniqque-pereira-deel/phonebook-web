import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Label3, H6, Paragraph4 } from 'baseui/typography';
import { MdPhone } from 'react-icons/md';
import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';
import { Datepicker } from 'baseui/datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { Button } from 'baseui/button';
import * as Yup from 'yup';

import { Container, Line, StyledPhoneLink, Section } from './styles';
import { getValidationErrors, isEmpty } from '~/utils';

const schema = Yup.object().shape({
  record: Yup.string().required('Informe uma descrição'),
  recordDate: Yup.date('Informe uma data válida').required(
    'Selecione a data da conversa'
  ),
});

function ShowPerson() {
  const { id } = useParams();
  const person = useSelector((state) => {
    return state.person.list.find((p) => p.id === id);
  });

  const [record, setRecord] = useState('');
  const [recordDate, setRecordDate] = useState(new Date());
  const [recordError, setRecordError] = useState({});

  const dispatch = useDispatch();
  const [css] = useStyletron();

  const isLoading = false;

  async function handleSubmitRecord(event) {
    event.preventDefault();

    if (!isEmpty(recordError)) setRecordError({});

    try {
      await schema.validate(
        {
          record,
          recordDate,
        },
        { abortEarly: false }
      );

      // dispatch(addPersonRequest(payload));
    } catch (errors) {
      setRecordError(getValidationErrors(errors));
    }
  }

  return (
    <>
      <h1>Interessado</h1>
      <Container>
        <Line>
          <Label3>Nome</Label3>
          <strong>{person.name}</strong>
        </Line>

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
                error={recordError.recordDate}
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
      </Container>
    </>
  );
}

export default ShowPerson;
