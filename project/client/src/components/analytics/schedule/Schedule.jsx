import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import analyticsCSS from '../analyticsMain.module.css';
import scheduleCSS from './schedule.module.css';
import {schedules, states, teachers, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {chStatB, ele, onClose, onEdit, onFin, setActNew} from "../AnalyticsMain";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import yes from "../../../media/yes.png";
import {CHANGE_PERIODS_L1, CHANGE_SCHEDULE, changeAnalytics} from "../../../store/actions";
import no from "../../../media/no.png";
import mapd from "../../../media/Map_symbolD.png";
import mapl from "../../../media/Map_symbolL.png";

let dispatch, cState, schedulesInfo, gr, errText, inps, pari, teachersInfo, themeState;
inps = {inpnnt : "V четверть", inpnit: "01.09.22-03.11.22"};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
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

function getSched(dI) {
    return dI.map((param, i, x, dLI = (schedulesInfo.days[param].lessons ? Object.getOwnPropertyNames(schedulesInfo.days[param].lessons):[])) =>
        <div className={analyticsCSS.l1+" "+scheduleCSS.day}>
            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                №
            </div>
            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "2"}}>
                {schedulesInfo.days[param].name}
            </div>
            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "3"}}>
                Кабинет
            </div>
            <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i} style={{gridColumn: "4"}}>
                {cState.role == 2 ? "Группа" : "Преподаватель"}
            </div>
            {dLI.map((param1, i1, x, les = schedulesInfo.days[param].lessons[param1]) =>
                param1 != "nw" && <>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        {i1 + 1}
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        {les.name ? les.name : schedulesInfo.schedule[param][i1]}
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        {les.cabinet}
                    </div>
                    <div className={analyticsCSS.nav_i} id={analyticsCSS.nav_i}>
                        {cState.role == 2 ? les.group : les.prepod}
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
                    <input className={analyticsCSS.inp} id={"sinpnnt_"} placeholder={"X Смена"} defaultValue={inps.inpnnt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                    {ele(false, "sinpnnt_", true, inps, pari)}
                    <div className={analyticsCSS.preinf}>
                        , Кабинет:
                    </div>
                    <input className={analyticsCSS.inp} id={"sinpnkt_"} placeholder={"X Смена"} defaultValue={inps.inpnnt} onChange={(e)=>chStatB(e, inps)} type="text"/>
                    {ele(false, "sinpnkt_", true, inps, pari)}
                    <div className={analyticsCSS.preinf}>
                        , Педагог:
                    </div>
                    {getPrep(param)}
                    <img className={analyticsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, inps, forceUpdate, CHANGE_PERIODS_L1, schedulesInfo)} title="Подтвердить" alt=""/>
                    <img className={analyticsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
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
    )
}

function selecPrep(e, id, param) {
    inps.nyid = id;
    dispatch(changeAnalytics(CHANGE_SCHEDULE, param, "nw", "prepod", teachersInfo[2][inps.nyid].name));
}

function getPrep(param) {
    let ltI2, d, ltI0, ltI0m;
    ltI2 = Object.getOwnPropertyNames(teachersInfo[2]);
    ltI0 = Object.getOwnPropertyNames(teachersInfo[0]);
    ltI0m = [];
    d = schedulesInfo.days[param];
    for(let i = 0; i < ltI0.length; i++){
        if(schedulesInfo[ltI2[i]]) {
            // ltI0m[ltI0m.length]
        }
    }
    if(ltI2.length > 0 && !inps.nyid) {
        inps.nyid = ltI2[0];
        dispatch(changeAnalytics(CHANGE_SCHEDULE, param, "nw", "prepod", teachersInfo[2][inps.nyid].name));
    }
    return (inps.nyid &&
        <div className={scheduleCSS.blockList}>
            <div className={analyticsCSS.nav_i+' '+scheduleCSS.selEl} id={analyticsCSS.nav_i}>
                <div className={scheduleCSS.elInf}>Педагог:</div>
                <div className={scheduleCSS.elText}>{d.lessons && d.lessons.nw && d.lessons.nw.prepod ? d.lessons.nw.prepod : "Не выбран"}</div>
                <img className={scheduleCSS.mapImg} data-enablem={ltI2.length < 2 ? "0" : "1"} src={themeState.theme_ch ? mapd : mapl} alt=""/>
            </div>
            <div className={scheduleCSS.list}>
                {schedulesInfo && ltI2.map(param1 =>
                    param1 != inps.nyid &&
                    <div className={analyticsCSS.nav_i+' '+scheduleCSS.listEl} key={param1} id={analyticsCSS.nav_i} onClick={(e) => (selecPrep(e, param1, param))}>
                        <div className={scheduleCSS.elInf}>Педагог:</div>
                        <div className={scheduleCSS.elText}>{teachersInfo[2][param1].name}</div>
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
    let dI = Object.getOwnPropertyNames(schedulesInfo.days);
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
                                <Pane gro={gr} cla={true}/>
                            </div>
                        }
                        <div className={analyticsCSS.block} style={{marginTop: (cState.auth && cState.role == 3) ? "7vh" : undefined}}>
                            {getSched(dI)}
                        </div>
                    </>
            }
        </div>
    )
}
export default Schedule;