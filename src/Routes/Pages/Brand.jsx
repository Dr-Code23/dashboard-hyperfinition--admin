import React from 'react';
import { BrandBox, BrandModal } from '../../components';



const Brand = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');

  return (
    <>
      <BrandBox title="All Brand"
        setOpen={setOpen}
        setNameBrand={setNameBrand}
      />
      <BrandModal {...{ open, setOpen, nameBrand, setNameBrand }} />
    </>
  );
}

export default Brand;
