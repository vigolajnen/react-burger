import React from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import ModalIngredientDetails from '../modal-ingredient-details/ModalIngredientDetails';

import stylesItem from './IngredientDetails.module.css';

class IngredientDetails extends React.Component {
  state = {
    count: 0,
    open: false,
  };

  setOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const item = this.props.item;

    return (
      <>
        <a
          href='#modalDetails'
          className={stylesItem.item}
          data-id={item._id}
          data-value={item.type}
          onClick={this.setOpen}
        >
          {this.state.count !== 0 && (
            <Counter count={this.state.count} size='default' extraClass='m-1' />
          )}

          <img className={stylesItem.pic} src={item.image} alt={item.name} />
          <div className={stylesItem.price}>
            <span>{item.price}</span>
            <CurrencyIcon type='primary' />
          </div>
          <h3 className={stylesItem.title}>{item.name}</h3>
        </a>
        <Modal isOpen={this.state.open} onClose={this.setOpen}>
          <ModalIngredientDetails item={item} />
        </Modal>
      </>
    );
  }
}

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
