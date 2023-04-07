import React from "react";
import { UnitsBox } from "../../components";
import UnitsModal from "../../components/UnitsModal/UnitsModal";

const Units = () => {
    const [open, setOpen] = React.useState(false);
    const [typeUnit, setTypeUnit] = React.useState({
        type: "",
        id: "",
    });
    return (
        <>
            <UnitsBox {...{ open, setOpen, typeUnit, setTypeUnit }} />
            <UnitsModal {...{ open, setOpen, typeUnit, setTypeUnit }} />
        </>
    );
};

export default Units;
