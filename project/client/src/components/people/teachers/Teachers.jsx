import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import teachersCSS from "./teachers.module.css";
import {states, teachers, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import copyl from "../../../media/copyl.png";
import copyd from "../../../media/copyd.png";
import refreshCd from "../../../media/refreshCd.png";
import refreshCl from "../../../media/refreshCl.png";
import {CHANGE_EVENT, changeEvents, changeTeachers, changeTeachersDel, changeTeachersGL} from "../../../store/actions";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";

let dispatch, teachersInfo, cState, my, nmy, nmy3, themeState, inps, pari, sit;
sit = "http://localhost:3000";
my = {
    "Англ. яз." : {
        "id1" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        },
        "id2" : {
            name: "Петров А.Б.",
            link: sit + "/invite/x"
        }
    },
    "Русский яз.": {
        "id1" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        }
    },
    "Математика": {
        "id1" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        }
    },
    "Окруж. мир": {
        "id1" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        }
    }
};
nmy = {
    "Русский яз.": {
        "id3" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        }
    },
    "Математика": {
        "id4" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        }
    },
    "Алгебра": {
        "id5" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        },
        "id6" : {
            name: "Петров А.С.",
            link: sit + "/invite/x"
        },
        "id7" : {
            name: "Петров А.Г.",
            link: sit + "/invite/x"
        }
    }
};
nmy3 = {
    0: {
        "id5" : {
            name: "Петров А.А.",
            link: sit + "/invite/x"
        },
        "id6" : {
            name: "Петров А.С.",
            link: sit + "/invite/x"
        },
        "id7" : {
            name: "Петров А.Г.",
            link: sit + "/invite/x"
        }
    }
};
inps = {inpnpt : "Фамилия И.О."};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];

function copyLink(e) {
    let inp, id, link, title, text;
    title = "Внимание!";
    inp = e.target.parentElement.querySelector("input");
    if (inp.hasAttribute("data-id")) {
        id = inp.getAttribute("data-id").split("_");
        link = teachersInfo[0][id[0]][id[1]].link;
        text = "Ссылка-приглашение для " + teachersInfo[0][id[0]][id[1]].name + " успешно скопирована в буфер обмена.";
        navigator.clipboard.writeText(link);
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    }
}

function gen_cod(){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}

function refreshLink(e) {
    let inp, id, title, text;
    title = "Внимание!";
    text = "Ссылка успешно обновлена"
    inp = e.target.parentElement.querySelector("input");
    if (inp.hasAttribute("data-id")) {
        id = inp.getAttribute("data-id").split("_");
        dispatch(changeTeachers(0, id[0], id[1], sit + "/invite/" + gen_cod(), "link"));
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    }
}

function onDel(e) {
    let par, inp, id;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(teachersCSS.pe)){
        inp = par.querySelector("input");
        if (inp.hasAttribute("data-id")) {
            id = inp.getAttribute("data-id").split("_");
            dispatch(changeTeachersDel(0, id[0], id[1]));
        } else if(inp.hasAttribute("data-id1")){
            let id = inp.getAttribute("data-id1");
            dispatch(changeTeachersDel(1, 0, id));
        }
    }
}

function onEdit(e) {
    let par;
    par = e.target.parentElement;
    if(par.classList.contains(teachersCSS.addTea)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(teachersCSS.pe)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
}

function onFin(e) {
    let par, inp;
    par = e.target.parentElement;
    if (par.classList.contains(teachersCSS.fi)){
        par = par.parentElement.parentElement;
        dispatch(changeTeachers(1, 0, "id8", inps.inpnpt));
        par.setAttribute('data-st', '0');
        return;
    }
    inp = par.querySelector("input");
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(teachersCSS.pe)) {
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                let id = inp.getAttribute("data-id").split("_");
                dispatch(changeTeachers(0, id[0], id[1], inp.value));
            } else if(inp.hasAttribute("data-id1")){
                let id = inp.getAttribute("data-id1");
                dispatch(changeTeachers(1, 0, id, inp.value));
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

function onClose(e) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(teachersCSS.pe)){
        if(par.classList.contains(teachersCSS.fi))
            par = par.parentElement.parentElement;
        else {
            par = par.parentElement;
        }
        par.setAttribute('data-st', '0');
    }
}

function chStatB(e) {
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

function ele (x, par, b) {
    if(b){
        if(!inps[par]) inps[par] = x;
    } else {
        pari[par] = x;
    }
}

function getTeachers(title, x, b, b1) {
    return <div className={teachersCSS.nav_iZag}>
        <div className={teachersCSS.nav_i} id={teachersCSS.nav_i}>
            {title}
        </div>
        {b1 ?
                <>
                    <div className={teachersCSS.addTea+" "+teachersCSS.nav_iZag} data-st="0">
                        <div className={teachersCSS.nav_i+" "+teachersCSS.link} id={teachersCSS.nav_i} onClick={onEdit}>
                            Добавить педагога
                        </div>
                        <div className={teachersCSS.pe} data-st="0">
                            <div className={teachersCSS.fi}>
                                <div className={teachersCSS.nav_i + " " + teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                    {inps.inpnpt}
                                </div>
                                <img className={teachersCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                <img className={teachersCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                <img className={teachersCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                <img className={teachersCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                            </div>
                            <div className={teachersCSS.ed}>
                                <div className={teachersCSS.preinf}>
                                    ФИО:
                                </div>
                                <input className={teachersCSS.inp} id={"inpnpt_"} placeholder={"Фамилия И.О."} defaultValue={inps.inpnpt} onChange={chStatB} type="text"/>
                                {ele(false, "inpnpt_", true)}
                                <img className={teachersCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                <img className={teachersCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                            </div>
                        </div>
                    </div>
                    {x[0] && Object.getOwnPropertyNames(x[0]).map(param =>
                        <div className={teachersCSS.nav_iZag + " " + teachersCSS.nav_iZag1} key={param}>
                            <div className={teachersCSS.pe} data-st="0">
                                <div className={teachersCSS.fi}>
                                    <div className={teachersCSS.nav_i + " " + teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                        {x[0][param].name}
                                    </div>
                                    <img className={teachersCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                    <img className={teachersCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    <img className={teachersCSS.imginp} data-id1={param} style={{marginRight: "1vw"}} src={no} onClick={onDel} title="Удалить" alt=""/>
                                </div>
                                <div className={teachersCSS.ed}>
                                    <div className={teachersCSS.preinf}>
                                        ФИО:
                                    </div>
                                    <input className={teachersCSS.inp} data-id1={param} id={"inpnpt_" + param} placeholder={"Фамилия И.О."} defaultValue={x[0][param].name} onChange={chStatB} type="text"/>
                                    {ele(false, "inpnpt_" + param, true)}
                                    <img className={teachersCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                    <img className={teachersCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            :
                <>
                    {Object.getOwnPropertyNames(x).map(param =>
                        <div className={teachersCSS.nav_iZag + " " + teachersCSS.nav_iZag1} key={param}>
                            <div className={teachersCSS.nav_i} id={teachersCSS.nav_i}>
                                {param}
                            </div>
                            {Object.getOwnPropertyNames(x[param]).map(param1 =>
                                b?
                                    <div className={teachersCSS.pe} key={param1} data-st="0">
                                        <div className={teachersCSS.fi}>
                                            <div className={teachersCSS.nav_i + " " + teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                                {x[param][param1].name}
                                            </div>
                                            <img className={teachersCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                            <img className={teachersCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                            <img className={teachersCSS.imginp} data-id={param + "_" + param1} style={{marginRight: "1vw"}} src={no} onClick={onDel} title="Удалить" alt=""/>
                                            <input className={teachersCSS.inp+" "+teachersCSS.copyInp} data-id={param + "_" + param1} id={"inpcpt_" + param + "_" + param1} value={x[param][param1].link} type="text" readOnly/>
                                            <img className={teachersCSS.imginp+" "+teachersCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={refreshLink} title="Создать ссылку-приглашение" alt=""/>
                                            <img className={teachersCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" onClick={copyLink} alt=""/>
                                        </div>
                                        <div className={teachersCSS.ed}>
                                            <div className={teachersCSS.preinf}>
                                                ФИО:
                                            </div>
                                            <input className={teachersCSS.inp} data-id={param + "_" + param1} id={"inpnpt_" + param + "_" + param1} placeholder={"Фамилия И.О."} defaultValue={x[param][param1].name} onChange={chStatB} type="text"/>
                                            {ele(false, "inpnpt_" + param + "_" + param1, true)}
                                            <img className={teachersCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                            <img className={teachersCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                    </div>
                                :
                                    <div key={param1}>
                                        <div className={teachersCSS.nav_i + " " + teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                            {x[param][param1]}
                                        </div>
                                        <img className={teachersCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                    </div>
                            )}
                        </div>
                    )}
                </>
        }
    </div>;
}

export function Teachers() {
    teachersInfo = useSelector(teachers);
    themeState = useSelector(themes);
    cState = useSelector(states);
    if(!dispatch) setActNew(0);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Teachers.jsx");
        dispatch(changeTeachersGL(0, my));
        dispatch(changeTeachersGL(1, (cState.auth && cState.role == 3) ? nmy3 : nmy));
        for(let el of document.querySelectorAll("." + teachersCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el});
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Teachers.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Teachers.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <div className={teachersCSS.AppHeader}>
                {(cState.auth && cState.role == 3) ?
                        <div className={teachersCSS.blockTea}>
                            <div className={teachersCSS.tea}>
                                {getTeachers("Нераспределённые педагоги", teachersInfo[1], true, true)}
                                {getTeachers("Педагоги", teachersInfo[0], true)}
                            </div>
                        </div>
                    :
                        <>
                            {(Object.getOwnPropertyNames(teachersInfo[0]).length == 0 && Object.getOwnPropertyNames(teachersInfo[1]).length == 0) ?
                                    <div className={teachersCSS.block}>
                                        <img alt="banner" src={warn}/>
                                        <div className={teachersCSS.block_text}>
                                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                                        </div>
                                    </div>
                                :
                                    <div className={teachersCSS.blockTea}>
                                        <div className={teachersCSS.tea}>
                                            {getTeachers("Мои педагоги", teachersInfo[0])}
                                            {getTeachers("Другие педагоги", teachersInfo[1])}
                                        </div>
                                    </div>
                            }
                        </>
                }
            </div>
        </>)
}
export default Teachers;