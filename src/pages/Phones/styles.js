import { styled } from 'styletron-react';
import { Button } from 'baseui/button';
import { Card } from 'baseui/card';

export const ButtonAddNumber = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
  width: '100%',
  maxWidth: '600px',
  border: '2px dashed #e2e2e2',
});

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

export const ButtonGroup = styled('div', {
  paddingTop: '10px',
  display: 'flex',
  flexWrap: 'wrap',
});

export const ModalAction = styled(Button, {
  marginTop: '5px',
  marginRight: '5px',
});
