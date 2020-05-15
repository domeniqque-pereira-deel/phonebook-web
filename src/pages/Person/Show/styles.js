import { styled, withStyle } from 'styletron-react';
import { StyledLink } from 'baseui/link';

export const Line = styled('div', {
  padding: '10px 0',
});

export const StyledPhoneLink = withStyle(StyledLink, {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
});

export const Section = styled('section', {
  padding: '20px 0',
  borderTop: '1px solid #eee',
});
