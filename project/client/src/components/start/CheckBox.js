import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCheckBoxState} from "../../store/selector";
import {changeCB} from "../../store/actions";


const CustomCheckbox = (props) => {
    const checkBoxState = useSelector(getCheckBoxState(props.checkbox_id, props.checkbox_state));
    const dispatch = useDispatch();
    return (
        <>
            <input
                type="checkbox"
                {...props}
                checked={checkBoxState ? "checked" : ""}
                onChange={() => {dispatch(changeCB(props.checkbox_id, checkBoxState))}}
            />
            {props.text}
        </>
    );
};
export default CustomCheckbox;