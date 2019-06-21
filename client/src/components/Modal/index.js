import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = props => {
  const {
    isOpen,
    action,
    actionText,
    actionStatus,
    toggle,
    title,
    color,
    children
  } = props;
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader className={`text-${color}`}>
          {title || 'Modal Title'}
        </ModalHeader>
        <ModalBody>{children || 'Add Modal Content As Children...'}</ModalBody>
        <ModalFooter>
          <Button
            color={color}
            onClick={action}
            disabled={actionStatus || false}
          >
            {actionText || 'Ok'}
          </Button>{' '}
          <Button color={color} onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(CustomModal);
