import React, { useState } from 'react';
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
import { setColor } from '../../store/actions';
import { HOME_LINK, ABOUT_LINK } from '../../shared/strings';

const NavBar = props => {
  const colors = [
    'primary',
    'secondary',
    'info',
    'warning',
    'danger',
    'success'
  ];
  const { color, setColor, location } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleHandler = () => setIsOpen(!isOpen);

  const onChangeColorHandler = color => setColor(color);

  const renderDropdownItem = () => (
    <React.Fragment>
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
    </React.Fragment>
  );

  const renderToggleMenuItem = () => {
    if (location.pathname !== '/') {
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

  return (
    <Navbar color={color} light expand="sm">
      <RouterLink className={'navbar-brand'} to={HOME_LINK}>
        <Icon className="fa fa-globe" /> MERN STACK APP
      </RouterLink>
      <NavbarToggler onClick={onToggleHandler} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>{renderToggleMenuItem()}</NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <Icon className="fa fa-star" /> Themes
            </DropdownToggle>
            <DropdownMenu right>{renderDropdownItem()}</DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(
  mapStateToProps,
  { setColor }
)(NavBar);
