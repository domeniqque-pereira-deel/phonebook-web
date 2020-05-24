import React, { useState, useEffect } from 'react';
import { FormControl } from 'baseui/form-control';
import { MaskedInput, Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import { useStyletron } from 'styletron-react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import history from '~/services/history';
import { HeaderContainer, Container } from '~/styles';
import { ButtonGroup } from '~/pages/Person/Create/styles';
import { isEmpty, getValidationErrors, generatePhoneSequence } from '~/utils';
import { addPhonesRequest } from '~/store/ducks/phone';

const schema = Yup.object().shape({
  startSequence: Yup.string()
    .matches(
      /\(\d{3}\)\s\d{5}-\d{4}/,
      'Formato inválido. Verifique o prefixo e se possui o 9 antes do número'
    )
    .required('Informe o início da sequência de números'),
  qtdSequence: Yup.number()
    .min(0, 'Informe um número positivo válido')
    .required('Informe pelo menos um número de contato'),
});

function CreatePhone() {
  const [startSequence, setStartSequence] = useState('');
  const [qtdSequence, setQtdSequence] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [sequencePreview, setSequencePreview] = useState([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const isLoading = useSelector((state) => state.phone.loading);

  const dispatch = useDispatch();

  const [css] = useStyletron();

  async function handleSubmitPhones(event) {
    event.preventDefault();

    if (!isEmpty(validationErrors)) setValidationErrors({});

    const payload = { startSequence, qtdSequence };

    if (qtdSequence === '') {
      setQtdSequence(1);
      payload.qtdSequence = 1;
    }

    try {
      await schema.validate(payload, { abortEarly: false });

      setIsOpenConfirmation(true);
    } catch (error) {
      setValidationErrors(getValidationErrors(error));
    }
  }

  useEffect(() => {
    if (startSequence.trim().length >= 16) {
      const sequence = generatePhoneSequence(startSequence, qtdSequence);

      setSequencePreview(sequence);
    }
  }, [startSequence, qtdSequence]);

  function handleSubmitSequenceConfirmation() {
    dispatch(addPhonesRequest(sequencePreview));
  }

  useEffect(() => {
    setValidationErrors([]);
  }, [startSequence, qtdSequence]);

  return (
    <>
      <HeaderContainer>
        <h1>Cadastrar Números</h1>
      </HeaderContainer>

      <Container>
        <form onSubmit={handleSubmitPhones}>
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
              label="Quantidade de números da sequência "
              error={validationErrors.qtdSequence}
            >
              <Input
                type="number"
                value={qtdSequence}
                min="1"
                max="1000"
                onChange={(e) => setQtdSequence(e.target.value)}
                error={validationErrors.qtdSequence}
                disabled={isLoading}
              />
            </FormControl>

            <ButtonGroup>
              <Button
                kind={KIND.tertiary}
                type="button"
                onClick={() => history.push('/phones')}
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={handleSubmitPhones}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Salvar
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </Container>

      <Modal
        onClose={() => setIsOpenConfirmation(false)}
        isOpen={isOpenConfirmation}
        animate
        autoFocus
        size={SIZE.auto}
        role={ROLE.dialog}
      >
        <ModalHeader>Deseja criar a seguinte sequência?</ModalHeader>
        <ModalBody>
          {sequencePreview.length > 1 ? (
            <div>
              <p>
                Serão cadastrados <strong>{sequencePreview.length}</strong>{' '}
                número(s)
              </p>
              <br />
              <p>
                De <strong>{sequencePreview[0]}</strong> à{' '}
                <strong>{sequencePreview[sequencePreview.length - 1]}</strong>
              </p>
            </div>
          ) : (
            <div>
              <p>
                Será cadastrado apenas o número{' '}
                <strong>{sequencePreview[0]}</strong>
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton disabled={isLoading} kind={KIND.tertiary}>
            Voltar
          </ModalButton>
          <ModalButton
            onClick={handleSubmitSequenceConfirmation}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Confirmar
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreatePhone;
