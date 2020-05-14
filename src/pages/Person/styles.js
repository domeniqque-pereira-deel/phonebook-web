import { Card } from 'baseui/card';
import { Button } from 'baseui/button';
import { styled } from 'baseui';

export const PersonList = styled('div', {
  padding: '10px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const CardPerson = styled(Card, {
  marginBottom: '10px',
  ':hover': { background: '#eee' },
  cursor: 'pointer',
  width: '100%',
  maxWidth: '600px',
});

export const ButtonAddPerson = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
  width: '100%',
  maxWidth: '600px',
  border: '2px dashed #e2e2e2',
});
