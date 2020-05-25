import { styled } from 'styletron-react';
import { Card } from 'baseui/card';

export const PhoneItem = styled(Card, {
  marginBottom: '10px',
  ':hover': { background: '#eee' },
  cursor: 'pointer',
  width: '100%',
  maxWidth: '600px',
});

export const PhoneList = styled('div', {});

export const PhoneOptions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});
