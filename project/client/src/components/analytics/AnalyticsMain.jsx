import React, {useEffect, useRef} from "react";
import analyticsCSS from './analyticsMain.module.css';
import {Outlet} from "react-router-dom";
import {pane, states} from "../../store/selector";
import {useSelector} from "react-redux";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";

let gr, cState, ke;

gr = {
    group: 0
}

export function setActNew(name) {
    gr.group = name;
}

export function AnalyticsMain(props) {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    gr.groups = {
        0: {
            nam: "Расписание звонков",
            linke: props.comp ? "admYO/zvonki" : "zvonki"
        },
        1: {
            nam: (cState.auth && cState.role < 2) ? "Расписание периодов" : "Периоды обучения",
            linke: props.comp ? "admYO/periods" : "periods"
        },
        2: {
            nam: (cState.auth && cState.role < 2) ? "Расписание" : "Дисциплины",
            linke: props.comp ? "admYO/schedule" : "schedule"
        },
        ...((cState.auth && cState.role < 2) && {3: {
                nam: "Журнал",
                linke: props.comp ? "admYO/journal" : "journal"
            }}),
        ...((cState.auth && cState.role < 2) && {4: {
                nam: "Итоговые оценки",
                linke: props.comp ? "admYO/marks" : "marks"
            }})
    };
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount AnalyticsMain.jsx");
        setActived(".panAna");
        return function() {
            console.log("I was triggered during componentWillUnmount AnalyticsMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate AnalyticsMain.jsx');
    });
    return (
        <div className={analyticsCSS.AppHeader}>
            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}} ref={()=>(ke = !ke ? paneInfo.els.length : ke)}>
                <Pane gro={gr}/>
            </div>
            <Outlet />
            {props.comp && props.comp}
        </div>
    )
}
export default AnalyticsMain;