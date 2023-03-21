import React, { useState } from 'react';
import { MyShopBox, ShopModal } from '../../components';

const Shop = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  return (
    <>
      <MyShopBox {...{ open, setOpen, editData, setEditData }} />
      <ShopModal {...{ open, setOpen, editData, setEditData }} />

    </>
  );
}

export default Shop;
