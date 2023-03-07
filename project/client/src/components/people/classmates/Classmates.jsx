import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import {classmates, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {ele, gen_cod, setActNew, sit} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import peopleCSS from "../peopleMain.module.css";
import {
    CHANGE_CLASSMATES,
    CHANGE_CLASSMATES_DEL,
    CHANGE_EVENT,
    changeEvents,
    changePeople
} from "../../../store/actions";
import ed from "../../../media/edit.png";
import no from "../../../media/no.png";
import refreshCd from "../../../media/refreshCd.png";
import refreshCl from "../../../media/refreshCl.png";
import copyd from "../../../media/copyd.png";
import copyl from "../../../media/copyl.png";
import yes from "../../../media/yes.png";

let dispatch, classmatesInfo, errText, inps, themeState, cState, types;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
inps = {inpnpt : "Фамилия И.О."};
types = {
    del : CHANGE_CLASSMATES_DEL,
    ch: CHANGE_CLASSMATES
};
let [_, forceUpdate] = [];

function copyLink(e, link, name) {
    let title, text;
    title = "Внимание!";
    text = "Ссылка-приглашение для " + name + " успешно скопирована в буфер обмена.";
    navigator.clipboard.writeText(link);
    dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
}

function refreshLink(e, type) {
    let inp, id, title, text;
    title = "Внимание!";
    text = "Ссылка успешно обновлена"
    inp = e.target.parentElement.querySelector("input");
    if (inp.hasAttribute("data-id")) {
        id = inp.getAttribute("data-id").split("_");
        dispatch(changePeople(type, 0, id[0], id[1], sit + "/invite/" + gen_cod(), "link"));
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    } else if (inp.hasAttribute("data-id1")) {
        id = inp.getAttribute("data-id1");
        dispatch(changePeople(type, 2, id, undefined, sit + "/invite/" + gen_cod(), "link"));
        dispatch(changeEvents(CHANGE_EVENT, undefined, undefined, title, text, 10));
    }
}

function onDel(e, type) {
    let par, inp, id;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(peopleCSS.pepl)){
        inp = par.querySelector("input:not([readOnly])");
        if (inp.hasAttribute("data-id")) {
            id = inp.getAttribute("data-id").split("_");
            dispatch(changePeople(type, 0, id[0], id[1]));
        } else if(inp.hasAttribute("data-id1")){
            let id = inp.getAttribute("data-id1");
            dispatch(changePeople(type, 2, id));
        }
    }
}

function onEdit(e) {
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

function onFin(e, type) {
    let par, inp;
    par = e.target.parentElement;
    if (par.classList.contains(peopleCSS.fi)){
        par = par.parentElement;
        par = par.parentElement;
        // if(net) {
        //     net(type, inps.inpnpt);
        // } else {
        dispatch(changePeople(type, 2, "id8", undefined, inps.inpnpt));
        // }
        par.setAttribute('data-st', '0');
        return;
    }
    inp = par.querySelector("input");
    if (inps[inp.id]) {
        inp.setAttribute("data-mod", '1');
        if(par.parentElement.classList.contains(peopleCSS.pepl)) {
            par = par.parentElement;
            if(type){
                if(inp.hasAttribute("data-id1")){
                    let id = inp.getAttribute("data-id1");
                    dispatch(changePeople(type, 2, id, undefined, inp.value));
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

function onClose(e) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(peopleCSS.pepl)){
        if(par.classList.contains(peopleCSS.fi)) {
            par = par.parentElement.parentElement;
        } else {
            par = par.parentElement;
        }
        par.setAttribute('data-st', '0');
    }
}

function chStatB(e) {
    let el = e.target;
    inps[el.id] = !el.validity.patternMismatch && el.value.length != 0;
    if (inps[el.id]) {
        el.setAttribute("data-mod", '0');
    } else {
        el.setAttribute("data-mod", '1');
    }
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +inps[el.id]);
}

function getBlock(x, b) {
    let edFi = <div className={peopleCSS.pepl} key={x} data-st="0">
        {x ?
            <div className={peopleCSS.fi}>
                <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                    {classmatesInfo[x].name}
                </div>
                <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                <img className={peopleCSS.imginp} data-id={x} style={{marginRight: "1vw"}} src={no} onClick={e=>onDel(e, types.del)} title="Удалить" alt=""/>
                <input className={peopleCSS.inp+" "+peopleCSS.copyInp} data-id1={x} id={"inpcpt_" + x} placeholder="Ссылка не создана" value={classmatesInfo[x].link} type="text" readOnly/>
                <img className={peopleCSS.imginp+" "+peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e)=>refreshLink(e, types.ch)} title="Создать ссылку-приглашение" alt=""/>
                <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={classmatesInfo[x].link ? "1" : "0"} onClick={(e)=>copyLink(e, classmatesInfo[x].link, classmatesInfo[x].name)} alt=""/>
            </div>
            :
            <div className={peopleCSS.fi}>
                <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                    {inps.inpnpt}
                </div>
                <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                <img className={peopleCSS.imginp+" yes "} src={yes} onClick={e=>onFin(e, types.ch)} title="Подтвердить" alt=""/>
                <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
            </div>
        }
        <div className={peopleCSS.ed}>
            <div className={peopleCSS.preinf}>
                ФИО:
            </div>
            <input className={peopleCSS.inp} data-id1={x} id={"inpnpt_" + (x?x:"")} placeholder={"Фамилия И.О."} defaultValue={x ? classmatesInfo[x].name : inps.inpnpt} onChange={chStatB} type="text"/>
            {ele(false, "inpnpt_" + (x?x:""), inps)}
            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={e=>onFin(e, x ? types.ch : undefined)} title="Подтвердить" alt=""/>
            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
        </div>
    </div>;
    return b ? edFi :
        <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
            <div className={peopleCSS.nav_i+" "+peopleCSS.link} id={peopleCSS.nav_i} onClick={onEdit}>
                Добавить ученика
            </div>
            {edFi}
        </div>
}

export function Classmates() {
    classmatesInfo = useSelector(classmates);
    cState = useSelector(states);
    themeState = useSelector(themes);
    if(!dispatch) setActNew(2);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Classmates.jsx");
        for(let el of document.querySelectorAll("." + peopleCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Classmates.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Classmates.jsx');
    });
    return (
        <div className={peopleCSS.header}>
            <Helmet>
                <title>{cState.role == 3 ? "Обучающиеся" : "Одноклассники"}</title>
            </Helmet>
            {Object.getOwnPropertyNames(classmatesInfo).length == 0 && !(cState.auth && cState.role == 3) ?
                    <ErrFound text={errText}/>
                :
                    <>
                        {(cState.auth && cState.role == 3) &&
                            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                                <Pane cla={true}/>
                            </div>
                        }
                        <div className={peopleCSS.blockPep}>
                            <div className={peopleCSS.pep}>
                                <div className={peopleCSS.nav_iZag}>
                                    <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                        {cState.role == 3 ? "Обучающиеся" : "Одноклассники"}
                                    </div>
                                    {/*{(cState.auth && cState.role == 3) && getPep("Добавить ученика", typ, inps, forceUpdate)}*/}
                                    {/*{Object.getOwnPropertyNames(classmatesInfo).map(param =>*/}
                                    {/*    (cState.auth && cState.role == 3) ?*/}
                                    {/*        getPep("Добавить ученика", typ, inps, forceUpdate, param, classmatesInfo[param])*/}
                                    {/*        : <div key={param}>*/}
                                    {/*            <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>*/}
                                    {/*                {classmatesInfo[param].name}*/}
                                    {/*            </div>*/}
                                    {/*            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>*/}
                                    {/*        </div>*/}
                                    {/*)}*/}
                                    {cState.auth && cState.role == 3 ? <>
                                            {getBlock()}
                                            {Object.getOwnPropertyNames(classmatesInfo).map(param =>
                                                getBlock(param, true)
                                            )}
                                        </> :
                                        Object.getOwnPropertyNames(classmatesInfo).map(param =>
                                            <div key={param}>
                                                <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                                    {classmatesInfo[param].name}
                                                </div>
                                                <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
export default Classmates;