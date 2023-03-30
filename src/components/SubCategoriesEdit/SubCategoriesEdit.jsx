import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, } from '@mui/material';

const SubCategoriesEdit = () => {
  let { i18n } = useTranslation()
  const [value, setValue] = React.useState(0);

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
      <div className='p-[20px] mt-[40px]'>
        <form action="" className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  " onSubmit={(e) => {
          e.preventDefault()
        }}>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }} className='justify-start'>
            <Tab label="English(en)" className='!p-2' />
            <Tab label="Arabic(ar)" className='!p-2' />
            <Tab label="French(fr)" className='!p-2' />
          </Tabs>
          <hr className=' w-full my-[20px]' />
          <div className='flex justify-center flex-col lg:flex-row items-center w-full max-w-[500px]  gap-5 h-full'>
            <>

              <div className=' w-full ' style={{ display: value === 0 ? 'block' : 'none' }}>
                <h6 className=' text-[17px] mb-3 font-[500] capitalize  '>Sub category Name(EN)
                  (en)</h6>

                <input type="text" placeholder='Name' />
              </div>
              <div className=' w-full ' style={{ display: value === 1 ? 'block' : 'none' }}>
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Sub category Name(EN)
                  (ar)</h6>

                <input type="text" placeholder='Name' />
              </div>
              <div className=' w-full ' style={{ display: value === 2 ? 'block' : 'none' }}>
                <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Sub category Name(EN)
                  (fr)</h6>

                <input type="text" placeholder='Name' />
              </div>
            </>

          </div>

          <Button variant="contained" color="primary" type='submit' className=' !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto'  >
            submit

          </Button>
        </form>
      </div>

    </>
  );
}

export default SubCategoriesEdit;
