import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './SubModal.css'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteForever, KeyboardArrowRight, ModeEdit, Shortcut } from '@mui/icons-material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const SubModal = ({ openSub, setOpenSub }) => {
  const handleClose = useCallback(() => {
    setOpenSub(false)
  }, [setOpenSub]);
  let { i18n } = useTranslation()
  const [value, setValue] = React.useState('');
  //handle input language
  const handleChange = (event, newValue) => {
    // setShopEditBox(false)
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
  // ====handle table fun============
  const [tableData, setTableData] = useState(['Dr-1', 'Dr-2', 'Dr-3', 'Dr-4']);
  const [shopEditBox, setShopEditBox] = useState(false);

  const addTable = useCallback((e) => {
    if (e.currentTarget.parentElement.querySelector('input').value) {


      setTableData([...tableData, e.currentTarget.parentElement.querySelector('input').value])

    }
  }, [tableData]);
  const TableChange = useCallback((e) => {
    setTableData(tableData.filter((el) => el !== e))


  }, [tableData]);

  return (
    <>
      <Modal
        open={openSub}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="sub-modal" >
          <form action="" onSubmit={(e) => {
            e.preventDefault();

          }}>
            <div style={{ display: shopEditBox ? 'block' : 'none' }} className=' absolute w-full h-full bg-white  top-0 left-0 z-[3000] pb-[60px] pt-5 px-[20px] rounded-[6px] '>
              <div className=' flex justify-end items-center  w-full mb-[40px]'>
                <IconButton aria-label="" size='large' onClick={() => {
                  setShopEditBox(false)
                }}
                  className=""
                >
                  <Shortcut />
                </IconButton>
              </div>
              <div className="flex items-start justify-start flex-col w-full gap-5 ">
                <div className=' flex items-start w-full justify-start flex-col gap-2'>
                  <h6 className='mb-[0px] text-[17px] font-[500] capitalize  '> Name(en)</h6>

                  <input type="text" placeholder='Name' />

                </div>
                <div className=' flex items-start w-full justify-start flex-col gap-2'>
                  <h6 className='mb-[0px] text-[17px] font-[500] capitalize  '> Name(ar)</h6>

                  <input type="text" placeholder='Name' />

                </div>
                <div className=' flex items-start w-full justify-start flex-col gap-2'>
                  <h6 className='mb-[0px] text-[17px] font-[500] capitalize  '> Name(fr)</h6>

                  <input type="text" placeholder='Name' />

                </div>
              </div>
              <Button className='submit !bg-primaryBg ' variant="contained" >Edit</Button>
            </div>
            <IconButton aria-label="" onClick={() => {
              setOpenSub(false)

            }}
              className="close-modal"
            >
              <CloseIcon />

            </IconButton>
            <h5> Sub Category</h5>

            <Tabs value={value} onChange={handleChange} centered sx={{ mb: '20px' }}>
              <Tab label="English(en)" />
              <Tab label="Arabic(ar)" />
              <Tab label="French(fr)" />
            </Tabs>
            <div className='w-full h-[78px] relative'>

              <>
                <div className='w-full overflow-hidden' style={{ display: value === 0 ? 'block' : 'none' }}>
                  <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(en)</h6>
                  <div className=' flex items-center justify-center gap-2'>
                    <input type="text" placeholder='Name' />
                    <Button className=' !bg-primaryBg h-[42px] ' variant="contained" onClick={(e) => {
                      addTable(e)
                    }}>add</Button>
                  </div>


                </div>
                <div className='w-full overflow-hidden ' style={{ display: value === 1 ? 'block' : 'none' }}>
                  <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(ar)</h6>
                  <div className=' flex items-center justify-center gap-2'>
                    <input type="text" placeholder='Name' />
                    <Button className=' !bg-primaryBg h-[42px] ' variant="contained" onClick={(e) => {
                      addTable(e)
                    }}>add</Button>              </div>
                </div>
                <div className='w-full overflow-hidden' style={{ display: value === 2 ? 'block' : 'none' }}>
                  <h6 className='mb-[10px] text-[17px] font-[500] capitalize  '>Name(fr)</h6>

                  <div className=' flex items-center justify-center gap-2'>
                    <input type="text" placeholder='Name' />
                    <Button className=' !bg-primaryBg h-[42px] ' variant="contained" onClick={(e) => {
                      addTable(e)
                    }}>add</Button>
                  </div>
                </div>
              </>
            </div>

            <TableContainer component={Paper} sx={{ height: '238px' }} className=" max-w-[500px] mt-[20px]" >
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" className='!bg-primaryBg capitalize'>id</StyledTableCell>

                    <StyledTableCell align="center" className='!bg-primaryBg capitalize'>Name</StyledTableCell>
                    <StyledTableCell align="center" className='!bg-primaryBg capitalize'>Actions</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((el, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{index + 1}</StyledTableCell>
                      <StyledTableCell align="center">{el}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="" onClick={() => {
                          setShopEditBox(true)
                        }} >
                          <ModeEdit />
                        </IconButton>
                        <IconButton aria-label="" onClick={() => {
                          TableChange(el)
                        }} >
                          <DeleteForever />
                        </IconButton>
                      </StyledTableCell>


                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button className='submit !bg-primaryBg' variant="contained" type='submit'>Submit</Button>

          </form>
        </Box>
      </Modal>
    </>
  );
}

export default React.memo(SubModal);
