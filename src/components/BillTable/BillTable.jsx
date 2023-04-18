import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f7b944",
    color: "#fff",
    border: " 1px solid #a7a7a7",
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
    border: " 1px solid #a7a7a7",
  },
}));


export default function BillTable({ data }) {
  const [t, i18n] = useTranslation();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (data?.products?.length) {
      data?.products.forEach((el) => {
        setTotal((prev) => prev + el.sub_total)
      })

    }
    //
  }, [data]);
  useEffect(() => {
    return () => {
      setTotal(0)

    };
  }, []);
  return (
    <section>
      {
        data?.products?.length ? (
          <Container>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold"> {t("print.table.Id")}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold"> {t("print.table.name")}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold" colSpan={3}> {t("print.table.Description")}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold"> {t("print.table.Quantity")}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold"> {t("print.table.Price")}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: '#000' }} className=" !font-bold"> {t("print.table.SubTotal")}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.products.map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">{row.name}</StyledTableCell>
                      <StyledTableCell align="center" colSpan={3}>{row.description}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.unit_price}</StyledTableCell>
                      <StyledTableCell align="center">

                        {Number(row.sub_total).toFixed(2)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <TableRow style={{ background: '#f7b944', color: '##000', }}>
                    <TableCell colSpan={5} align="center" className=" !font-bold" style={{ color: '#000' }}>
                      {t("print.table.Total")}
                    </TableCell>
                    <TableCell align="center" colSpan={3} className=" !font-bold" style={{ color: '#000' }}>
                      {Number(total).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>) : null
      }

    </section>
  );
}
