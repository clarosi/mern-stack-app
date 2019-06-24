import React from 'react';

import NavBar from '../../components/NavBar';

const MainLayout = props => (
  <React.Fragment>
    <NavBar {...props} />
    {props.children}
  </React.Fragment>
);

export default MainLayout;
