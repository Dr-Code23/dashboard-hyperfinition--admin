import React from 'react';
import { UserModal, UsersBox } from '../../components';

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = React.useState('New Brand Name');
  return (
    <>
      <UsersBox  {...{ open, setOpen, nameBrand, setNameBrand }} />
      <UserModal   {...{ open, setOpen, nameBrand, setNameBrand }} />

    </>
  );
}

export default Users;
