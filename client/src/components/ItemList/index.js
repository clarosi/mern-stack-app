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
import { Icon, Textbox, SpinnerGrow } from '../Common';
import { getItems, removeItem, addItem } from '../../store/actions';
import { getNewControls, resetControls } from '../../shared/utils';
import { MR_3, MT_5 } from '../../shared/strings';

const ItemList = props => {
  const size = 'sm';
  const { color, items, loading, getItems, removeItem, addItem } = props;
  const [isOpen, setIsOpen] = useState(false);
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
  }, []);

  const onRemoveItemHandler = id => removeItem(id);

  const onEditItemHandler = id => {
    console.log(`id: ${id}`);
  };

  const onAddItemHandler = () => {
    addItem({ name: name.value });
    onToggleHandler();
  };

  const onChangeHandler = e => {
    const { id, value } = e.target;
    const newControls = { ...controls };
    newControls[id].value = value;
    setControls(getNewControls(id, value, newControls));
  };

  const onToggleHandler = () => {
    setControls(resetControls({ ...controls }));
    setIsOpen(!isOpen);
  };

  const renderListItem = () =>
    items.map(({ _id, name }) => (
      <CSSTransition key={_id} timeout={500} classNames={'fade'}>
        <ListGroupItem className={`text-${color}`}>
          <Button
            color={'danger'}
            size={size}
            className={MR_3}
            onClick={() => onRemoveItemHandler(_id)}
          >
            <Icon className="fa fa-trash" />
          </Button>
          <Button
            color={color}
            size={size}
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
        <Label for="name">Name:</Label>
        <Textbox
          id={'name'}
          value={name.value}
          type={'text'}
          placeholder={'enter name'}
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
        title={'Add Item'}
        toggle={onToggleHandler}
        action={onAddItemHandler}
        actionStatus={!name.valid}
        actionText={'Save'}
      >
        {renderModalContent()}
      </Modal>
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
  { getItems, removeItem, addItem }
)(ItemList);
