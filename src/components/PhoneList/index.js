import React from 'react';
import PropTypes from 'prop-types';
import { StyledLink } from 'baseui/link';
import { MdPhone } from 'react-icons/md';

import { PhoneItem, PhoneOptions } from './styles';

function PhoneList({ phones, onSelect }) {
  return (
    <div>
      {phones.map((num) => (
        <PhoneItem key={num.id} onClick={() => onSelect(num)}>
          <PhoneOptions>
            <p>{num.value}</p>
            <StyledLink
              href={`tel:${num.value}`}
              style={{ display: 'flex', marginRight: '5px' }}
            >
              <MdPhone size="1.2rem" />
            </StyledLink>
          </PhoneOptions>
        </PhoneItem>
      ))}
    </div>
  );
}

PhoneList.defaultProps = {
  onSelect: () => {},
};

PhoneList.propTypes = {
  phones: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func,
};

export default PhoneList;
