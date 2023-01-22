import React, {useEffect, useRef} from "react";
import peopleCSS from './peopleMain.module.css';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../pane/Pane";

let gr, cState, ke;

gr = {
    group: 0
}

export function setActNew(name) {
    gr.group = name;
}

export function PeopleMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    gr.groups = {
        ...((cState.auth && (cState.role < 2 || cState.role == 3)) && {0: {
            nam: "Педагоги",
            linke: "teachers"
        }}),
        ...((cState.auth && cState.role != 4) && {1: {
            nam: "Завучи",
            linke: "hteachers"
        }}),
        ...((cState.auth && (cState.role == 0 || cState.role == 3)) && {2: {
            nam: cState.role == 3 ? "Обучающиеся" : "Одноклассники",
            linke: "class"
        }}),
        ...((cState.auth && (cState.role == 0 || cState.role == 3)) && {3: {
            nam: "Родители",
            linke: "parents"
        }}),
        4: {
            nam: "Администраторы портала",
            linke: "admins"
        }
    };
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount PeopleMain.jsx");
        return function() {
            console.log("I was triggered during componentWillUnmount PeopleMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate PeopleMain.jsx');
    });
    return (
        <div className={peopleCSS.AppHeader}>
            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}} ref={()=>(ke = !ke ? paneInfo.els.length : ke)}>
                <Pane gro={gr}/>
            </div>
            <Outlet />
        </div>
    )
}
export default PeopleMain;