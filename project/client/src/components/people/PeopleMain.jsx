import React, {useEffect, useRef} from "react";
import peopleCSS from './peopleMain.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states, themes} from "../../store/selector";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {
    CHANGE_ADMINS,
    CHANGE_ADMINS_DEL,
    CHANGE_CLASSMATES,
    CHANGE_CLASSMATES_DEL,
    CHANGE_EVENT,
    CHANGE_HTEACHERS,
    CHANGE_HTEACHERS_DEL,
    CHANGE_HTEACHERS_DEL_L2,
    CHANGE_HTEACHERS_L2,
    CHANGE_PARENTS,
    CHANGE_PARENTS_DEL,
    CHANGE_PARENTS_DEL_L0,
    CHANGE_PARENTS_DEL_L1,
    CHANGE_PARENTS_L1,
    changeEvents,
    changePeople
} from "../../store/actions";
import parentsCSS from "./parents/parents.module.css";
import profd from "../../media/profd.png";
import profl from "../../media/profl.png";
import ed from "../../media/edit.png";
import no from "../../media/no.png";
import refreshCd from "../../media/refreshCd.png";
import refreshCl from "../../media/refreshCl.png";
import copyd from "../../media/copyd.png";
import copyl from "../../media/copyl.png";
import yes from "../../media/yes.png";

let gr, cState, dispatch, themeState, types;
gr = {
    group: 0
};
types = {
    "hteachers" : {
        del : CHANGE_HTEACHERS_DEL,
        ch: CHANGE_HTEACHERS
    },
    "kids" : {
        del : CHANGE_CLASSMATES_DEL,
        ch: CHANGE_CLASSMATES
    },
    "hteachers4" : {
        del : CHANGE_HTEACHERS_DEL,
        ch: CHANGE_HTEACHERS
    },
    "hteachers4L2" : {
        del : CHANGE_HTEACHERS_DEL_L2,
        ch: CHANGE_HTEACHERS_L2
    },
    "admins" : {
        del : CHANGE_ADMINS_DEL,
        ch: CHANGE_ADMINS
    }
}

export let sit = "http://localhost:3000";

export function getPep(addTit, typ, inps, forceUpdate, x, info, x1, net) {
    let edFi, b;
    b = (x && typ != "hteachers4L2") || (x && x1);
    edFi = <div className={peopleCSS.pepl} key={x1 ? x1 : x} data-st="0">
        {b ?
            <div className={peopleCSS.fi}>
                <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} style={{marginLeft: x1 ? "2vw" : "1vw"}} id={peopleCSS.nav_i}>
                    {info.name}
                </div>
                {typ != "hteachers4" && <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>}
                <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, types[typ].del)} title="Удалить" alt=""/>
                {typ != "hteachers4" && <>
                    <input className={peopleCSS.inp + " " + peopleCSS.copyInp} data-id={x+"_"+x1} id={"inpcpt_" + x} placeholder="Ссылка не создана" value={info.link} type="text" readOnly/>
                    <img className={peopleCSS.imginp + " " + peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e) => refreshLink(e, sit, types[typ].ch)} title="Создать ссылку-приглашение" alt=""/>
                    <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={info.link ? "1" : "0"} onClick={(e) => copyLink(e, info.link, info.name)} alt=""/>
                </>}
            </div>
            :
            <div className={peopleCSS.fi}>
                <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                    {inps.inpnpt}
                </div>
                {typ != "hteachers4" && <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>}
                <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                <img className={peopleCSS.imginp+" yes "} data-id1={typ == "hteachers4L2" ? x : undefined} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, types[typ].ch, undefined, net)} title="Подтвердить" alt=""/>
                <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
            </div>
        }
        <div className={peopleCSS.ed}>
            <div className={peopleCSS.preinf}>
                ФИО:
            </div>
            <input className={peopleCSS.inp} data-id={x1 ? x+"_"+x1 : undefined} data-id1={x} id={"inpnpt_" + (x?x:"")} placeholder={"Фамилия И.О."} defaultValue={x && (x1 && typ == "hteachers4L2") ? info.name : inps.inpnpt} onChange={(e)=>chStatB(e, inps)} type="text"/>
            {ele(false, "inpnpt_" + (x?x:""), inps)}
            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, types[typ].ch)} title="Подтвердить" alt=""/>
            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
        </div>
    </div>
    return b ? (edFi) : (
        <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
            <div className={peopleCSS.nav_i+" "+peopleCSS.link} id={peopleCSS.nav_i} onClick={onEdit}>
                {addTit}
            </div>
            {edFi}
        </div>
    );
}

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
        dispatch(changePeople(type, 2, id, undefined, sit + "/invite/" + gen_cod(), "link"));
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    }
}

export function onDel(e, type, info) {
    let par, inp, id;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(peopleCSS.pepl)){
        inp = par.querySelector("input:not([readOnly])");
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
                dispatch(changePeople(type, 2, id));
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

export function onFin(e, inps, forceUpdate, type, info, net) {
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
        let grop, id, inp;
        if(type == CHANGE_PARENTS) {
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
        } else if(type == CHANGE_HTEACHERS_L2){
            par = par.parentElement;
            if(e.target.hasAttribute("data-id1")){
                id = e.target.getAttribute("data-id1");
                dispatch(changePeople(type, 2, id, "id8", inps.inpnpt));
            }
        } else {
            par = par.parentElement;
            if(net) {
                net(type, inps.inpnpt);
            } else {
                dispatch(changePeople(type, 2, "id8", undefined, inps.inpnpt));
            }
        }
        par.setAttribute('data-st', '0');
        return;
    }
    inp = par.querySelector("input");
    if (inps[inp.id]) {
        inp.setAttribute("data-mod", '1');
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
                        dispatch(changePeople(type, 2, id, undefined, inp.value));
                    }
                }
            } else {
                inps.inpnpt = inp.value;
                forceUpdate();
            }
        }
        par.setAttribute('data-st', '0');
    } else {
        inp.setAttribute("data-mod", '0');
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
    inps[el.id] = !el.validity.patternMismatch && el.value.length != 0;
    if (inps[el.id]) {
        el.setAttribute("data-mod", '0');
    } else {
        el.setAttribute("data-mod", '1');
    }
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +inps[el.id]);
}

export function ele (x, par, inps) {
    if(!inps[par]) inps[par] = x;
}

export function setActNew(name) {
    gr.group = name;
}

export function PeopleMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    themeState = useSelector(themes);
    dispatch = useDispatch();
    gr.groups = {
        0: cState.auth && (cState.role < 2 || cState.role == 3) ? {
            nam: "Педагоги",
            linke: "teachers"
        } : undefined,
        1: cState.auth ? {
            nam: "Завучи",
            linke: "hteachers"
        } : undefined,
        2: cState.auth && (cState.role == 0 || cState.role == 3) ? {
            nam: cState.role == 3 ? "Обучающиеся" : "Одноклассники",
            linke: "class"
        } : undefined,
        3: cState.auth && (cState.role == 0 || cState.role == 3) ? {
            nam: "Родители",
            linke: "parents"
        } : undefined,
        4: {
            nam: "Администраторы портала",
            linke: "admins"
        }
    };
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount PeopleMain.jsx");
        setActived(3);
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
            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                <Pane gro={gr}/>
            </div>
            <Outlet />
        </div>
    )
}
export default PeopleMain;