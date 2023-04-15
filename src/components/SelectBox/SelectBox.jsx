import { MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect } from "react";

const SelectBox = ({ selectData, TargetData, selectIndex }) => {
    const [age, setAge] = React.useState(1);
    const handleChangeMenu = useCallback((event) => {
        setAge(event.target.value);
    }, []);


    useEffect(() => {
        if (TargetData) {
            if (TargetData.length) {
                setAge(TargetData[0].id);
            }
        }
    }, [TargetData]);
    useEffect(() => {
        if (TargetData) {
            if (TargetData.length) {
                if (selectIndex && selectIndex !== -1 && selectIndex !== undefined) {
                    setAge(TargetData[selectIndex].id);

                }
            }
        }
    }, [TargetData, selectIndex]);



    return (
        <>
            {TargetData && TargetData.length ? (
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChangeMenu}
                    className="select-box "
                >
                    {TargetData.map((el, index) => {
                        return (
                            <MenuItem value={el.id} key={el.id}>
                                {el.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            ) : null}
            {selectData && (
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChangeMenu}
                    className="select-box "
                // autoWidth="false"
                >
                    {selectData.length &&
                        selectData.map((el, index) => {
                            return (
                                <MenuItem value={index} key={index}>
                                    {el}
                                </MenuItem>
                            );
                        })}
                </Select>
            )}
        </>
    );
};

export default React.memo(SelectBox);
// import { MenuItem, Select } from "@mui/material";
// import React, { useCallback, useEffect } from "react";

// const SelectBox = ({ selectData, TargetData }) => {
//     const [age, setAge] = React.useState("2");
//     const handleChangeMenu = useCallback((event) => {
//         setAge(event.target.value);
//     }, []);
//     useEffect(() => {
//         if (TargetData) {
//             if (TargetData.length) {
//                 setAge(TargetData[0].id);
//             }
//         }
//     }, [TargetData]);
//     return (
//         <>
//             {TargetData && TargetData.length ? (
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={age}
//                     onChange={handleChangeMenu}
//                     className="select-box "
//                 >
//                     {TargetData.map((el, index) => {
//                         return (
//                             <MenuItem value={el.id} key={el.id}>
//                                 {el.name}
//                             </MenuItem>
//                         );
//                     })}
//                 </Select>
//             ) : null}
//             {selectData && (
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={age}
//                     onChange={handleChangeMenu}
//                     className="select-box "
//                 // autoWidth="false"
//                 >
//                     {selectData.length &&
//                         selectData.map((el, index) => {
//                             return (
//                                 <MenuItem value={index} key={index}>
//                                     {el}
//                                 </MenuItem>
//                             );
//                         })}
//                 </Select>
//             )}
//         </>
//     );
// };

// export default React.memo(SelectBox);