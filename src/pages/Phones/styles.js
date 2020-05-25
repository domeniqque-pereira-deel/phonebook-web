import { styled } from 'styletron-react';
import { Button } from 'baseui/button';

export const AddButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
  width: '100%',
  maxWidth: '600px',
  border: '2px dashed #e2e2e2',
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
