import React, {useEffect, useRef} from "react";
import analyticsCSS from './analyticsMain.module.css';
import {Link, Outlet} from "react-router-dom";

let act = ".panYo", act_new = "";

function setActivedMy(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

export function setActNew(name) {
    act_new = name;
}

export function AnalyticsMain() {
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount AnalyticsMain.jsx");
        for(let el of document.querySelectorAll("." + analyticsCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        setActivedMy(act_new);
        return function() {
            console.log("I was triggered during componentWillUnmount AnalyticsMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate AnalyticsMain.jsx');
    });
    return (
        <>
            <div className={analyticsCSS.AppHeader}>
                <nav className={analyticsCSS.panel} id="her">
                    <Link className={analyticsCSS.nav_i+" panZvon " + analyticsCSS.panZvon} to="zvonki" id={analyticsCSS.nav_i} onClick={() => {setActivedMy(".panZvon")}}>
                        Расписание звонков
                    </Link>
                    <Link className={analyticsCSS.nav_i+" panPer " + analyticsCSS.panPer} to="periods" id={analyticsCSS.nav_i} onClick={() => {setActivedMy(".panPer")}}>
                        Расписание периодов
                    </Link>
                    <Link className={analyticsCSS.nav_i+" panRas " + analyticsCSS.panRas} to="schedule" id={analyticsCSS.nav_i} onClick={() => {setActivedMy(".panRas")}}>
                        Расписание
                    </Link>
                    <Link className={analyticsCSS.nav_i+" panZhu " + analyticsCSS.panZhu} to="journal" id={analyticsCSS.nav_i} onClick={() => {setActivedMy(".panZhu")}}>
                        Журнал
                    </Link>
                    <Link className={analyticsCSS.nav_i+" panIto " + analyticsCSS.panIto} to="marks" id={analyticsCSS.nav_i} onClick={() => {setActivedMy(".panIto")}}>
                        Итоговые оценки
                    </Link>
                    <div className={analyticsCSS.lin}>
                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    )
}
export default AnalyticsMain;