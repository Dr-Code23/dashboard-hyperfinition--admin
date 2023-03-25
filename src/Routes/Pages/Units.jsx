import React from 'react';
import { UnitsBox } from '../../components';
import UnitsModal from '../../components/UnitsModal/UnitsModal';

const Units = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (

    <>
      <UnitsBox  {...{ open, setOpen, nameBrand, setNameBrand }} />
      <UnitsModal   {...{ open, setOpen, nameBrand, setNameBrand }} />
    </>
  );
}

export default Units;
