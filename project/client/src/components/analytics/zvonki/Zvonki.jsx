import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import zvonkiCSS from './zvonki.module.css';
import {states, zvonki} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../AnalyticsMain";
import ErrFound from "../../other/error/ErrFound";
import yes from "../../../media/yes.png";
import {
    CHANGE_PARENTS,
    CHANGE_PARENTS_DEL_L1,
    CHANGE_PARENTS_L1,
    CHANGE_ZVONKI,
    changePeople,
    changeZvonki
} from "../../../store/actions";
import no from "../../../media/no.png";

let dispatch, zvonkiInfo, errText, inps, pari, cState;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
inps = {inpnpt : "8.00-8.45"};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];

function onEdit(e) {
    let par;
    par = e.target.parentElement;
    if(par.classList.contains(zvonkiCSS.add)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(zvonkiCSS.pepl)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
}

function onFin(e, inps, forceUpdate, type, info) {
    let par, inp;
    par = e.target.parentElement;
    if (par.classList.contains(zvonkiCSS.upr)) {
        par = par.parentElement;
        dispatch(changePeople(CHANGE_PARENTS_L1, undefined, inps.nyid, undefined, {...info.nw}));
        inps.nyid = undefined;
        dispatch(changePeople(CHANGE_PARENTS_DEL_L1, "nw", "par"));
        par.setAttribute('data-st', '0');
        return;
    }
    if (par.classList.contains(zvonkiCSS.fi)){
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
        if(par.parentElement.classList.contains(zvonkiCSS.pepl)) {
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
        } else if(par.classList.contains(zvonkiCSS.pepl)) {
            if(inp.hasAttribute("data-id1")) {
                let id = inp.getAttribute("data-id1");
                if (type == CHANGE_ZVONKI) {
                    let grop = info[id] && info[id].lessons ? Object.getOwnPropertyNames(info[id].lessons) : [];
                    let id1 = grop.length == 0 ? 0 : (parseInt(grop[grop.length-1]) + 1);
                    dispatch(changeZvonki(type, id, "lessons", id1, inp.value));
                }
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

function onClose(e, type) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(zvonkiCSS.pepl)){
        if(par.classList.contains(zvonkiCSS.fi) || type) {
            par = par.parentElement.parentElement;
        } else {
            par = par.parentElement;
        }
        par.setAttribute('data-st', '0');
    } else if(par.classList.contains(zvonkiCSS.pepl)) {
        par = par.parentElement;
        par.setAttribute('data-st', '0');
    }
}

function chStatB(e, inps) {
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

function ele (x, par, b, inps, pari) {
    if(b){
        if(!inps[par]) inps[par] = x;
    } else {
        pari[par] = x;
    }
}

function getZvonki(b) {
    return b ?
            <>
                {Object.getOwnPropertyNames(zvonkiInfo).map(param =>
                    <div className={zvonkiCSS.smenaGrid} key={param}>
                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                            №
                        </div>
                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                            {zvonkiInfo[param].name}
                        </div>
                        {Object.getOwnPropertyNames(zvonkiInfo[param].lessons).map((param1, i) =>
                            <>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    {i + 1}
                                </div>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    {zvonkiInfo[param].lessons[param1]}
                                </div>
                            </>
                        )}
                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                            X
                        </div>
                        <div className={zvonkiCSS.add} data-st="0">
                            <div className={zvonkiCSS.nav_i+" "+zvonkiCSS.link} id={zvonkiCSS.nav_i} onClick={onEdit}>
                                Добавить урок
                            </div>
                            <div className={zvonkiCSS.pepl+" "+zvonkiCSS.nav_iZag3} data-st="0">
                                <div className={zvonkiCSS.preinf}>
                                    Интервал:
                                </div>
                                <input className={zvonkiCSS.inp} data-id1={param} id={"inpnpt_"} placeholder={"Фамилия И.О."} defaultValue={inps.inpnpt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                {ele(false, "inpnpt_", true, inps, pari)}
                                <img className={zvonkiCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_ZVONKI, zvonkiInfo)} title="Подтвердить" alt=""/>
                                <img className={zvonkiCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                            </div>
                        </div>
                    </div>
                )}
            </>
        :
            <>
                {Object.getOwnPropertyNames(zvonkiInfo).map(param =>
                    <div className={zvonkiCSS.smenaGrid} key={param}>
                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                            №
                        </div>
                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                            {zvonkiInfo[param].name}
                        </div>
                        {Object.getOwnPropertyNames(zvonkiInfo[param].lessons).map((param1, i) =>
                            <>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    {i + 1}
                                </div>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    {zvonkiInfo[param].lessons[param1]}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </>
}

export function Zvonki() {
    zvonkiInfo = useSelector(zvonki);
    cState = useSelector(states);
    if(!dispatch) setActNew(0);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Zvonki.jsx");
        for(let el of document.querySelectorAll("." + zvonkiCSS.pepl + " *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Zvonki.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Zvonki.jsx');
    });
    return (
        <div className={zvonkiCSS.AppHeader}>
            <Helmet>
                <title>Расписание звонков</title>
            </Helmet>
            {Object.getOwnPropertyNames(zvonkiInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <div className={zvonkiCSS.block}>
                        <div className={zvonkiCSS.l1}>
                            {getZvonki(cState.role == 3)}
                        </div>
                    </div>
            }
        </div>
    )
}
export default Zvonki;