import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { SpinnerGrow } from '../Common';

const CustomModal = props => {
  const {
    isOpen,
    action,
    actionText,
    actionStatus,
    toggle,
    title,
    color,
    children,
    loading
  } = props;

  const renderButtonAction = () => {
    if (loading) return <SpinnerGrow />;
    return (
      <Fragment>
        <Button color={color} onClick={action} disabled={actionStatus}>
          {actionText || 'Ok'}
        </Button>{' '}
        <Button color={color} onClick={toggle}>
          Cancel
        </Button>
      </Fragment>
    );
  };

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader className={`text-${color}`}>
          {title || 'Modal Title'}
        </ModalHeader>
        <ModalBody>{children || 'Add Modal Content As Children...'}</ModalBody>
        <ModalFooter>{renderButtonAction()}</ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(CustomModal);
