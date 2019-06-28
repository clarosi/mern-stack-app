import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Form } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Modal from '../Modal';
import { Icon, CustomSnackbar, FrmGrp, SpinnerDefault } from '../Common';
import { getItems, removeItem, addItem, editItem } from '../../store/actions';
import { getNewControls, resetControls } from '../../shared/utils';
import { MR_3, MT_5, SIZE_SM } from '../../shared/strings';

const ItemList = props => {
  const {
    color,
    items,
    loading,
    getItems,
    removeItem,
    addItem,
    editItem
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [editId, setEditId] = useState(null);
  const [controls, setControls] = useState({
    name: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        required: true,
        minLength: 3,
        maxLength: 20
      }
    }
  });
  const { name } = controls;

  useEffect(() => {
    getItems();
  }, [getItems]);

  const onEditItem = () => {
    editItem({ id: editId, name: name.value });
    onToggleHandler();
    setSnackbarMsg('Editing...');
    setSnackbarOpen(loading);
  };

  const onRemoveItemHandler = id => {
    removeItem(id);
    setSnackbarMsg('Deleting...');
    setSnackbarOpen(loading);
  };

  const onEditItemHandler = id => {
    onToggleHandler();
    setEditId(id);
    onChangeHandler({
      target: {
        id: 'name',
        value: items[items.findIndex(item => item._id === id)].name
      }
    });
  };

  const onAddItemHandler = () => {
    addItem({ name: name.value });
    setSnackbarMsg('Adding...');
    setSnackbarOpen(loading);
    onToggleHandler();
  };

  const onChangeHandler = e => {
    const { id, value } = e.target;
    let newControls = { ...controls };
    newControls[id].value = value;
    newControls = getNewControls({ id, value, newControls });
    setControls(newControls);
  };

  const onToggleHandler = () => {
    setEditId(null);
    setControls(resetControls({ ...controls }));
    setIsOpen(!isOpen);
  };

  const onCloseSnackbarHandler = () => {
    setSnackbarMsg(null);
    setSnackbarOpen(false);
  };

  const renderListItem = () =>
    items.map(({ _id, name }) => (
      <CSSTransition key={_id} timeout={500} classNames={'fade'}>
        <ListGroupItem>
          <Button
            color={'danger'}
            size={SIZE_SM}
            className={MR_3}
            onClick={() => onRemoveItemHandler(_id)}
          >
            <Icon className="fa fa-trash" />
          </Button>
          <Button
            color={color}
            size={SIZE_SM}
            className={MR_3}
            onClick={() => onEditItemHandler(_id)}
          >
            <Icon className="fa fa-edit" />
          </Button>
          {name}
        </ListGroupItem>
      </CSSTransition>
    ));

  const renderModalContent = () => (
    <Form autoComplete={'off'}>
      <FrmGrp
        id={'name'}
        lblTxt={'Name'}
        control={name}
        type={'text'}
        onChange={onChangeHandler}
      />
    </Form>
  );

  const renderListGroup = () => {
    return (
      <Fragment>
        {/* {loading ? <SpinnerGrow className={MT_5} /> : null} */}
        <ListGroup className={MT_5}>
          <TransitionGroup>{renderListItem()}</TransitionGroup>
        </ListGroup>
      </Fragment>
    );
  };

  return (
    <div>
      <Button
        size={'lg'}
        color={color}
        className={MT_5}
        onClick={onToggleHandler}
      >
        <Icon className="fa fa-plus-circle" />
      </Button>
      {renderListGroup()}
      <Modal
        isOpen={isOpen}
        title={`${editId ? 'Edit' : 'Add'} Item`}
        toggle={onToggleHandler}
        action={editId ? onEditItem : onAddItemHandler}
        actionStatus={!name.valid}
        actionText={'Save'}
        loading={loading}
      >
        {renderModalContent()}
      </Modal>
      <CustomSnackbar
        open={snackbarOpen}
        messageInfo={snackbarMsg}
        variant={'info'}
        handleClose={onCloseSnackbarHandler}
      >
        <SpinnerDefault className={'ml-4'} />
      </CustomSnackbar>
    </div>
  );
};

const mapStateToProps = state => {
  const { items, loading } = state.item;
  const { color } = state.color;
  return { items, loading, color };
};

export default connect(
  mapStateToProps,
  { getItems, removeItem, addItem, editItem }
)(ItemList);
