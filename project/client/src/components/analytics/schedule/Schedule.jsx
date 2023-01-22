import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import scheduleCSS from './schedule.module.css';
import {schedules, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";
import Pane from "../../pane/Pane";

let dispatch, cState, schedulesInfo, shd, DoW, gr;
shd = 0;
DoW = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
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

function setNull() {
    shd = 0;
    return "";
}

export function Schedule() {
    schedulesInfo = useSelector(schedules);
    cState = useSelector(states);
    if(!dispatch && cState.role != 2) setActNew(2);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Schedule.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(schedulesInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(cState.role == 2 ? ".panRas" : ".panAna");
        return function() {
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
    return (
        <>
            <Helmet>
                <title>Расписание</title>
            </Helmet>
            <div className={scheduleCSS.AppHeader}>
                {Object.getOwnPropertyNames(schedulesInfo.days).length == 0 ?
                    <div className={scheduleCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={scheduleCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <>
                        {(cState.auth && cState.role == 3) && <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                            <Pane gro={gr}/>
                        </div>}
                        <div className={scheduleCSS.blockDay}>
                            {Object.getOwnPropertyNames(schedulesInfo.days).map(param =>
                                <div className={scheduleCSS.day}>
                                    {setNull()}
                                    <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                        {DoW[param]}
                                    </div>
                                    <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                        Кабинет
                                    </div>
                                    <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                        {cState.role == 2 ? "Группа" : "Преподаватель"}
                                    </div>
                                    {schedulesInfo.days[param].lessons.map(param1 =>
                                        <>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                {param1.name ? param1.name : schedulesInfo.schedule[param][shd++]}
                                            </div>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                {param1.cabinet}
                                            </div>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                {cState.role == 2 ? param1.group : param1.prepod}
                                            </div>
                                        </>
                                    )}
                                    {schedulesInfo.days[param].lessons.length < 5 && Array(5-schedulesInfo.days[param].lessons.length).fill('').map(param =>
                                        <>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                <br />
                                            </div>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                <br />
                                            </div>
                                            <div className={scheduleCSS.nav_i} id={scheduleCSS.nav_i}>
                                                <br />
                                            </div>
                                        </>
                                    )}
                                </div>)}
                        </div>
                    </>
                }
            </div>
        </>
    )
}
export default Schedule;