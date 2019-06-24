import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Modal from '../Modal';
import { Icon, Textbox, SpinnerGrow, CustomSnackbar } from '../Common';
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

  const onEditItem = async () => {
    await editItem({ id: editId, name: name.value });
    onToggleHandler();
    setSnackbarMsg('Edit Success');
    setSnackbarOpen(!snackbarOpen);
  };

  const onRemoveItemHandler = async id => {
    await removeItem(id);
    setSnackbarMsg('Delete Success');
    setSnackbarOpen(!snackbarOpen);
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

  const onAddItemHandler = async () => {
    await addItem({ name: name.value });
    setSnackbarMsg('Add Success');
    setSnackbarOpen(!snackbarOpen);
    onToggleHandler();
  };

  const onChangeHandler = e => {
    const { id, value } = e.target;
    const newControls = { ...controls };
    newControls[id].value = value;
    setControls(getNewControls(id, value, newControls));
  };

  const onToggleHandler = () => {
    setEditId(null);
    setControls(resetControls({ ...controls }));
    setIsOpen(!isOpen);
  };

  const onCloseSnackbarHandler = () => {
    setSnackbarMsg(null);
    setSnackbarOpen(!snackbarOpen);
  };

  const renderListItem = () =>
    items.map(({ _id, name }) => (
      <CSSTransition key={_id} timeout={500} classNames={'fade'}>
        <ListGroupItem className={`text-${color}`}>
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
      <FormGroup>
        <Label for="name" className={`text-${color}`}>
          Name:
        </Label>
        <Textbox
          id={'name'}
          value={name.value}
          type={'text'}
          placeholder={'Enter name'}
          invalid={!name.valid && name.touch}
          onChange={e => onChangeHandler(e)}
        />
      </FormGroup>
    </Form>
  );

  const renderListGroup = () => {
    return (
      <React.Fragment>
        {loading ? <SpinnerGrow className={MT_5} /> : null}
        <ListGroup className={MT_5}>
          <TransitionGroup>{renderListItem()}</TransitionGroup>
        </ListGroup>
      </React.Fragment>
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
        handleClose={onCloseSnackbarHandler}
      />
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
