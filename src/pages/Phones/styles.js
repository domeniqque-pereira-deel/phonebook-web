import { styled } from 'styletron-react';
import { Button } from 'baseui/button';

export const ButtonAddNumber = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px 0',
  width: '100%',
  maxWidth: '600px',
  border: '2px dashed #e2e2e2',
});
