import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import dnevCSS from './dnevnik.module.css';
import warn from '../../media/warn_big.png';
import {dnevnik, states} from "../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_DNEVNIK_DAY_DOWN, CHANGE_DNEVNIK_DAY_UP, changeDnevnik, changeDnevnikDay} from "../../store/actions";

let DoW = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"], incDow = 0, shd = 0, scrolling = false, elem = {lessons: []};

let ev, dnev, dispatch

function fun1(x, x1) {
    console.log("dsfsfddsf12" + x);
    console.log("dsfsfddsf123" + x1);
    return x1;
}

function getDoW() {
    if(incDow > 6) incDow = 0;
    let s = incDow;
    incDow++;
    shd = 0;
    console.log("dfs13567 " + DoW[s]);
    return DoW[s];
}

function setDoW(inte) {
    incDow = inte;
    return "";
}

function tim() {
    if (scrolling) {
        scrolling = false;
        let par = Object.getOwnPropertyNames(dnev.days);
        if(ev.deltaY < 0 && window.pageYOffset == 0)
        {
            let date = getDate(par[0]);
            for(let i = 0; i < 7; i++)
            {
                date.setDate(date.getDate() - 1);
                dispatch(changeDnevnik(date.toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"2-digit"}), elem, CHANGE_DNEVNIK_DAY_UP));
            }
        }
        if(ev.deltaY > 0 && window.pageYOffset >= (document.body.scrollHeight-document.body.clientHeight))
        {
            let date = getDate(par[par.length-1]);
            for(let i = 0; i < 7; i++)
            {
                date.setDate(date.getDate() + 1);
                dispatch(changeDnevnik(date.toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"2-digit"}), elem, CHANGE_DNEVNIK_DAY_DOWN));
            }
        }
    }
}

function getDate(dat) {
    let d = dat.split('.');
    return new Date("20" + [d[2], d[1], d[0]].join("-"));
}

function getDiff(dat, dat1, bol) {
    let diff = (((getDate(dat) - getDate(dat1)) / 8.64e7)-(bol ? 6 : 0)) / 7
    if(diff > -1 && diff < 1) return undefined;
    if(diff < 0) return diff + "";
    if(diff > 0) return "+" + diff;
}

function getSch(inc, inc1) {
    console.log("dfs135 " + inc);
    console.log("dfs1356 " + inc1);
    return dnev.schedule[inc][inc1];
}

export function Dnevnik() {
    dnev = useSelector(dnevnik);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Dnevnik.jsx");
        for(let el of document.querySelectorAll("." + dnevCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        window.onwheel = (e) => {
            if(!scrolling) {
                scrolling = true;
                ev = e;
                setTimeout(tim,1000);
            }
        };
        return function() {
            console.log("I was triggered during componentWillUnmount Dnevnik.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + dnevCSS.AppHeader + " *")) {
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        }
        console.log('componentDidUpdate Dnevnik.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Дневник</title>
            </Helmet>
            <div className={dnevCSS.AppHeader}>
                {Object.getOwnPropertyNames(dnev.days).length == 0 && (<div className={dnevCSS.block}>
                    <img alt="banner" src={warn}/>
                    <div className={dnevCSS.block_text}>
                        К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                    </div>
                </div>)}
                {Object.getOwnPropertyNames(dnev.days).length > 0 && (<div className={dnevCSS.blockDay}>
                    {setDoW(0)}
                    {Object.getOwnPropertyNames(dnev.days).map(param =>
                        <>
                            {(incDow == 0 || incDow == 7) && <div className={dnevCSS.blockL+" "+dnevCSS.blockLU}>
                                <div className={dnevCSS.blockLine}/>
                                <div className={dnevCSS.blockLText}>
                                    {getDiff(param, dnev.currWeek) ? "Неделя " + getDiff(param, dnev.currWeek) : "Текущая неделя"}
                                </div>
                            </div>}
                            <div className={dnevCSS.day}>
                                <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                    {getDoW()} / {param}
                                </div>
                                <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                    Домашнее задание
                                </div>
                                <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                    Оценка
                                </div>
                                {dnev.days[param].lessons.map(param =>
                                    <>
                                        <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                            {param.name ? param.name : getSch(incDow-1, shd++)}
                                        </div>
                                        <div className={dnevCSS.nav_i+" "+dnevCSS.dayHomework} id={dnevCSS.nav_i}>
                                            {param.homework}
                                        </div>
                                        <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                            {param.mark}
                                            {param.weight > 1 && (<div className={dnevCSS.nav_i+" "+dnevCSS.nav_iWeight} id={dnevCSS.nav_i}>
                                                {param.weight}
                                            </div>)}
                                            {param.type && (<div className={dnevCSS.nav_i+" "+dnevCSS.nav_iType} id={dnevCSS.nav_i}>
                                                {param.type}
                                            </div>)}
                                        </div>
                                    </>
                                )}
                                {dnev.days[param].lessons.length < 5 && Array(5-dnev.days[param].lessons.length).fill('').map(param =>
                                    <>
                                        <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                            {getSch(incDow-1, shd++)}
                                        </div>
                                        <div className={dnevCSS.nav_i+" "+dnevCSS.dayHomework} id={dnevCSS.nav_i}>
                                            <br />
                                        </div>
                                        <div className={dnevCSS.nav_i} id={dnevCSS.nav_i}>
                                            <br />
                                        </div>
                                    </>
                                )}
                            </div>
                            {incDow == 7 && <div className={dnevCSS.blockL+" "+dnevCSS.blockLD}>
                                <div className={dnevCSS.blockLText+" "+dnevCSS.blockLTextD}>
                                    {getDiff(param, dnev.currWeek, true) ? "Неделя " + getDiff(param, dnev.currWeek, true) : "Текущая неделя"}
                                </div>
                                <div className={dnevCSS.blockLine}/>
                            </div>}
                        </>)}
                </div>)}
            </div>
        </>
    )
}
export default Dnevnik;