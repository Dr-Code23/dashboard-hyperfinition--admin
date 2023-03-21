import React from 'react';
import {
  Box,
  Card,
  Container,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import './BrandBox.css'
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',

  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const BrandBox = ({ title, list, setOpen }) => {
  // const navigation = useNavigate();

  return (

    <Container sx={{ mt: 2 }} fixed className='brand-box' >
      <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
        <CardHeader>
          <Title>{title}</Title>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>


                <TableCell sx={{ px: 3 }} colSpan={2} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ px: 3 }} colSpan={2} align="center">
                  Actions
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((product, index) => (
                <TableRow key={index} hover>
                  <TableCell colSpan={2} align="center" sx={{ px: 3, textTransform: 'capitalize' }}>
                    Xo
                  </TableCell>





                  <TableCell sx={{ px: 0 }} colSpan={2} align="center">
                    {/* <IconButton onClick={() => { }}>
                      <VisibilityIcon />
                    </IconButton> */}
                    <IconButton onClick={() => {
                      setOpen(true)
                    }}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton >
                      <CloseIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ProductTable>
        </Box>
      </Card>
    </Container>
  );
}

export default BrandBox;
