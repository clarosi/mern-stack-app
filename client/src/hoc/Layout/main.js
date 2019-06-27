import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { clearError } from '../../store/actions';
import { CustomSnackbar } from '../../components/Common';
import NavBar from '../../components/NavBar';

const MainLayout = props => {
  const { isError, errorMsg, clearError } = props;

  return (
    <Fragment>
      <NavBar {...props} />
      <Container>{props.children}</Container>
      <CustomSnackbar
        open={isError}
        messageInfo={errorMsg}
        autoHideDuration={5000}
        variant={'error'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        handleClose={() => clearError()}
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { isError, errorMsg } = state.error;
  return { isError, errorMsg };
};

export default connect(
  mapStateToProps,
  { clearError }
)(MainLayout);
