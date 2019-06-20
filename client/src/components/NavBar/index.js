import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Icon } from '../Common';
import { setColor } from '../../store/actions';

const NavBar = props => {
  const colors = [
    'primary',
    'secondary',
    'info',
    'warning',
    'danger',
    'success'
  ];
  const { color, setColor } = props;
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

  return (
    <Navbar color={color} light expand="sm">
      <NavbarBrand href="/">
        <Icon className="fa fa-user"> MERN STACK APP</Icon>
      </NavbarBrand>
      <NavbarToggler onClick={onToggleHandler} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">
              <Icon className="fa fa-plus-circle"> Add</Icon>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <Icon className="fa fa-gavel"> Colors</Icon>
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
