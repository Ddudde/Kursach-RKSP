import React from "react";
import {useDispatch, useSelector} from "react-redux";
import checkBoxCSS from './checkBox.module.css';
import {checkbox} from "../../store/selector";
import {changeCB} from "../../store/actions";


const CustomCheckbox = (props) => {
    const checkBoxState = useSelector(checkbox);
    const dispatch = useDispatch();
    return (
        <div className={checkBoxCSS.block}>
            <input className={checkBoxCSS.inp}
                type="checkbox"
                {...props}
                checked={checkBoxState[props.checkbox_id] ? "checked" : ""}
                onChange={() => {dispatch(changeCB(props.checkbox_id, checkBoxState[props.checkbox_id]))}}
            />
            <div className={checkBoxCSS.tex}>
                {props.text}
            </div>
        </div>
    );
};
export default CustomCheckbox;