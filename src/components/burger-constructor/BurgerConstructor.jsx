import React from 'react';
import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import img from '../../images/list/bun-02.png';

export default class BurgerConstructor extends React.Component {
  render() {
    return (
      <section>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail={img}
        />
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
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={img}
            />
          </div>
        </div>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail={img}
        />

        <div className='p-10'>
          <Button htmlType='button' type='primary' size='medium'>
            Нажми на меня
          </Button>
        </div>
      </section>
    );
  }
}
