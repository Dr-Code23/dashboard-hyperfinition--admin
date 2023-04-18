import React, { useEffect, useRef } from 'react';
import BillInfo from '../../components/BillInfo/BillInfo';
import BillTable from '../../components/BillTable/BillTable';
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PrintThunk } from '../../RTK/Thunk/PrintThunk';
import { DataView } from '../../RTK/Reducers/PrintReducer';

const PrintBox = () => {
  const dataRef = useRef('')
  let dispatch = useDispatch()
  let { printData } = useSelector((state) => state.PrintReducer)

  let param = useParams()
  const [t, i18n] = useTranslation();
  let navigate = useNavigate()
  document.getElementsByTagName("body")[0].onbeforeprint = function () { myFunction() };
  document.getElementsByTagName("body")[0].onafterprint = function () { myFunction2() };

  function myFunction() {
    dataRef.current.classList = 'hidden'
  }
  function myFunction2() {
    dataRef.current.classList = ' flex justify-start w-full  items-end gap-[40px]  mt-[40px]'
  }
  useEffect(() => {
    if (param.printId) {
      // console.log(param.printId)
      dispatch(PrintThunk({ id: param.printId }))
    }
  }, [param.printId, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(DataView())
    };
  }, []);
  return (
    <>
      {/* <div className=" absolute w-full h-full left-0 right-0 top-0 bg-white z-[5000] "   > */}
      <div className=' relative overflow-auto w-full h-full z-[10000] py-[100px]'>
        <BillInfo data={printData} />
        <BillTable data={printData} />
        <div className=" w-full max-w-[1200px]  px-[24px]  mx-auto">
          <div ref={dataRef} className=' flex justify-start w-full  items-end gap-[40px]  mt-[40px]'>

            <Button variant="contained" color="primary" className=' !bg-[#f7b944]' onClick={() => {
              navigate("/admin/projectExpense")

            }}>

              {t("print.go_back")}

            </Button>
            <Button variant="contained" color="primary" className=' !bg-[#f7b944]' onClick={() => {
              window.print()

            }}>
              {t("print.print_window")}

            </Button>
          </div>

        </div>
      </div>
      {/* </div> */}



    </>
  );
}

export default PrintBox;
