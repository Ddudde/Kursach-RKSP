import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import analyticsCSS from '../analyticsMain.module.css';
import scheduleCSS from './schedule.module.css';
import {schedules, states, teachers, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {chStatB, ele, onClose, onDel, onEdit, onFin, setActNew} from "../AnalyticsMain";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import yes from "../../../media/yes.png";
import {
    CHANGE_SCHEDULE,
    CHANGE_SCHEDULE_DEL,
    CHANGE_SCHEDULE_L2,
    CHANGE_SCHEDULE_PARAM,
    changeAnalytics
} from "../../../store/actions";
import no from "../../../media/no.png";
import mapd from "../../../media/Map_symbolD.png";
import mapl from "../../../media/Map_symbolL.png";
import ed from "../../../media/edit.png";

let dispatch, cState, schedulesInfo, errText, inps, pari, teachersInfo, themeState;
inps = {sinpnpt : "Математика", sinpnkt: "300"};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";

function getSched(dI, b) {
    return b ?
        <>
            {dI.map((param, i, x, dai = schedulesInfo[param], dLI = (dai.lessons ? Object.getOwnPropertyNames(dai.lessons):[])) =>
                <div className={analyticsCSS.l1+" "+scheduleCSS.day}>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        №
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "2"}}>
                        {dai.name}
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "3"}}>
                        Кабинет
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "4"}}>
                        Преподаватель
                    </div>
                    {dLI.map((param1, i1, x, les = dai.lessons[param1]) =>
                        <>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                {i1 + 1}
                            </div>
                            <div className={analyticsCSS.edbl+" "+analyticsCSS.nav_iZag3} data-st="0">
                                <div className={analyticsCSS.fi}>
                                    <div className={analyticsCSS.nav_i+" "+analyticsCSS.nav_iZag2} id={analyticsCSS.nav_i}>
                                        {les.name}
                                    </div>
                                    <img className={analyticsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                </div>
                                <div className={analyticsCSS.ed}>
                                    <div className={analyticsCSS.preinf}>
                                        Предмет:
                                    </div>
                                    <input className={analyticsCSS.inp} data-id={param + "_" + param1} id={"sinpnpt_" + param + "_" + param1} placeholder={"Математика"} defaultValue={les.name} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                    {ele(false, "sinpnpt_" + param + "_" + param1, true, inps, pari)}
                                    <img className={analyticsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_SCHEDULE_PARAM, "name")} title="Подтвердить" alt=""/>
                                    <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                            <div className={analyticsCSS.edbl+" "+analyticsCSS.nav_iZag3} data-st="0">
                                <div className={analyticsCSS.fi}>
                                    <div className={analyticsCSS.nav_i+" "+analyticsCSS.nav_iZag2} id={analyticsCSS.nav_i}>
                                        {les.cabinet}
                                    </div>
                                    <img className={analyticsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                </div>
                                <div className={analyticsCSS.ed}>
                                    <div className={analyticsCSS.preinf}>
                                        Кабинет:
                                    </div>
                                    <input className={analyticsCSS.inp} data-id={param + "_" + param1} id={"sinpnkt_" + param + "_" + param1} placeholder={"300"} defaultValue={les.cabinet} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                    {ele(false, "sinpnkt_" + param + "_" + param1, true, inps, pari)}
                                    <img className={analyticsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_SCHEDULE_PARAM, "cabinet")} title="Подтвердить" alt=""/>
                                    <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                            <div className={analyticsCSS.edbl+" "+analyticsCSS.nav_iZag3} data-st="0">
                                <div className={analyticsCSS.fi}>
                                    <div className={analyticsCSS.nav_i+" "+analyticsCSS.nav_iZag2} id={analyticsCSS.nav_i}>
                                        {les.prepod.name}
                                    </div>
                                    <img className={analyticsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, CHANGE_SCHEDULE_DEL, {id: param, id1: param1})} title="Удалить" alt=""/>
                                </div>
                                <div className={analyticsCSS.ed}>
                                    <div className={analyticsCSS.preinf}>
                                        Педагог:
                                    </div>
                                    {getPrep(param)}
                                    <img className={analyticsCSS.imginp} data-enable={dai.nw && dai.nw.prepod ? "1" : "0"} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_SCHEDULE_PARAM, {par: "prepod", id: param, id1: param1, st: schedulesInfo})} title="Подтвердить" alt=""/>
                                    <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                </div>
                            </div>
                        </>
                    )}
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        X
                    </div>
                    <div className={analyticsCSS.add} data-st="0" style={{gridColumn: "2/5"}}>
                        <div className={analyticsCSS.nav_i+" "+analyticsCSS.link} id={analyticsCSS.nav_i} onClick={onEdit}>
                            Добавить урок
                        </div>
                        <div className={analyticsCSS.edbl+" "+analyticsCSS.nav_iZag3} data-st="0">
                            <div className={analyticsCSS.preinf}>
                                Предмет:
                            </div>
                            <input className={analyticsCSS.inp} data-id1={param} id={"sinpnpt_"} placeholder={"Математика"} defaultValue={inps.sinpnpt} onChange={(e)=>chStatB(e, inps, forceUpdate)} type="text"/>
                            {ele(false, "sinpnpt_", true, inps, pari)}
                            <div className={analyticsCSS.preinf}>
                                , Кабинет:
                            </div>
                            <input className={analyticsCSS.inp} data-id1={param} id={"sinpnkt_"} placeholder={"300"} defaultValue={inps.sinpnkt} onChange={(e)=>chStatB(e, inps, forceUpdate)} type="text"/>
                            {ele(false, "sinpnkt_", true, inps, pari)}
                            <div className={analyticsCSS.preinf}>
                                , Педагог:
                            </div>
                            {getPrep(param)}
                            <img className={analyticsCSS.imginp} data-enable={inps.sinpnpt_ && inps.sinpnkt_ && dai.nw && dai.nw.prepod ? "1" : "0"} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_SCHEDULE, schedulesInfo)} title="Подтвердить" alt=""/>
                            <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                        </div>
                    </div>
                    {dLI.length < 4 && Array(4-dLI.length).fill('').map(param =>
                        <>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    :
        <>
            {dI.map((param, i, x, dLI = (schedulesInfo[param].lessons ? Object.getOwnPropertyNames(schedulesInfo[param].lessons):[])) =>
                <div className={analyticsCSS.l1+" "+scheduleCSS.day}>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        №
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "2"}}>
                        {schedulesInfo[param].name}
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "3"}}>
                        Кабинет
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "4"}}>
                        {cState.role == 2 ? "Группа" : "Преподаватель"}
                    </div>
                    {dLI.map((param1, i1, x, les = schedulesInfo[param].lessons[param1]) =>
                        <>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                {i1 + 1}
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                {les.name}
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                {les.cabinet}
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                {cState.role == 2 ? les.group : les.prepod}
                            </div>
                        </>
                    )}
                    {dLI.length < 5 && Array(5-dLI.length).fill('').map(param =>
                        <>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                                <br />
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
}

function selecPrep(e, id, param, obj) {
    inps.nyid = id;
    dispatch(changeAnalytics(CHANGE_SCHEDULE_L2, param, "nw", "prepod", obj.name));
}

function getPrep(param) {
    let ltI2, d, ltI0;
    ltI2 = Object.getOwnPropertyNames(teachersInfo[2]);
    ltI0 = Object.getOwnPropertyNames(teachersInfo[0]);
    d = schedulesInfo[param];
    // if((ltI2.length > 0 || ltI0.length > 0) && !inps.nyid) {
    //     let id, x;
    //     if(ltI2.length == 0){
    //         let lltI = Object.getOwnPropertyNames(teachersInfo[0][ltI0[0]]);
    //         id = lltI[0];
    //         x = teachersInfo[0][ltI0[0]][lltI[0]];
    //     } else {
    //         id = ltI2[0];
    //         x = teachersInfo[2][ltI2[0]];
    //     }
    //     selecPrep(undefined, id, param, x);
    // }
    return (
        <div className={scheduleCSS.blockList}>
            <div className={analyticsCSS.nav_i+' '+scheduleCSS.selEl} id={analyticsCSS.nav_i}>
                <div className={scheduleCSS.elInf}>Педагог:</div>
                <div className={scheduleCSS.elText}>{d.nw && d.nw.prepod ? d.nw.prepod : "Не выбран"}</div>
                <img className={scheduleCSS.mapImg} data-enablem={ltI2.length < 2 && ltI0.length < 2 ? "0" : "1"} src={themeState.theme_ch ? mapd : mapl} alt=""/>
            </div>
            <div className={scheduleCSS.list}>
                {ltI0.map((param1, i, x, lltI = Object.getOwnPropertyNames(teachersInfo[0][param1])) =>
                    <>
                        {lltI.length > 0 && !(lltI.length == 1 && lltI[0] == inps.nyid) &&
                            <div className={analyticsCSS.nav_i+' '+scheduleCSS.listZag} id={analyticsCSS.nav_i}>
                                <div className={scheduleCSS.elInf}>{param1}:</div>
                            </div>
                        }
                        {lltI.map((param2, i, x, tO = teachersInfo[0][param1][param2]) =>
                            param2 != inps.nyid &&
                            <div className={analyticsCSS.nav_i+' '+scheduleCSS.listEl} key={param2} id={analyticsCSS.nav_i} onClick={(e) => (selecPrep(e, param2, param, tO))}>
                                <div className={scheduleCSS.elInf}>Педагог:</div>
                                <div className={scheduleCSS.elText}>{tO.name}</div>
                            </div>
                        )}
                    </>
                )}
                {ltI2.length > 0 && !(ltI2.length == 1 && ltI2[0] == inps.nyid) &&
                    <div className={analyticsCSS.nav_i+' '+scheduleCSS.listZag} id={analyticsCSS.nav_i}>
                        <div className={scheduleCSS.elInf}>Нераспределённые:</div>
                    </div>
                }
                {ltI2.map((param1, i, x, tO = teachersInfo[2][param1]) =>
                    param1 != inps.nyid &&
                    <div className={analyticsCSS.nav_i+' '+scheduleCSS.listEl} key={param1} id={analyticsCSS.nav_i} onClick={(e) => (selecPrep(e, param1, param, tO))}>
                        <div className={scheduleCSS.elInf}>Педагог:</div>
                        <div className={scheduleCSS.elText}>{tO.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export function Schedule() {
    schedulesInfo = useSelector(schedules);
    teachersInfo = useSelector(teachers);
    themeState = useSelector(themes);
    cState = useSelector(states);
    if(!dispatch && cState.role != 2) setActNew(2);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Schedule.jsx");
        if(cState.role == 2) setActived(".panRas");
        for(let el of document.querySelectorAll(" *[id^='sinpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Schedule.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Schedule.jsx');
    });
    let dI = Object.getOwnPropertyNames(schedulesInfo);
    return (
        <div className={analyticsCSS.header}>
            <Helmet>
                <title>Расписание</title>
            </Helmet>
            {dI.length == 0 && cState.role != 3 ?
                    <ErrFound text={errText}/>
                :
                    <>
                        {(cState.auth && cState.role == 3) &&
                            <div className={scheduleCSS.pane}>
                                <Pane cla={true}/>
                            </div>
                        }
                        <div className={analyticsCSS.block} style={{marginTop: (cState.auth && cState.role == 3) ? "7vh" : undefined}}>
                            {getSched(dI, cState.role == 3)}
                        </div>
                    </>
            }
        </div>
    )
}
export default Schedule;