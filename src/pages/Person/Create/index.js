import React, { useState, useEffect } from 'react';
import { FormControl } from 'baseui/form-control';
import { Input, MaskedInput } from 'baseui/input';
import { Select, TYPE } from 'baseui/select';
import { Button, KIND } from 'baseui/button';
import { useStyletron } from 'baseui';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from 'baseui/icon';
import * as Yup from 'yup';

import {
  Container,
  AddNumberBlock,
  ButtonAddNumber,
  NumbersList,
  ButtonGroup,
} from './styles';
import { isEmpty, getValidationErrors, getFirstSelectValue } from '~/utils';
import { addPersonRequest } from '~/store/ducks/person';
import history from '~/services/history';

export const SEX_TYPES = ['Masculino', 'Feminino'];
export const LIFE_STAGES = ['Criança', 'Jovem', 'Adulto', 'Idoso'];

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o nome do interessado'),
  sex: Yup.string().required('Selecione o sexo'),
  lifeStage: Yup.string().required('Selecione uma opção'),
  numbers: Yup.array().min(1, 'Informe pelo menos um número de contato'),
});

function CreatePerson() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [lifeStage, setLifeStage] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [number, setNumber] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  const isLoading = useSelector((state) => state.person.loading);

  const [css, theme] = useStyletron();
  const dispatch = useDispatch();

  function handleAddNumber() {
    if (!isEmpty(validationErrors)) setValidationErrors({});

    if (number) {
      setNumbers([...numbers, number]);
      setNumber('');
    }
  }

  function handleRemoveNumber(numberIndex) {
    if (numberIndex >= 0) {
      const phones = [...numbers];
      phones.splice(numberIndex, 1);

      setNumbers(phones);
    }
  }

  async function handleSubmitPerson(event) {
    event.preventDefault();

    if (!isEmpty(validationErrors)) setValidationErrors({});

    try {
      const payload = {
        name,
        numbers,
        sex: getFirstSelectValue(sex),
        lifeStage: getFirstSelectValue(lifeStage),
      };

      await schema.validate(payload, { abortEarly: false });

      dispatch(addPersonRequest(payload));
    } catch (errors) {
      setValidationErrors(getValidationErrors(errors));
    }
  }

  useEffect(() => {
    setValidationErrors([]);
  }, [name, sex, numbers, lifeStage]);

  return (
    <Container>
      <h1 className={css({ alignSelf: 'center' })}>Cadastrar Pessoa</h1>
      <form onSubmit={handleSubmitPerson}>
        <FormControl label="Nome" error={validationErrors.name}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={validationErrors.name}
            disabled={isLoading}
          />
        </FormControl>

        <FormControl label="Sexo" error={validationErrors.sex}>
          <Select
            options={SEX_TYPES.map((value) => ({ id: value, value }))}
            labelKey="value"
            valueKey="id"
            placeholder="Selecione"
            maxDropdownHeight="300px"
            type={TYPE.select}
            onChange={({ value }) => setSex(value)}
            value={sex}
            error={validationErrors.sex}
            disabled={isLoading}
          />
        </FormControl>

        <FormControl label="Esta pessoa é" error={validationErrors.lifeStage}>
          <Select
            options={LIFE_STAGES.map((value) => ({ id: value, value }))}
            labelKey="value"
            valueKey="id"
            placeholder="Selecione"
            maxDropdownHeight="300px"
            type={TYPE.select}
            onChange={({ value }) => setLifeStage(value)}
            value={lifeStage}
            error={validationErrors.lifeStage}
            disabled={isLoading}
          />
        </FormControl>

        <AddNumberBlock>
          <div
            className={css({
              flex: 1,
              marginRight: theme.sizing.scale400,
              width: '100%',
            })}
          >
            <FormControl
              label="Números telefônicos"
              error={validationErrors.numbers}
            >
              <MaskedInput
                mask="(999) 99999-9999"
                clearable
                error={validationErrors.numbers}
                disabled={isLoading}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </FormControl>
          </div>

          <ButtonAddNumber
            kind={KIND.secondary}
            type="button"
            className={css({ marginTop: '16px' })}
            onClick={handleAddNumber}
            disabled={!number.length}
          >
            Adicionar
          </ButtonAddNumber>
        </AddNumberBlock>
      </form>

      <NumbersList>
        {numbers.map((numberItem, numberIndex) => (
          <ListItem
            key={numberItem}
            endEnhancer={() => (
              <Button
                size="compact"
                kind="secondary"
                shape="round"
                onClick={() => handleRemoveNumber(numberIndex)}
                disabled={isLoading}
              >
                <Delete />
              </Button>
            )}
          >
            <ListItemLabel>{numberItem}</ListItemLabel>
          </ListItem>
        ))}
      </NumbersList>

      <ButtonGroup>
        <Button
          kind={KIND.tertiary}
          type="button"
          onClick={() => history.push('/person')}
          disabled={isLoading}
        >
          Cancelar
        </Button>

        <Button
          type="button"
          onClick={handleSubmitPerson}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default CreatePerson;
