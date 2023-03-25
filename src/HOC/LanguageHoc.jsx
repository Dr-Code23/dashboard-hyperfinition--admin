import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
const LanguageHoc = ({ children }) => {
  const [value, setValue] = React.useState('');
  let { t, i18n } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (i18n.language === 'en') {
      setValue(0)
    }
    if (i18n.language === 'ar') {
      setValue(1)
    }
    if (i18n.language === 'fr') {
      setValue(2)
    }
  }, [i18n.language]);
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }}>
        <Tab label="English(en)" />
        <Tab label="Arabic(ar)" />
        <Tab label="French(fr)" />
      </Tabs>
      {children}
    </>
  );
}

export default LanguageHoc;
