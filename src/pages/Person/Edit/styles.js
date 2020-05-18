import { styled } from 'styletron-react';
import { Button } from 'baseui/button';

export const Container = styled('div', {
  width: '100%',
  maxWidth: '600px',
  padding: '0 10px 40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const AddNumberBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media screen and (max-width: 340px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '20px',
});

export const ButtonAddNumber = styled(Button, {
  '@media screen and (max-width: 340px)': {
    width: '100%',
    marginTop: '0',
  },
});

export const NumbersList = styled('ul', {
  listStyle: 'none',
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
});
