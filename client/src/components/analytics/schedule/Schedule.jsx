import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import scheduleCSS from './schedule.module.css';
import {contactsSelec, schedules} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";

let dispatch, schedulesInfo, shd = 0, DoW = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];


// function fun1(x, x1) {
//     console.log("dsfsfddsf12 " + x);
//     console.log("dsfsfddsf123 " + x1);
//     console.log("dsfsfddsf1234 " + schedulesInfo.schedule[x]);
//     console.log("dsfsfddsf1235 " + schedulesInfo.schedule[x][x1]);
//     return schedulesInfo.schedule[x][x1];
// }

function setNull()
{
    shd = 0;
    return "";
}

export function Schedule() {
    schedulesInfo = useSelector(schedules);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Schedule.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(schedulesInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panRas");
        for(let el of document.querySelectorAll("." + scheduleCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Schedule.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + scheduleCSS.AppHeader + " *")) {
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
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
                                    Преподаватель
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
                                            {param1.prepod}
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
                }
            </div>
        </>
    )
}
export default Schedule;