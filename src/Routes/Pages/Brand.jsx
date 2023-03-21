import React from 'react';
import { BrandBox, BrandModal } from '../../components';


const productList = [
  {
    imgUrl: "./assets/headphone-2.jpg",
    name: "headphone-2",
    price: 100,
    available: 15,
  },
  {
    imgUrl: "./assets/iphone-2.jpg",
    name: "iPhone x1",
    price: 1900,
    available: 35,
  },
  {
    imgUrl: "./assets/iphone-1.jpg",
    name: "iPhone x2",
    price: 100,
    available: 0,
  },
];
const Brand = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');

  return (
    <>
      <BrandBox title="All Brand"
        list={productList}
        setOpen={setOpen}
        setNameBrand={setNameBrand}
      />
      <BrandModal {...{ open, setOpen, nameBrand, setNameBrand }} />
    </>
  );
}

export default Brand;
