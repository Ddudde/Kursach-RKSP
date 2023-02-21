import React, {useEffect, useRef} from "react";
import contactCSS from './contactMain.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {changeContacts, changeContactsMap, changeContactsMapImage} from "../../store/actions";

let gr, cState, dispatch;

gr = {
    group: 0
}

export function errorLoad(e) {
    e.target.style.display = 'none';
}

export function errLoadAddIm(e, type) {
    dispatch(changeContactsMapImage(type, ""));
}

export function onDel(e, type) {
    let par;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(contactCSS.banner)){
        dispatch(changeContactsMapImage(type, ""));
    }
}

export function onEdit(e, inps, type, info) {
    let par;
    par = e.target.parentElement;
    if(par.parentElement.classList.contains(contactCSS.im) || par.parentElement.classList.contains(contactCSS.te)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.parentElement.classList.contains(contactCSS.im)){
        par = par.parentElement.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.classList.contains(contactCSS.upr)){
        inps.edAddIm = info[type].mapPr.imgUrl;
        dispatch(changeContactsMapImage(type, ""));
    }
}

export function onFin(e, type, inps) {
    let par, inp, bul;
    par = e.target.parentElement;
    bul = par.parentElement.classList.contains(contactCSS.te);
    inp = par.querySelector(bul ? "textarea" : "input");
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(contactCSS.im)) {
            if (inps.edAddIm) inps.edAddIm = undefined;
            dispatch(changeContactsMapImage(type, inp.value));
        }
        if(bul) {
            par = par.parentElement;
            if(par.classList.contains("mapt")){
                dispatch(changeContactsMap(type, inp.value));
            } else {
                dispatch(changeContacts(type, inp.value));
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

export function onClose(e, inps, forceUpdate) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(contactCSS.im) || par.parentElement.classList.contains(contactCSS.te)){
        par = par.parentElement;
        if(inps.edAddIm) {
            inps.addIm = inps.edAddIm;
            inps.edAddIm = undefined;
            forceUpdate();
        } else {
            par.setAttribute('data-st', '0');
        }
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

export function ele (x, par, inps) {
    if(!inps[par]) inps[par] = x;
}

export function setActNew(name) {
    gr.group = name;
}

export function ContactMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    dispatch = useDispatch();
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
            {(cState.auth && cState.role != 4) &&
                <div className={contactCSS.pane}>
                    <Pane gro={gr}/>
                </div>
            }
            <Outlet />
        </div>
    )
}
export default ContactMain;