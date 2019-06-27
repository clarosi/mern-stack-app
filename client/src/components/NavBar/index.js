import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Icon, RouterLink } from '../Common';
import { setColor, doLogout } from '../../store/actions';
import {
  HOME_LINK,
  SIGNUP_LINK,
  SIGNIN_LINK,
  ABOUT_LINK,
  TOKEN_NAME
} from '../../shared/strings';

const NavBar = props => {
  const colors = [
    'primary',
    'secondary',
    'info',
    'warning',
    'danger',
    'success'
  ];
  const { user, color, setColor, doLogout, location, history } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleHandler = () => setIsOpen(!isOpen);

  const onChangeColorHandler = color => setColor(color);

  const onLogoutHandler = () => {
    localStorage.removeItem(TOKEN_NAME);
    doLogout();
    history.push(SIGNIN_LINK);
  };

  const renderDropdownItem = () => (
    <Fragment>
      <DropdownItem
        className={`text-${colors[0]}`}
        onClick={() => onChangeColorHandler(colors[0])}
      >
        {colors[0]}
      </DropdownItem>
      <DropdownItem
        className={`text-${colors[1]}`}
        onClick={() => onChangeColorHandler(colors[1])}
      >
        {colors[1]}
      </DropdownItem>
      <DropdownItem
        className={`text-${colors[2]}`}
        onClick={() => onChangeColorHandler(colors[2])}
      >
        {colors[2]}
      </DropdownItem>
      <DropdownItem
        className={`text-${colors[3]}`}
        onClick={() => onChangeColorHandler(colors[3])}
      >
        {colors[3]}
      </DropdownItem>
      <DropdownItem
        className={`text-${colors[4]}`}
        onClick={() => onChangeColorHandler(colors[4])}
      >
        {colors[4]}
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        className={`text-${colors[5]}`}
        onClick={() => onChangeColorHandler(colors[5])}
      >
        {colors[5]}
      </DropdownItem>
    </Fragment>
  );

  const renderToggleMenuItem = () => {
    const { pathname } = location;

    if (!user) {
      if (pathname === SIGNUP_LINK) {
        return (
          <RouterLink className={'nav-link'} to={SIGNIN_LINK}>
            <Icon className="fa fa-arrow-circle-right" /> SignIn
          </RouterLink>
        );
      }
      return (
        <RouterLink className={'nav-link'} to={SIGNUP_LINK}>
          <Icon className="fa fa-user-plus" /> SignUp
        </RouterLink>
      );
    }
    if (pathname !== HOME_LINK) {
      return (
        <RouterLink className={'nav-link'} to={HOME_LINK}>
          <Icon className="fa fa-home" /> Home
        </RouterLink>
      );
    }
    return (
      <RouterLink className={'nav-link'} to={ABOUT_LINK}>
        <Icon className="fa fa-info-circle" /> About
      </RouterLink>
    );
  };

  const renderLogoutMenuItem = () => {
    if (user)
      return (
        <RouterLink onClick={onLogoutHandler} className={'nav-link'} to={'#'}>
          <Icon className="fa fa-arrow-circle-left" /> Logout
        </RouterLink>
      );
  };

  const renderNavbarBrandIcon = () => {
    if (user) {
      return (
        <Fragment>
          <Icon className="fa fa-user" /> {user.name}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Icon className="fa fa-globe" /> MERN STACK APP
      </Fragment>
    );
  };

  return (
    <Navbar color={color} light expand="sm">
      <RouterLink className={'navbar-brand'} to={HOME_LINK}>
        {renderNavbarBrandIcon()}
      </RouterLink>
      <NavbarToggler onClick={onToggleHandler} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>{renderToggleMenuItem()}</NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <Icon className="fa fa-cog" /> Themes
            </DropdownToggle>
            <DropdownMenu right>{renderDropdownItem()}</DropdownMenu>
          </UncontrolledDropdown>
          {renderLogoutMenuItem()}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  const { user } = state.auth;
  const { color } = state.color;
  return { user, color };
};

export default connect(
  mapStateToProps,
  { setColor, doLogout }
)(NavBar);
