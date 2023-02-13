import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import {classmates, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, copyLink, ele, onClose, onDel, onEdit, onFin, refreshLink, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import peopleCSS from "../peopleMain.module.css";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import {CHANGE_CLASSMATES, CHANGE_CLASSMATES_DEL} from "../../../store/actions";
import no from "../../../media/no.png";
import refreshCd from "../../../media/refreshCd.png";
import refreshCl from "../../../media/refreshCl.png";
import copyd from "../../../media/copyd.png";
import copyl from "../../../media/copyl.png";

let dispatch, classmatesInfo, gr, errText, inps, pari, sit, themeState, cState;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
sit = "http://localhost:3000";
inps = {inpnpt : "Фамилия И.О."};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];
gr = {
    groups: {
        0: "11A",
        1: "11Б",
        2: "11В",
        3: "11Г",
        4: "10А",
        5: "10Б",
        6: "10В",
        7: "10Г",
        8: "9А",
        9: "9Б",
        10: "9В",
        11: "9Г",
        12: "8А",
        13: "8Б",
        14: "8В",
        15: "8Г",
        16: "7А",
        17: "7Б",
        18: "7В",
        19: "7Г",
        20: "6А",
        21: "6Б",
        22: "6В",
        23: "6Г",
        24: "5А",
        25: "5Б",
        26: "5В",
        27: "5Г",
        28: "4А",
        29: "4Б",
        30: "4В",
        31: "4Г",
        32: "3А",
        33: "3Б",
        34: "3В",
        35: "3Г",
        36: "2А",
        37: "2Б",
        38: "2В",
        39: "2Г",
        40: "1А",
        41: "1Б",
        42: "1В",
        43: "1Г"
    },
    group: 1
};

function getMates(x, b) {
    return b ?
            <>
                <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
                    <div className={peopleCSS.nav_i+" "+peopleCSS.link} id={peopleCSS.nav_i} onClick={onEdit}>
                        Добавить ученика
                    </div>
                    <div className={peopleCSS.pepl} data-st="0">
                        <div className={peopleCSS.fi}>
                            <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                {inps.inpnpt}
                            </div>
                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                            <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_CLASSMATES)} title="Подтвердить" alt=""/>
                            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                        </div>
                        <div className={peopleCSS.ed}>
                            <div className={peopleCSS.preinf}>
                                ФИО:
                            </div>
                            <input className={peopleCSS.inp} id={"inpnpt_"} placeholder={"Фамилия И.О."} defaultValue={inps.inpnpt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                            {ele(false, "inpnpt_", true, inps, pari)}
                            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_CLASSMATES)} title="Подтвердить" alt=""/>
                            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                        </div>
                    </div>
                </div>
                {Object.getOwnPropertyNames(x).map(param =>
                    <div className={peopleCSS.pepl} key={param} data-st="0">
                        <div className={peopleCSS.fi}>
                            <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                {x[param].name}
                            </div>
                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                            <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            <img className={peopleCSS.imginp} data-id={param} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_CLASSMATES_DEL)} title="Удалить" alt=""/>
                            <input className={peopleCSS.inp+" "+peopleCSS.copyInp} data-id1={param} id={"inpcpt_" + param} placeholder="Ссылка не создана" value={x[param].link} type="text" readOnly/>
                            <img className={peopleCSS.imginp+" "+peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e)=>refreshLink(e, sit, CHANGE_CLASSMATES)} title="Создать ссылку-приглашение" alt=""/>
                            <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={x[param].link ? "1" : "0"} onClick={(e)=>copyLink(e, x[param].link, x[param].name)} alt=""/>
                        </div>
                        <div className={peopleCSS.ed}>
                            <div className={peopleCSS.preinf}>
                                ФИО:
                            </div>
                            <input className={peopleCSS.inp} data-id1={param} id={"inpnpt_" + param} placeholder={"Фамилия И.О."} defaultValue={x[param].name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                            {ele(false, "inpnpt_" + param, true, inps, pari)}
                            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_CLASSMATES)} title="Подтвердить" alt=""/>
                            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                        </div>
                    </div>
                )}
            </>
        :
            Object.getOwnPropertyNames(x).map(param =>
                <div key={param}>
                    <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                        {x[param].name}
                    </div>
                    <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                </div>
            );
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
            {Object.getOwnPropertyNames(classmatesInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <>
                        {(cState.auth && cState.role == 3) &&
                            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                                <Pane gro={gr} cla={true}/>
                            </div>
                        }
                        <div className={peopleCSS.blockPep}>
                            <div className={peopleCSS.pep}>
                                <div className={peopleCSS.nav_iZag}>
                                    <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                        {cState.role == 3 ? "Обучающиеся" : "Одноклассники"}
                                    </div>
                                    {getMates(classmatesInfo, (cState.auth && cState.role == 3))}
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
export default Classmates;