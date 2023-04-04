import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBox = ({ count, setPageTarget }) => {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    // useEffect(() => {
    //   setPageTarget(page)
    // }, [page, setPageTarget]);
    return (
        <div
            className="pagination-box flex justify-center items-center mt-[40px]"
            dir="ltr"
        >
            <Stack spacing={2}>
                <Pagination
                    count={count}
                    page={page}
                    size="large"
                    onChange={handleChange}
                />
            </Stack>
        </div>
    );
};

export default PaginationBox;
