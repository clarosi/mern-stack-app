import React from 'react';
import { Container } from 'reactstrap';

import NavBar from '../../components/NavBar';

const MainLayout = props => {
  return (
    <React.Fragment>
      <NavBar {...props} />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
};

export default MainLayout;
