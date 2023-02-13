import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import peopleCSS from "../peopleMain.module.css";
import {states, teachers, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, copyLink, ele, onClose, onDel, onEdit, onFin, refreshLink, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import copyl from "../../../media/copyl.png";
import copyd from "../../../media/copyd.png";
import refreshCd from "../../../media/refreshCd.png";
import refreshCl from "../../../media/refreshCl.png";
import {CHANGE_TEACHERS, CHANGE_TEACHERS_DEL, CHANGE_TEACHERS_GL, changePeople} from "../../../store/actions";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, teachersInfo, cState, nmy, themeState, inps, pari, sit, errText;
sit = "http://localhost:3000";
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
nmy = {
    0: {
        "id5" : {
            name: "Петров А.А."
        },
        "id6" : {
            name: "Петров А.С."
        },
        "id7" : {
            name: "Петров А.Г."
        }
    }
};
inps = {inpnpt : "Фамилия И.О."};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];

function getTea(title, x, b, b1) {
    return (
        <div className={peopleCSS.nav_iZag}>
            <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                {title}
            </div>
            {b1 ?
                    <>
                        <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
                            <div className={peopleCSS.nav_i+" "+peopleCSS.link} id={peopleCSS.nav_i} onClick={onEdit}>
                                Добавить педагога
                            </div>
                            <div className={peopleCSS.pepl} data-st="0">
                                <div className={peopleCSS.fi}>
                                    <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                        {inps.inpnpt}
                                    </div>
                                    <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                    <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_TEACHERS)} title="Подтвердить" alt=""/>
                                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                                <div className={peopleCSS.ed}>
                                    <div className={peopleCSS.preinf}>
                                        ФИО:
                                    </div>
                                    <input className={peopleCSS.inp} id={"inpnpt_"} placeholder={"Фамилия И.О."} defaultValue={inps.inpnpt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                    {ele(false, "inpnpt_", true, inps, pari)}
                                    <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_TEACHERS)} title="Подтвердить" alt=""/>
                                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                        </div>
                        {x[0] && Object.getOwnPropertyNames(x[0]).map(param =>
                            <div className={peopleCSS.nav_iZag + " " + peopleCSS.nav_iZag1} key={param}>
                                <div className={peopleCSS.pepl} data-st="0">
                                    <div className={peopleCSS.fi}>
                                        <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                            {x[0][param].name}
                                        </div>
                                        <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                        <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                        <img className={peopleCSS.imginp} data-id1={param} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_TEACHERS_DEL)} title="Удалить" alt=""/>
                                        <input className={peopleCSS.inp+" "+peopleCSS.copyInp} data-id1={param} id={"inpcpt_" + param} placeholder="Ссылка не создана" value={x[0][param].link} type="text" readOnly/>
                                        <img className={peopleCSS.imginp+" "+peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e)=>refreshLink(e, sit, CHANGE_TEACHERS)} title="Создать ссылку-приглашение" alt=""/>
                                        <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={x[0][param].link ? "1" : "0"} onClick={(e)=>copyLink(e, x[0][param].link, x[0][param].name)} alt=""/>
                                    </div>
                                    <div className={peopleCSS.ed}>
                                        <div className={peopleCSS.preinf}>
                                            ФИО:
                                        </div>
                                        <input className={peopleCSS.inp} data-id1={param} id={"inpnpt_" + param} placeholder={"Фамилия И.О."} defaultValue={x[0][param].name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                        {ele(false, "inpnpt_" + param, true, inps, pari)}
                                        <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_TEACHERS)} title="Подтвердить" alt=""/>
                                        <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                :
                    Object.getOwnPropertyNames(x).map(param =>
                        <div className={peopleCSS.nav_iZag + " " + peopleCSS.nav_iZag1} key={param}>
                            <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                {param}
                            </div>
                            {Object.getOwnPropertyNames(x[param]).map(param1 =>
                                b?
                                    <div className={peopleCSS.pepl} key={param1} data-st="0">
                                        <div className={peopleCSS.fi}>
                                            <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                                {x[param][param1].name}
                                            </div>
                                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                                            <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                            <img className={peopleCSS.imginp} data-id={param + "_" + param1} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_TEACHERS_DEL)} title="Удалить" alt=""/>
                                            <input className={peopleCSS.inp+" "+peopleCSS.copyInp} data-id={param + "_" + param1} id={"inpcpt_" + param + "_" + param1} placeholder="Ссылка не создана" value={x[param][param1].link} type="text" readOnly/>
                                            <img className={peopleCSS.imginp+" "+peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e)=>refreshLink(e, sit, CHANGE_TEACHERS)} title="Создать ссылку-приглашение" alt=""/>
                                            <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={x[param][param1].link ? "1" : "0"} onClick={(e)=>copyLink(e, x[param][param1].link, x[param][param1].name)} alt=""/>
                                        </div>
                                        <div className={peopleCSS.ed}>
                                            <div className={peopleCSS.preinf}>
                                                ФИО:
                                            </div>
                                            <input className={peopleCSS.inp} data-id={param + "_" + param1} id={"inpnpt_" + param + "_" + param1} placeholder={"Фамилия И.О."} defaultValue={x[param][param1].name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                            {ele(false, "inpnpt_" + param + "_" + param1, true, inps, pari)}
                                            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_TEACHERS)} title="Подтвердить" alt=""/>
                                            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                    </div>
                                :
                                    <div key={param1}>
                                        <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                            {x[param][param1].name}
                                        </div>
                                        <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                    </div>
                            )}
                        </div>
                    )
            }
        </div>
    );
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
        if (cState.auth && cState.role == 3){
            dispatch(changePeople(CHANGE_TEACHERS_GL,1, undefined, undefined, nmy));
        }
        for(let el of document.querySelectorAll("." + peopleCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
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
        <div className={peopleCSS.header}>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            {(cState.auth && cState.role == 3) ?
                    <div className={peopleCSS.blockPep}>
                        <div className={peopleCSS.pep}>
                            {getTea("Нераспределённые педагоги", teachersInfo[1], true, true)}
                            {getTea("Педагоги", teachersInfo[0], true)}
                        </div>
                    </div>
                :
                    (Object.getOwnPropertyNames(teachersInfo[0]).length == 0 && Object.getOwnPropertyNames(teachersInfo[1]).length == 0) ?
                            <ErrFound text={errText}/>
                        :
                            <div className={peopleCSS.blockPep}>
                                <div className={peopleCSS.pep}>
                                    {getTea("Мои педагоги", teachersInfo[0])}
                                    {getTea("Другие педагоги", teachersInfo[1])}
                                </div>
                            </div>
            }
        </div>
    )
}
export default Teachers;