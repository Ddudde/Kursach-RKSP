import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkbox} from "../../store/selector";
import {changeCB} from "../../store/actions";


const CustomCheckbox = (props) => {
    const checkBoxState = useSelector(checkbox);
    const dispatch = useDispatch();
    return (
        <>
            <input
                type="checkbox"
                {...props}
                checked={checkBoxState[props.checkbox_id] ? "checked" : ""}
                onChange={() => {dispatch(changeCB(props.checkbox_id, checkBoxState[props.checkbox_id]))}}
            />
            {props.text}
        </>
    );
};
export default CustomCheckbox;