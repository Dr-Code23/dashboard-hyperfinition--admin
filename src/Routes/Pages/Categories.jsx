import React from 'react';
import { CategoriesBox, CategoriesModal, ParentModal, SubModal } from '../../components';

const Categories = () => {
  const [open, setOpen] = React.useState(false);
  const [openCt, setOpenCt] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (

    <>
      <CategoriesBox  {...{ setOpen, setOpenCt, setOpenParent, setOpenSub }} />
      <CategoriesModal />
      <ParentModal   {...{ openParent, setOpenParent, }} />
      <SubModal   {...{ openSub, setOpenSub }} />
    </>
  );
}

export default Categories;
