import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./ProductBox.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { AlertDialog, PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProductReducer from "../../../RTK/Reducers/ProductReducer";
import { AllProductThunk } from "../../../RTK/Thunk/AllProductThunk";
import SwitchBox from "../../SwitchBox/SwitchBox";
import { ProductStatusThunk } from "../../../RTK/Thunk/ProductStatusThunk";
import { DeleteProductThunk } from "../../../RTK/Thunk/DeleteProductThunk";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



const ProductBox = () => {
  let navigate = useNavigate();
  let { t, i18n } = useTranslation();

  let dispatch = useDispatch();
  const [pageTarget, setPageTarget] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  let { productData, lastPage } = useSelector(
    (state) => state.ProductReducer
  );

  useEffect(() => {
    if (searchValue) {
      dispatch(AllProductThunk({ page: pageTarget, search: searchValue }));

    }
    else {
      dispatch(AllProductThunk({ page: pageTarget, search: '' }));

    }
  }, [dispatch, pageTarget, i18n.language, searchValue]);

  let handleDelete = (id) => {
    dispatch(
      DeleteProductThunk({
        id: id,
      })
    )
      .unwrap()
      .then((data) => {
        // console.log(data);
        dispatch(AllProductThunk({ page: pageTarget, search: '' }));
      })
      .catch((error) => {
        // console.log(error);
        // handle error here
      });
  };

  return (
    <>
      <div className=" mx-auto px-4  mt-[40px]">
        <div className="flex  items-start md:items-center justify-between flex-col md:flex-row mb-3  gap-5 ">
          <div className='flex  items-end gap-2 pl-1'>
            <h6 className=' capitalize text-[22px]  font-medium	'>{t("pages.BrandBox.search")} :</h6>
            <input type="text" className=' bg-secondaryBg outline-none p-[8px]' value={searchValue} onChange={(e) => {

              setSearchValue(e.target.value)
            }

            } />
          </div>
          <Button
            variant="contained"
            color="primary"
            className=" !bg-primaryBg"
            onClick={() => {
              navigate("/admin/product/add");
            }}
          >
            {t("pages.ProductBox.Add_a_new")}
          </Button>
        </div>
        {productData.length ? (<TableContainer component={Paper} sx={{ height: "438px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.id")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.Name")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.Price")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.status")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.actions")}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.unit_price}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div
                      data-name={row.status}
                      onClick={(e) => {
                        if (
                          e.currentTarget.dataset
                            .name == "true"
                        ) {
                          dispatch(
                            ProductStatusThunk(
                              {
                                id: row.id,
                                status: false,
                              }
                            )
                          );
                          e.currentTarget.dataset.name = false;
                        } else {
                          dispatch(
                            ProductStatusThunk(
                              {
                                id: row.id,
                                status: true,
                              }
                            )
                          );
                          e.currentTarget.dataset.name = true;
                        }
                      }}
                    >
                      <SwitchBox
                        status={row.status}
                      />
                    </div>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <div className="action flex items-center justify-center gap-2">
                      <IconButton
                        aria-label=""
                        onClick={() => {
                          navigate(
                            `/admin/product/edit/${row.id
                            }`
                          );
                        }}
                      >
                        <ModeEdit />
                      </IconButton>
                      <IconButton aria-label="" onClick={() => {
                        // handleDelete(row.id);
                        setOpenAlert(true)
                        setDeleteId(row.id)
                      }}>
                        <DeleteForever />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : null}

      </div>
      <AlertDialog open={openAlert} setOpen={setOpenAlert} handleDelete={handleDelete} deleteId={deleteId} setDeleteId={setDeleteId} />
      <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
    </>
  );
};

export default ProductBox;
