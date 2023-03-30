
import React from 'react';

import { useNavigate } from 'react-router-dom';
import './ServicesBox.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import { DeleteForever, ModeEdit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { PaginationBox } from '../../index.js'

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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ServicesBox = ({ title, list, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" mx-auto px-4  mt-[40px]">

        <div className='flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 '>
          {/* <div className='flex  items-end gap-2 pl-1'>
            <h6 className=' capitalize text-[22px]  font-medium	'>search :</h6>
            <input type="text" className=' bg-secondaryBg outline-none p-[8px]' />
          </div> */}
          <Button variant="contained" color="primary" className=' !bg-primaryBg' onClick={() => {
            navigate('/admin/services/add/add')
          }} >
            Add a new
          </Button>
        </div>
        <TableContainer component={Paper} sx={{ height: '438px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>id</StyledTableCell>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>Name</StyledTableCell>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>price</StyledTableCell>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>actions</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{row.calories}</StyledTableCell>
                  <StyledTableCell align="center">{row.calories}</StyledTableCell>

                  <StyledTableCell align="center">
                    <div className='action flex items-center justify-center gap-2'>
                      <IconButton aria-label="" onClick={() => {
                        navigate(`/admin/services/edit/${index + 1}`)
                      }}>
                        <ModeEdit />
                      </IconButton>
                      <IconButton aria-label="" >
                        <DeleteForever />
                      </IconButton>
                    </div>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>

      <PaginationBox count={10} />

    </>

  );
}

export default ServicesBox;
