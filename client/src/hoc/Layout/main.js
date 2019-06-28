import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { clearError } from '../../store/actions';
import { CustomSnackbar } from '../../components/Common';
import NavBar from '../../components/NavBar';

const MainLayout = props => {
  const { isError, errorMsg, statusCode, clearError } = props;

  return (
    <Fragment>
      <NavBar {...props} />
      <Container>{props.children}</Container>
      <CustomSnackbar
        open={isError && statusCode !== 403}
        messageInfo={errorMsg}
        variant={'error'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        handleClose={() => clearError()}
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { isError, errorMsg, statusCode } = state.error;
  return { isError, errorMsg, statusCode };
};

export default connect(
  mapStateToProps,
  { clearError }
)(MainLayout);
