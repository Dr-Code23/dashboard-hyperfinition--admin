import React, { useRef } from 'react';
import BillInfo from '../../components/BillInfo/BillInfo';
import BillTable from '../../components/BillTable/BillTable';
import Button from '@mui/material/Button'

const PrintBox = () => {
  const dataRef = useRef('')

  document.getElementsByTagName("body")[0].onbeforeprint = function () { myFunction() };
  document.getElementsByTagName("body")[0].onafterprint = function () { myFunction2() };
  function myFunction() {
    dataRef.current.classList = 'hidden'
  }
  function myFunction2() {
    dataRef.current.classList = ' flex justify-start w-full  items-end  mt-[40px]'
  }

  return (
    <>
      <div className=" absolute w-full h-full left-0 right-0 top-0 bg-white z-[5000] "   >
        <BillInfo />
        <BillTable />
        <div className=" w-full max-w-[1200px]  px-[24px]  mx-auto">
          <div ref={dataRef} className=' flex justify-start w-full  items-end  mt-[40px]'>

            <Button variant="contained" color="primary" className=' !bg-[#f7b944]'>
              ssss
            </Button>
          </div>

        </div>
      </div>


    </>
  );
}

export default PrintBox;
