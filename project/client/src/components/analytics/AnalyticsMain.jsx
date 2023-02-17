import React, {useEffect, useRef} from "react";
import analyticsCSS from './analyticsMain.module.css';
import {Outlet} from "react-router-dom";
import {pane, states} from "../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {
    CHANGE_PARENTS,
    CHANGE_PARENTS_DEL,
    CHANGE_PARENTS_DEL_L0,
    CHANGE_PARENTS_DEL_L1,
    CHANGE_PARENTS_L1,
    CHANGE_PERIODS,
    CHANGE_PERIODS_DEL,
    CHANGE_PERIODS_L1,
    CHANGE_ZVONKI,
    CHANGE_ZVONKI_DEL,
    CHANGE_ZVONKI_DEL_L0,
    CHANGE_ZVONKI_L1,
    CHANGE_ZVONKI_SMENA,
    changeAnalytics,
    changePeople
} from "../../store/actions";

let gr, cState, ke, dispatch;

gr = {
    group: 0
}

export function onDel(e, type, info) {
    let par, inp, id;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(analyticsCSS.edbl)){
        inp = par.querySelector("input");
        if (inp.hasAttribute("data-id")) {
            id = inp.getAttribute("data-id").split("_");
            if(type == CHANGE_PARENTS_DEL) {
                if(Object.getOwnPropertyNames(info[id[0]].par).length < 2){
                    dispatch(changePeople(CHANGE_PARENTS_DEL_L0, id[0]));
                } else {
                    dispatch(changePeople(type, id[0], "par", id[1]));
                }
            } else if(type == CHANGE_ZVONKI_DEL) {
                dispatch(changeAnalytics(type, id[0], "lessons", id[1]));
            } else if(type == CHANGE_PERIODS_DEL) {
                dispatch(changeAnalytics(type, "prs", id[0]));
            } else {
                dispatch(changePeople(type, 0, id[0], id[1]));
            }
        } else if(inp.hasAttribute("data-id1")){
            let id = inp.getAttribute("data-id1");
            if(type == CHANGE_PARENTS_DEL) {
                dispatch(changePeople(type, "nw", "par", id));
            } else if(type == CHANGE_ZVONKI_DEL_L0) {
                dispatch(changeAnalytics(type, id));
            } else {
                dispatch(changePeople(type, 1, 0, id));
            }
        }
    } else if(par.classList.contains(analyticsCSS.nav_iZag)){
        if(e.target.hasAttribute("data-id1")){
            let id = e.target.getAttribute("data-id1");
            if(type == CHANGE_PARENTS_DEL_L0) {
                dispatch(changePeople(type, id));
            }
        }
    }
}

export function onEdit(e) {
    let par, inp, ids;
    par = e.target.parentElement;
    if(par.classList.contains(analyticsCSS.add)){
        inp = par.querySelector("input");
        ids = inp.id.split("_");
        if(ids[0] == "inpnnt" || ids[0] == "inpnit")
        {
            dispatch(changeAnalytics(CHANGE_PERIODS_L1, "edit", ids[1] == "" ? "nw" : ids[1], undefined, true));
        } else {
            par.setAttribute('data-st', '1');
        }
    }
    if(par.parentElement.classList.contains(analyticsCSS.edbl)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
}

export function onFin(e, inps, forceUpdate, type, info) {
    let par, inp;
    par = e.target.parentElement;
    if (par.classList.contains(analyticsCSS.upr)) {
        par = par.parentElement;
        dispatch(changePeople(CHANGE_PARENTS_L1, undefined, inps.nyid, undefined, {...info.nw}));
        inps.nyid = undefined;
        dispatch(changePeople(CHANGE_PARENTS_DEL_L1, "nw", "par"));
        par.setAttribute('data-st', '0');
        return;
    }
    if (par.classList.contains(analyticsCSS.fi)){
        par = par.parentElement;
        if(type == CHANGE_PARENTS)
        {
            let grop, id, inp;
            inp = par.querySelector("input");
            par = par.parentElement;
            if(inp.hasAttribute("data-id1")) {
                id = inp.getAttribute("data-id1");
                grop = info[id] && info[id].par ? Object.getOwnPropertyNames(info[id].par) : [];
                let id1 = grop.length == 0 ? "id0" : "id" + (parseInt(grop[grop.length-1].replace("id", "")) + 1);
                dispatch(changePeople(type, id, "par", id1, inps.inpnpt));
            } else {
                grop = info.nw && info.nw.par ? Object.getOwnPropertyNames(info.nw.par) : [];
                id = grop.length == 0 ? "id0" : "id" + (parseInt(grop[grop.length-1].replace("id", "")) + 1);
                dispatch(changePeople(type, "nw", "par", id, inps.inpnpt));
            }
        } else {
            par = par.parentElement;
            dispatch(changePeople(type, 1, 0, "id8", inps.inpnpt));
        }
        par.setAttribute('data-st', '0');
        return;
    }
    inp = par.querySelector("input");
    if(par.classList.contains(analyticsCSS.edbl) && type == CHANGE_PERIODS_L1){
        let inpm = ["inpnnt_", "inpnit_"];
        if(inps.inpnnt_ && inps.inpnit_)
        {
            let grop, id, obj;
            grop = Object.getOwnPropertyNames(info.prs);
            id = grop.length == 0 ? 0 : (parseInt(grop[grop.length-1]) + 1);
            obj = {
                name: inps.inpnnt_,
                per: inps.inpnit_
            }
            dispatch(changeAnalytics(CHANGE_PERIODS_L1, "prs", id, undefined, obj));
        } else {
            for(let i = 0, inpf; i < inpm.length; i++) {
                inpf = document.querySelector("." + analyticsCSS.edbl + " *[id='" + inpm[i] + "']")
                inpf.style.animation = "but 1s ease infinite";
                setTimeout(function () {
                    inpf.style.animation = "none"
                }, 1000);
                inpf.style.outline = "solid red";
            }
        }
        return;
    }
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(analyticsCSS.edbl)) {
            par = par.parentElement;
            if(type){
                if(inp.hasAttribute("data-id")){
                    let id = inp.getAttribute("data-id").split("_");
                    if(type == CHANGE_PARENTS) {
                        dispatch(changePeople(type, id[0], "par", id[1], inp.value));
                    } else if(type == CHANGE_ZVONKI) {
                        dispatch(changeAnalytics(type, id[0], "lessons", id[1], inp.value));
                    } else if(type == CHANGE_PERIODS) {
                        dispatch(changeAnalytics(type, "prs", id[0], id[1], inp.value));
                    } else {
                        dispatch(changePeople(type, 0, id[0], id[1], inp.value));
                    }
                } else if(inp.hasAttribute("data-id1")){
                    let id = inp.getAttribute("data-id1");
                    if(type == CHANGE_PARENTS) {
                        dispatch(changePeople(type, "nw", "par", id, inp.value));
                    } else if(type == CHANGE_ZVONKI_L1) {
                        dispatch(changeAnalytics(type, id, "name", undefined, inp.value));
                    } else {
                        dispatch(changePeople(type, 1, 0, id, inp.value));
                    }
                }
            } else {
                inps.inpnpt = inp.value;
                forceUpdate();
            }
        } else if(par.classList.contains(analyticsCSS.edbl)) {
            if(inp.hasAttribute("data-id1")) {
                let id = inp.getAttribute("data-id1");
                if (type == CHANGE_ZVONKI) {
                    let grop, id1;
                    grop = info[id] && info[id].lessons ? Object.getOwnPropertyNames(info[id].lessons) : [];
                    id1 = grop.length == 0 ? 0 : (parseInt(grop[grop.length-1]) + 1);
                    dispatch(changeAnalytics(type, id, "lessons", id1, inp.value));
                }
            } else if(type == CHANGE_ZVONKI_SMENA){
                let grop, id, obj;
                grop = Object.getOwnPropertyNames(info);
                id = grop.length == 0 ? 0 : (parseInt(grop[grop.length-1]) + 1);
                obj = {
                    name: inp.value
                }
                dispatch(changeAnalytics(type, id, undefined, undefined, obj));
            }
        }
        par.setAttribute('data-st', '0');
    } else {
        inp.style.animation = "but 1s ease infinite";
        setTimeout(function () {
            inp.style.animation = "none"
        }, 1000);
        inp.style.outline = "solid red";
    }
}

export function onClose(e, type) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(analyticsCSS.edbl)){
        if(par.classList.contains(analyticsCSS.fi) || type) {
            par = par.parentElement.parentElement;
        } else {
            par = par.parentElement;
        }
        par.setAttribute('data-st', '0');
    } else if(par.classList.contains(analyticsCSS.edbl)) {
        let inp, ids;
        inp = par.querySelector("input");
        ids = inp.id.split("_");
        par = par.parentElement;
        if(ids[0] == "inpnnt" || ids[0] == "inpnit")
        {
            dispatch(changeAnalytics(CHANGE_PERIODS_L1, "edit", ids[1] == "" ? "nw" : ids[1], undefined, false));
        } else {
            par.setAttribute('data-st', '0');
        }
    }
}

export function chStatB(e, inps) {
    let el = e.target;
    if(el.pattern) {
        inps[el.id] = !el.validity.patternMismatch ? el.value : false;
    } else {
        inps[el.id] = el.value;
    }
    if (inps[el.id]) {
        el.style.outline = "none black";
    } else {
        el.style.animation = "but 1s ease infinite";
        setTimeout(function () {
            el.style.animation = "none"
        }, 1000);
        el.style.outline = "solid red";
    }
    let ye = el.parentElement.querySelector(".yes");
    if(ye) ye.setAttribute("data-enable", +inps[el.id]);
}

export function ele (x, par, b, inps, pari) {
    if(b){
        if(!inps[par]) inps[par] = x;
    } else {
        pari[par] = x;
    }
}

export function setActNew(name) {
    gr.group = name;
}

export function AnalyticsMain(props) {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    dispatch = useDispatch();
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