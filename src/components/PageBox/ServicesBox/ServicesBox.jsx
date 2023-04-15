import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./ServicesBox.css";
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
import { Button } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { AllServicesThunk } from "../../../RTK/Thunk/AllServicesThunk";
import { useDispatch, useSelector } from "react-redux";
import { ServicesStatusThunk } from "../../../RTK/Thunk/ServicesStatusThunk";
import SwitchBox from "../../SwitchBox/SwitchBox";
import { DeleteServicesThunk } from "../../../RTK/Thunk/DeleteServicesThunk";

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


const ServicesBox = () => {
  let { t, i18n } = useTranslation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [pageTarget, setPageTarget] = useState(1);

  let { servicesData, lastPage } = useSelector(
    (state) => state.ServicesReducer
  );
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    if (searchValue) {
      dispatch(AllServicesThunk({ page: pageTarget, search: searchValue }));

    }
    else {
      dispatch(AllServicesThunk({ page: pageTarget, search: '' }));

    }
  }, [dispatch, pageTarget, i18n.language, searchValue]);


  let handleDelete = (id) => {
    dispatch(
      DeleteServicesThunk({
        id: id,
      })
    )
      .unwrap()
      .then((data) => {
        // console.log(data);
        dispatch(AllServicesThunk({ page: pageTarget }));
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
              navigate("/admin/services/add");
            }}
          >
            {t("pages.ServicesBox.Add_a_new")}
          </Button>
        </div>
        {servicesData.length ? (
          <TableContainer component={Paper} sx={{ height: "438px" }}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.ServicesBox.table.id")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.ServicesBox.table.Name")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.ServicesBox.table.Price")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.ServicesBox.table.status")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.ServicesBox.table.actions")}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicesData.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.price}
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
                              ServicesStatusThunk(
                                {
                                  id: row.id,
                                  status: false,
                                }
                              )
                            );
                            e.currentTarget.dataset.name = false;
                          } else {
                            dispatch(
                              ServicesStatusThunk(
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
                              `/admin/services/edit/${row.id}`
                            );
                          }}
                        >
                          <ModeEdit />
                        </IconButton>
                        <IconButton aria-label="" onClick={() => {
                          handleDelete(row.id);
                        }}>
                          <DeleteForever />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </div>

      <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
    </>
  );
};

export default ServicesBox;
