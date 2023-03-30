import React from 'react';
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerConstructor extends React.Component {
  render() {
    const list = this.props.listElem;
    const scrollList = list.map((item) => (
      <div key={item._id}>
        <DragIcon type='primary' />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    ));
    return (
      <section>
        <div style={{ margin: '0 0 0 20px' }}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={this.props.firstElem.name}
            price={this.props.firstElem.price}
            thumbnail={this.props.firstElem.image}
          />
        </div>

        <div style={{ height: '350px', overflow: 'hidden', padding: '10px 0' }}>
          <div
            className='custom-scroll'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              height: '100%',
              overflow: 'auto',
            }}
          >
            {scrollList}
          </div>
        </div>

        <div style={{ margin: '0 0 0 20px' }}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={this.props.lastElem.name}
            price={this.props.lastElem.price}
            thumbnail={this.props.firstElem.image}
          />
        </div>

        <div className='p-10'>
          <Button htmlType='button' type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}
