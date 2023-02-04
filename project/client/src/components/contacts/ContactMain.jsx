import React, {useEffect, useRef} from "react";
import contactCSS from './contactMain.module.css';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../pane/Pane";
import {setActived} from "../main/Main";

let gr, cState, ke;

gr = {
    group: 0
}

export function setActNew(name) {
    gr.group = name;
}

export function ContactMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    gr.groups = {
        0: {
            nam: "Контакты портала",
            linke: "por"
        },
        1: {
            nam: "Контакты учебного центра",
            linke: "yo"
        }
    };
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount ContactMain.jsx");
        setActived(".panCon");
        return function() {
            console.log("I was triggered during componentWillUnmount ContactMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ContactMain.jsx');
    });
    return (
        <div className={contactCSS.AppHeader}>
            {(cState.auth && cState.role != 4) && <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}} ref={()=>(ke = !ke ? paneInfo.els.length : ke)}>
                <Pane gro={gr}/>
            </div>}
            <Outlet />
        </div>
    )
}
export default ContactMain;