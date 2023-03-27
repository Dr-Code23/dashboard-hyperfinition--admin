

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesBox.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import { DeleteForever, ModeEdit, RemoveRedEye } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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

const CategoriesBox = ({ setOpen, setOpenCt, setOpenParent, setOpenSub }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className=" mx-auto px-4  mt-[40px]">
        <>
          <div className="box-bt flex  items-center justify-end gap-[20px] mb-5 ">
            <Button variant="contained" color="primary" className=' !bg-primaryBg ' onClick={() => {
              setOpenParent(true)
            }} >
              Add Parent Category

            </Button>
            <Button variant="contained" color="primary" className=' !bg-primaryBg' onClick={() => { setOpenSub(true) }} >
              Add Sub Category
            </Button>
          </div>


        </>
        <TableContainer component={Paper} sx={{ height: '438px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>id</StyledTableCell>

                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>Name</StyledTableCell>
                <StyledTableCell align="center" className='!bg-primaryBg capitalize'>actions</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>

                  <StyledTableCell align="center">{row.calories}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div className='action flex items-center justify-center gap-2'>
                      <>
                        <IconButton id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}  >
                          <ModeEdit />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          sx={{ boxShadow: 'none' }}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                          className='menu-box'
                        >
                          <MenuItem onClick={() => {
                            handleClose()
                            setOpenParent(true)
                          }}>
                            Parent Category
                          </MenuItem>
                          <MenuItem onClick={() => {
                            handleClose()
                            setOpenSub(true)
                          }}>
                            Sub Category
                          </MenuItem>
                        </Menu>
                      </>
                      <IconButton aria-label="" onClick={() => { setOpenCt(true) }}  >
                        <RemoveRedEye />
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

export default React.memo(CategoriesBox);