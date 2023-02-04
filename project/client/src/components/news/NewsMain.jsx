import React, {useEffect, useRef} from "react";
import newsCSS from './newsMain.module.css';
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

export function NewsMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    gr.groups = {
        0: {
            nam: "Объявления портала",
            linke: "por"
        },
        1: {
            nam: "Объявления учебного центра",
            linke: "yo"
        }
    };
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount NewsMain.jsx");
        setActived(".panNew");
        return function() {
            console.log("I was triggered during componentWillUnmount NewsMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsMain.jsx');
    });
    return (
        <div className={newsCSS.AppHeader}>
            {(cState.auth && cState.role != 4) && <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}} ref={()=>(ke = !ke ? paneInfo.els.length : ke)}>
                <Pane gro={gr}/>
            </div>}
            <Outlet />
        </div>
    )
}
export default NewsMain;