import React from 'react';
import Switch from '@mui/material/Switch';

const SwitchBox = () => {
  const [checked, setChecked] = React.useState(false);
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <Switch
        className={checked ? 'switch activeChecked' : 'switch '}
        checked={checked}
        onChange={handleChangeSwitch}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </>
  );
}

export default SwitchBox;
