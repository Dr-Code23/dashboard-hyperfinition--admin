import React from 'react';
import { AttreibutesBox, AttributesModal } from '../../components';

const Attributes = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (
    <>
      <AttreibutesBox {...{ open, setOpen, nameBrand, setNameBrand }} />
      <AttributesModal {...{ open, setOpen, nameBrand, setNameBrand }} />

    </>
  );
}

export default Attributes;
