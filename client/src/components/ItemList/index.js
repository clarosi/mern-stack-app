import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Icon } from '../Common';
import { getItems, removeItem } from '../../store/actions';

const ItemList = props => {
  const mt = 'mt-5';
  const { color, items, getItems, removeItem } = props;

  useEffect(() => {
    getItems();
  }, []);

  const onRemoveItemHandler = id => removeItem(id);

  const onAddItemHandler = () => {
    console.log('Add Item');
  };

  const renderListItem = () =>
    items.map(({ id, name }) => (
      <CSSTransition key={id} timeout={500} classNames={'fade'}>
        <ListGroupItem className={`text-${color}`}>
          <Button
            color={'danger'}
            size={'sm'}
            className={'mr-3'}
            onClick={() => onRemoveItemHandler(id)}
          >
            <Icon className="fa fa-trash" />
          </Button>
          {name}
        </ListGroupItem>
      </CSSTransition>
    ));

  return (
    <div>
      <Button
        size={'lg'}
        color={color}
        className={mt}
        onClick={onAddItemHandler}
      >
        <Icon className="fa fa-plus-circle" />
      </Button>
      <ListGroup className={mt}>
        <TransitionGroup>{renderListItem()}</TransitionGroup>
      </ListGroup>
    </div>
  );
};

const mapStateToProps = state => {
  const { items } = state.item;
  const { color } = state.color;
  return { items, color };
};

export default connect(
  mapStateToProps,
  { getItems, removeItem }
)(ItemList);
