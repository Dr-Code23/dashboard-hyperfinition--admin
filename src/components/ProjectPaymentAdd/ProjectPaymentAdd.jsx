import { Button, FormControl } from '@mui/material';
import React from 'react';
import SelectBox from '../SelectBox/SelectBox';
let selectData = ['name', 'email', 'pass']
const ProjectPaymentAdd = () => {
  const [selectTarget, setSelectTarget] = React.useState({

    Project: '',

  });
  return (
    <>
      <div className='p-[20px] mt-[40px]'>
        <form action="" className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  " onSubmit={(e) => {
          e.preventDefault()
        }}>
          <div className=' flex flex-wrap  w-full gap-[30px] justify-start items-center'>
            <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]' onClick={(e) => {
              // console.log(e.target.textContent)
              setSelectTarget({ ...selectTarget, Project: e.target.textContent })
            }} >
              <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>Project *</h6>
              <SelectBox selectData={selectData} />

            </FormControl>
            <FormControl className='min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]' >
              <h6 className=' text-[17px]  mb-3 font-[500] capitalize  '>price *</h6>
              <input type="text" placeholder='price' />

            </FormControl>
          </div>
          {/* ======================== */}
          <hr className=' w-full my-[40px]' />

          <Button variant="contained" color="primary" type='submit' className=' !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto'  >
            submit

          </Button>
        </form>
      </div>
    </>
  );
}

export default ProjectPaymentAdd;
