import React from 'react';
import { ProductBox } from '../../components';

const Product = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (
    <>
      <ProductBox title="All Brand"
        setOpen={setOpen}
        setNameBrand={setNameBrand}
      />
      {/* <BrandModal {...{ open, setOpen, nameBrand, setNameBrand }} /> */}
    </>
  );
}

export default Product;
