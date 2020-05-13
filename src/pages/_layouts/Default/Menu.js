import React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button, SHAPE } from 'baseui/button';
import { useDispatch } from 'react-redux';
import { useStyletron, styled } from 'baseui';
import { ButtonGroup } from 'baseui/button-group';

import { signOut } from '~/store/ducks/auth';
import history from '~/services/history';

function Menu() {
  // const userEmail = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();

  const [css] = useStyletron();

  const topMenuStyle = css({
    '@media screen and (max-width: 625px)': {
      display: 'none',
    },
  });

  const BottomMenu = styled('div', {
    width: '100%',
    position: 'fixed',
    bottom: '-10px',
    left: '0',
    padding: '10px 10px 20px 10px',
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: '',
    '@media screen and (min-width: 625px)': {
      display: 'none',
    },
  });

  return (
    <>
      <HeaderNavigation style={{ padding: '10px', border: 'none' }}>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <StyledLink onClick={() => history.push('/')}>Phonebook</StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>

        <StyledNavigationList $align={ALIGN.center} />

        <StyledNavigationList className={topMenuStyle} $align={ALIGN.right}>
          <StyledNavigationItem>
            <StyledLink onClick={() => history.push('/persons')}>
              Interessados
            </StyledLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StyledLink href="#basic-link2">Números</StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>

        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button onClick={() => dispatch(signOut())} shape={SHAPE.pill}>
              Sair
            </Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>

      <BottomMenu>
        <ButtonGroup>
          <Button onClick={() => history.push('/persons')}>Interessados</Button>
          <Button>Números</Button>
        </ButtonGroup>
      </BottomMenu>
    </>
  );
}

export default Menu;
