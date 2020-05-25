import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { MODE } from 'baseui/button-group';
import Proptypes from 'prop-types';
import { useStyletron } from 'baseui';

import { ButtonGroup } from './styles';
import { CallStatus } from '~/store/ducks/phone';

function PhoneFilters({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const [css] = useStyletron();

  function handleSelectButton(event, index) {
    event.preventDefault();
    event.persist();

    if (selected === index) {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(index);
      onSelect(event.target.dataset.callType);
    }
  }

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
      })}
    >
      <ButtonGroup
        mode={MODE.radio}
        selected={selected}
        onClick={handleSelectButton}
      >
        <Button data-call-type={CallStatus.RECEIVED}>Atendidos</Button>
        <Button data-call-type={CallStatus.MISSED}>Não atendidos</Button>
        <Button data-call-type={CallStatus.DONT_EXIST}>Inexistente</Button>
      </ButtonGroup>
    </div>
  );
}

PhoneFilters.propTypes = {
  onSelect: Proptypes.func.isRequired,
};

export default PhoneFilters;
