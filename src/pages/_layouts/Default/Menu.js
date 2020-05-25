import React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button, SHAPE, KIND } from 'baseui/button';
import { useDispatch } from 'react-redux';
import { useStyletron, styled } from 'baseui';
import { MdPeople, MdList } from 'react-icons/md';

import { signOut } from '~/store/ducks/auth';
import history from '~/services/history';

function Menu() {
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
    paddingBottom: '10px',
    background: '#fff',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'center',
    zIndex: '1000',
    alignItems: '',
    '@media screen and (min-width: 625px)': {
      display: 'none',
    },
  });

  const ButtonBottom = styled(Button, {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const MenuLink = styled(StyledLink, {
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <>
      <HeaderNavigation className={css({ padding: '10px', border: 'none' })}>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <StyledLink onClick={() => history.push('/phones')}>
              Phonebook
            </StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>

        <StyledNavigationList $align={ALIGN.center} />

        <StyledNavigationList className={topMenuStyle} $align={ALIGN.right}>
          <StyledNavigationItem>
            <MenuLink onClick={() => history.push('/phones')}>
              <MdList />{' '}
              <span className={css({ marginLeft: '4px' })}>Números</span>
            </MenuLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <MenuLink onClick={() => history.push('/persons')}>
              <MdPeople />
              <span className={css({ marginLeft: '4px' })}>Interessados</span>
            </MenuLink>
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
        <ButtonBottom
          kind={KIND.tertiary}
          onClick={() => history.push('/persons')}
        >
          <MdPeople size="1.2rem" />
          <span>Interessados</span>
        </ButtonBottom>
        <ButtonBottom
          kind={KIND.tertiary}
          onClick={() => history.push('/phones')}
        >
          <MdList size="1.2rem" />
          <span>Números</span>
        </ButtonBottom>
      </BottomMenu>
    </>
  );
}

export default Menu;
