import React, {useEffect, useRef} from "react";
import peopleCSS from './peopleMain.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {
    CHANGE_EVENT,
    CHANGE_PARENTS,
    CHANGE_PARENTS_DEL,
    CHANGE_PARENTS_DEL_L0,
    CHANGE_PARENTS_DEL_L1,
    CHANGE_PARENTS_L1,
    changeEvents,
    changePeople
} from "../../store/actions";
import parentsCSS from "./parents/parents.module.css";

let gr, cState, ke, dispatch;
gr = {
    group: 0
};

export function copyLink(e, link, name) {
    let title, text;
    title = "Внимание!";
    text = "Ссылка-приглашение для " + name + " успешно скопирована в буфер обмена.";
    navigator.clipboard.writeText(link);
    dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
}

function gen_cod(){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}

export function refreshLink(e, sit, type) {
    let inp, id, title, text;
    title = "Внимание!";
    text = "Ссылка успешно обновлена"
    inp = e.target.parentElement.querySelector("input");
    if (inp.hasAttribute("data-id")) {
        id = inp.getAttribute("data-id").split("_");
        if(type == CHANGE_PARENTS){
            dispatch(changePeople(type, id[0], "par", id[1], sit + "/invite/" + gen_cod(), "link"));
        } else {
            dispatch(changePeople(type, 0, id[0], id[1], sit + "/invite/" + gen_cod(), "link"));
        }
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    } else if (inp.hasAttribute("data-id1")) {
        id = inp.getAttribute("data-id1");
        dispatch(changePeople(type, 1, 0, id, sit + "/invite/" + gen_cod(), "link"));
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    }
}

export function onDel(e, type, info) {
    let par, inp, id;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(peopleCSS.pepl)){
        inp = par.querySelector("input");
        if (inp.hasAttribute("data-id")) {
            id = inp.getAttribute("data-id").split("_");
            if(type == CHANGE_PARENTS_DEL) {
                if(Object.getOwnPropertyNames(info[id[0]].par).length < 2){
                    dispatch(changePeople(CHANGE_PARENTS_DEL_L0, id[0]));
                } else {
                    dispatch(changePeople(type, id[0], "par", id[1]));
                }
            } else {
                dispatch(changePeople(type, 0, id[0], id[1]));
            }
        } else if(inp.hasAttribute("data-id1")){
            let id = inp.getAttribute("data-id1");
            if(type == CHANGE_PARENTS_DEL) {
                dispatch(changePeople(type, "nw", "par", id));
            } else {
                dispatch(changePeople(type, 1, 0, id));
            }
        }
    } else if(par.classList.contains(peopleCSS.nav_iZag)){
        if(e.target.hasAttribute("data-id1")){
            let id = e.target.getAttribute("data-id1");
            if(type == CHANGE_PARENTS_DEL_L0) {
                dispatch(changePeople(type, id));
            }
        }
    }
}

export function onEdit(e) {
    let par;
    par = e.target.parentElement;
    if(par.classList.contains(peopleCSS.add)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(peopleCSS.pepl)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
}

export function onFin(e, inps, forceUpdate, type, info) {
    let par, inp;
    par = e.target.parentElement;
    if (par.classList.contains(parentsCSS.upr)) {
        par = par.parentElement;
        dispatch(changePeople(CHANGE_PARENTS_L1, undefined, inps.nyid, undefined, {...info.nw}));
        inps.nyid = undefined;
        dispatch(changePeople(CHANGE_PARENTS_DEL_L1, "nw", "par"));
        par.setAttribute('data-st', '0');
        return;
    }
    if (par.classList.contains(peopleCSS.fi)){
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
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(peopleCSS.pepl)) {
            par = par.parentElement;
            if(type){
                if(inp.hasAttribute("data-id")){
                    let id = inp.getAttribute("data-id").split("_");
                    if(type == CHANGE_PARENTS) {
                        dispatch(changePeople(type, id[0], "par", id[1], inp.value));
                    } else {
                        dispatch(changePeople(type, 0, id[0], id[1], inp.value));
                    }
                } else if(inp.hasAttribute("data-id1")){
                    let id = inp.getAttribute("data-id1");
                    if(type == CHANGE_PARENTS) {
                        dispatch(changePeople(type, "nw", "par", id, inp.value));
                    } else {
                        dispatch(changePeople(type, 1, 0, id, inp.value));
                    }
                }
            } else {
                inps.inpnpt = inp.value;
                forceUpdate();
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
    if(par.parentElement.classList.contains(peopleCSS.pepl)){
        if(par.classList.contains(peopleCSS.fi) || type) {
            par = par.parentElement.parentElement;
        } else {
            par = par.parentElement;
        }
        par.setAttribute('data-st', '0');
    }
}

export function chStatB(e, inps) {
    let el = e.target;
    if(el.pattern) {
        inps[el.id] = !el.validity.patternMismatch && el.value.length != 0;
    } else {
        inps[el.id] = el.value.length != 0;
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
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +inps[el.id]);
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

export function PeopleMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    dispatch = useDispatch();
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
        setActived(".panPep");
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