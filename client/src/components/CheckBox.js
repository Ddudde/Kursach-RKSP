import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {getCheckBoxState} from "../store/selector";
import {change} from "../store/actions";


const CustomCheckbox = (props) => {
    const checkBoxState = useSelector(getCheckBoxState(props.checkbox_id, props.checkbox_state));
    const dispatch = useDispatch();
    return (
        <>
            <input
                type="checkbox"
                {...props}
                checked={checkBoxState ? "checked" : ""}
                onChange={() => {dispatch(change(props.checkbox_id, checkBoxState))}}
            />
            {props.text}
        </>
    );
};
export default CustomCheckbox;