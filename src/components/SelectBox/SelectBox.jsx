import { MenuItem, Select } from '@mui/material';
import React, { useCallback } from 'react';

const SelectBox = ({ selectData }) => {
  const [age, setAge] = React.useState('0');
  const handleChangeMenu = useCallback((event) => {

    setAge(event.target.value);

  }, [])
  return (

    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={age}
      onChange={handleChangeMenu}
      className='select-box '

    >
      {
        selectData.length && selectData.map((el, index) => {
          return (
            <MenuItem value={index} key={index}>
              {el}
            </MenuItem>
          )
        })
      }

    </Select>

  );
}

export default SelectBox;
