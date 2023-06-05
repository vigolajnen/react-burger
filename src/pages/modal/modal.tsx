import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { generalRequest } from '../../services/api';

import Modal from '../../components/modal/Modal';
import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import { TIngredient } from '../../utils/types';

const ModalPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const ingredient = useSelector((state: any) => state.ingredients.ingredient);
  const [item, setItem] = useState(ingredient);

  useEffect(() => {
    (generalRequest('ingredients') as unknown as Promise<unknown>).then((data: any) => {
      setItem(data.data.find((elem: TIngredient) => elem._id === id));
    });
  }, [id]);

  return (
    <>
      <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
        {item && <IngredientDetails item={item} />}
      </Modal>
    </>
  );
};

export { ModalPage };
