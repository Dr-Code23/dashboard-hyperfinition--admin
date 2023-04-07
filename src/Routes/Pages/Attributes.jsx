import React from "react";
import { AttreibutesBox, AttributesModal } from "../../components";

const Attributes = () => {
    const [open, setOpen] = React.useState(false);
    const [typeAttributes, setTypeAttributes] = React.useState({
        type: "",
        id: "",
    });
    return (
        <>
            <AttreibutesBox
                {...{ open, setOpen, typeAttributes, setTypeAttributes }}
            />
            <AttributesModal
                {...{ open, setOpen, typeAttributes, setTypeAttributes }}
            />
        </>
    );
};

export default Attributes;
