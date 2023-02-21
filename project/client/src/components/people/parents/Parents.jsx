import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import peopleCSS from '../peopleMain.module.css';
import parentsCSS from './parents.module.css';
import {classmates, parents, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, copyLink, ele, onClose, onDel, onEdit, onFin, refreshLink, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import mapd from "../../../media/Map_symbolD.png";
import mapl from "../../../media/Map_symbolL.png";
import {
    CHANGE_PARENTS,
    CHANGE_PARENTS_DEL,
    CHANGE_PARENTS_DEL_L0,
    CHANGE_PARENTS_L1_PARAM,
    changePeople
} from "../../../store/actions";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import refreshCd from "../../../media/refreshCd.png";
import refreshCl from "../../../media/refreshCl.png";
import copyd from "../../../media/copyd.png";
import copyl from "../../../media/copyl.png";

let dispatch, parentsInfo, classmatesInfo, errText, inps, pari, sit, themeState, cState;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
sit = "http://localhost:3000";
inps = {nyid : undefined, inpnpt : "Фамилия И.О."};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];

function selecKid(e, id) {
    inps.nyid = id;
    dispatch(changePeople(CHANGE_PARENTS_L1_PARAM, undefined, "nw", undefined, classmatesInfo[inps.nyid].name));
}

function getKids() {
    let lpI = Object.getOwnPropertyNames(classmatesInfo);
    for(let i = 0; i < lpI.length; i++){
        if(parentsInfo[lpI[i]]) {
            lpI.splice(i, 1);
            i--;
        }
    }
    if(lpI.length > 0 && !inps.nyid) {
        inps.nyid = lpI[0];
        dispatch(changePeople(CHANGE_PARENTS_L1_PARAM, undefined, "nw", undefined, classmatesInfo[inps.nyid].name));
    }
    inps.ppI = inps.nyid && parentsInfo.nw.par ? Object.getOwnPropertyNames(parentsInfo.nw.par) : [];
    return (inps.nyid &&
        <div className={parentsCSS.blockList}>
            <div className={peopleCSS.nav_i+' '+parentsCSS.selEl} id={peopleCSS.nav_i}>
                <div className={parentsCSS.elInf}>Ученик:</div>
                <div className={parentsCSS.elText}>{parentsInfo.nw.name}</div>
                <img className={parentsCSS.mapImg} data-enablem={lpI.length < 2 ? "0" : "1"} src={themeState.theme_ch ? mapd : mapl} alt=""/>
            </div>
            <div className={parentsCSS.list}>
                {parentsInfo && lpI.map(param1 =>
                    param1 != inps.nyid &&
                    <div className={peopleCSS.nav_i+' '+parentsCSS.listEl} key={param1} id={peopleCSS.nav_i} onClick={(e) => (selecKid(e, param1))}>
                        <div className={parentsCSS.elInf}>Ученик:</div>
                        <div className={parentsCSS.elText}>{classmatesInfo[param1].name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

function getAddPred(param) {
    return(
        <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
            <div className={peopleCSS.nav_i+" "+peopleCSS.link} id={peopleCSS.nav_i} onClick={onEdit}>
                Добавить представителя
            </div>
            <div className={peopleCSS.pepl} data-st="0">
                <div className={peopleCSS.fi}>
                    <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                        {inps.inpnpt}
                    </div>
                    <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                    <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                    <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_PARENTS, parentsInfo)} title="Подтвердить" alt=""/>
                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Выйти из режима создания" alt=""/>
                </div>
                <div className={peopleCSS.ed}>
                    <div className={peopleCSS.preinf}>
                        ФИО:
                    </div>
                    <input className={peopleCSS.inp} data-id1={param ? param : undefined} id={"inpnpt_"} placeholder={"Фамилия И.О."} defaultValue={inps.inpnpt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                    {ele(false, "inpnpt_", true, inps, pari)}
                    <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate)} title="Подтвердить" alt=""/>
                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
        </div>
    )
}

function getAdd() {
    return (
        <div className={peopleCSS.add+" "+peopleCSS.nav_iZag} data-st="0">
            <div className={peopleCSS.nav_i+" "+peopleCSS.link} data-enable={inps.nyid ? 1 : 0} id={peopleCSS.nav_i} onClick={onEdit}>
                Добавить ученику представителей
            </div>
            <div className={peopleCSS.pepl} style={{marginBlock: "unset"}}>
                <div className={parentsCSS.uch}>
                    <div className={peopleCSS.nav_i+" "+parentsCSS.nam} id={peopleCSS.nav_i}>
                        Обучающийся:
                    </div>
                    {getKids()}
                    <img className={peopleCSS.profIm} data-enable={inps.nyid ? "1" : "0"} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                    <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                        {inps.ppI.length > 1 ? "Представители:" : "Представитель:"}
                    </div>
                </div>
                {getAddPred()}
                {inps.ppI.map(param1 =>
                    <div className={peopleCSS.pepl} data-st="0" key={param1}>
                        <div className={peopleCSS.fi}>
                            <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                {parentsInfo.nw.par[param1].name}
                            </div>
                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Так будет выглядеть иконка перехода в профиль" alt=""/>
                            <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            <img className={peopleCSS.imginp} data-id={param1} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_PARENTS_DEL)} title="Удалить" alt=""/>
                        </div>
                        <div className={peopleCSS.ed}>
                            <div className={peopleCSS.preinf}>
                                ФИО:
                            </div>
                            <input className={peopleCSS.inp} data-id1={param1} id={"inpnpt_" + param1} placeholder={"Фамилия И.О."} defaultValue={parentsInfo.nw.par[param1].name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                            {ele(false, "inpnpt_" + param1, true, inps, pari)}
                            <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_PARENTS, parentsInfo)} title="Подтвердить" alt=""/>
                            <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                        </div>
                    </div>
                )}
                <div className={parentsCSS.upr}>
                    <img className={peopleCSS.imginp+" yes "} src={yes} data-enable={(parentsInfo.nw && parentsInfo.nw.par && Object.getOwnPropertyNames(parentsInfo.nw.par).length > 0) ? "1" : "0"} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_PARENTS, parentsInfo)} title="Подтвердить" alt=""/>
                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, true)} title="Выйти из режима создания" alt=""/>
                </div>
            </div>
        </div>
    );
}

function getParents (pI, b) {
    return b ?
            <>
                {getAdd()}
                {pI.map((param, i, x, ppI = parentsInfo[param].par ? Object.getOwnPropertyNames(parentsInfo[param].par) : [])=>
                    (param != "nw" && parentsInfo[param].par) &&
                    <div className={peopleCSS.nav_iZag+" "+peopleCSS.nav_iZag1} key={param}>
                        <div className={parentsCSS.uch}>
                            <div className={peopleCSS.nav_i+" "+parentsCSS.nam} id={peopleCSS.nav_i}>
                                Обучающийся: {parentsInfo[param].name}
                            </div>
                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                            <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                {ppI.length > 1 ? "Представители:" : "Представитель:"}
                            </div>
                        </div>
                        {getAddPred(param)}
                        {ppI.map(param1 =>
                            <div className={peopleCSS.pepl} data-st="0" key={param1}>
                                <div className={peopleCSS.fi}>
                                    <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                        {parentsInfo[param].par[param1].name}
                                    </div>
                                    <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                    <img className={peopleCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    <img className={peopleCSS.imginp} data-id={param + "_" + param1} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_PARENTS_DEL, parentsInfo)} title="Удалить" alt=""/>
                                    <input className={peopleCSS.inp+" "+peopleCSS.copyInp} data-id={param + "_" + param1} id={"inpcpt_" + param + "_" + param1} placeholder="Ссылка не создана" value={parentsInfo[param].par[param1].link} type="text" readOnly/>
                                    <img className={peopleCSS.imginp+" "+peopleCSS.refrC} src={themeState.theme_ch ? refreshCd : refreshCl} onClick={(e)=>refreshLink(e, sit, CHANGE_PARENTS)} title="Создать ссылку-приглашение" alt=""/>
                                    <img className={peopleCSS.imginp} src={themeState.theme_ch ? copyd : copyl} title="Копировать" data-enable={parentsInfo[param].par[param1].link ? "1" : "0"} onClick={(e)=>copyLink(e, parentsInfo[param].par[param1].link, parentsInfo[param].par[param1].name)} alt=""/>
                                </div>
                                <div className={peopleCSS.ed}>
                                    <div className={peopleCSS.preinf}>
                                        ФИО:
                                    </div>
                                    <input className={peopleCSS.inp} data-id={param + "_" + param1} id={"inpnpt_" + param1} placeholder={"Фамилия И.О."} defaultValue={parentsInfo[param].par[param1].name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                    {ele(false, "inpnpt_" + param + "_" + param1, true, inps, pari)}
                                    <img className={peopleCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_PARENTS, parentsInfo)} title="Подтвердить" alt=""/>
                                    <img className={peopleCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                        )}
                        <div className={parentsCSS.upr}>
                            <img className={peopleCSS.imginp} data-id1={param} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_PARENTS_DEL_L0)} title="Удалить" alt=""/>
                        </div>
                    </div>
                )}
            </>
        :
            pI.map((param, i, x, ppI = parentsInfo[param].par ? Object.getOwnPropertyNames(parentsInfo[param].par) : []) =>
                parentsInfo[param].par &&
                <div className={peopleCSS.nav_iZag+" "+peopleCSS.nav_iZag1} key={param}>
                    <div className={parentsCSS.uch}>
                        <div className={peopleCSS.nav_i+" "+parentsCSS.nam} id={peopleCSS.nav_i}>
                            Обучающийся: {parentsInfo[param].name}
                        </div>
                        <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                        <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                            {ppI.length > 1 ? "Представители:" : "Представитель:"}
                        </div>
                    </div>
                    {ppI.map(param1 =>
                        <div key={param1}>
                            <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                {parentsInfo[param].par[param1].name}
                            </div>
                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                        </div>
                    )}
                </div>
            )
}

export function Parents() {
    parentsInfo = useSelector(parents);
    classmatesInfo = useSelector(classmates);
    themeState = useSelector(themes);
    cState = useSelector(states);
    if(!dispatch) setActNew(3);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Parents.jsx");
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Parents.jsx");
        }
    }, []);
    let pI = Object.getOwnPropertyNames(parentsInfo);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Parents.jsx');
    });
    return (
        <div className={peopleCSS.header}>
            <Helmet>
                <title>Родители</title>
            </Helmet>
            {pI.length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <>
                        {(cState.auth && cState.role == 3) &&
                            <div className={parentsCSS.pane}>
                                <Pane cla={true}/>
                            </div>
                        }
                        <div className={peopleCSS.blockPep} style={{marginTop: (cState.auth && cState.role == 3) ? "7vh" : undefined}}>
                            <div className={peopleCSS.pep}>
                                <div className={peopleCSS.nav_iZag}>
                                    <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                        Родители
                                    </div>
                                    {getParents(pI, (cState.auth && cState.role == 3))}
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
export default Parents;