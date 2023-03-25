import React from 'react';
import { CategoriesBox } from '../../components';
import CategoriesModal from '../../components/CategoriesModal/CategoriesModal';

const Categories = () => {
  const [open, setOpen] = React.useState(false);
  const [openCt, setOpenCt] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (

    <>
      <CategoriesBox  {...{ setOpen, nameBrand, setNameBrand, setOpenCt }} />
      <CategoriesModal   {...{ open, setOpen, nameBrand, setNameBrand, openCt, setOpenCt }} />
    </>
  );
}

export default Categories;
