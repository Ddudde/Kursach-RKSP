import React, {useEffect, useRef} from "react";
import warn from '../../media/warning.png';
import main from './main.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {all, getCheckBoxState, clients, getThemeState, getIndicatorState} from "../../store/selector";
import {
    changeCB,
    changeCL,
    changeTheme,
    changeInd,
    changeIndNext,
    changeIndPrev,
    changeIndTimer
} from "../../store/actions";
import * as def from "./default";

let act = ".panGL";

export function setActived(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

export function Main() {
    const themeState = useSelector(getThemeState("theme"));
    const themeCheckBoxState = useSelector(getThemeState("theme_ch"));
    const isFirstUpdate = useRef(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Main.jsx");
        def.ini();
        for(let el of document.querySelectorAll("body *"))
            if(el.style.cssText === "")el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        dispatch(changeTheme(prefersDarkScheme));
        return function() {
            console.log("I was triggered during componentWillUnmount Main.jsx")
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Main.jsx');
    });
    return (
        <>
            <div className={main.fon}>
                <div/>
                <div/>
            </div>
            <nav className={main.panel} id="her">
                <Link className={main.nav_i+" panGL"} id={main.nav_i} to="start" onClick={() => {setActived(".panGL")}}>
                    Главная
                </Link>
                <Link className={main.nav_i+" panNew"} id={main.nav_i} to="news" onClick={() => {setActived(".panNew")}}>
                    Объявления
                </Link>
                <a className={main.nav_i+" panCon"} id={main.nav_i} onClick={() => {setActived(".panCon")}}>
                    Контакты
                </a>
                <a className={main.nav_i+" panSch"} id={main.nav_i} onClick={() => {setActived(".panSch")}}>
                    Школам
                </a>
                <a className={main.nav_i+" panTea"} id={main.nav_i} onClick={() => {setActived(".panTea")}}>
                    Педагогам
                </a>
                <a className={main.nav_i+" panPar"} id={main.nav_i} onClick={() => {setActived(".panPar")}}>
                    Родителям
                </a>
                <a className={main.nav_i+" panKid"} id={main.nav_i} onClick={() => {setActived(".panKid")}}>
                    Учащимся
                </a>
            </nav>
            <Outlet />
            <div className={main.warne+" warnew"} id={main.warnew}>
                <img src={warn} className={main.warnimg} alt=""/>Внимание! <p>Неверный логин или пароль</p>
            </div>
            <div className={main.warne+" warnev"} id={main.warnev}>
                <img src={warn} className={main.warnimg} alt=""/>Внимание! <p>Допустимы только латинница и цифры</p>
            </div>
            <div className={main.warne+" warner"} id={main.warner}>
                <img src={warn} className={main.warnimg} alt=""/>Внимание! <p id="wt">Допустимы только латинница и цифры</p>
            </div>
            <div className={main.switcher}>
                <label className={main.switch}>
                    <input className={main.inp_sw} type="checkbox" checked={themeCheckBoxState ? "checked" : ""} onChange={() => {dispatch(changeTheme(themeCheckBoxState))}}/>
                    <span className={main.slider}></span>
                </label>
                <div className={main.lab_sw}>
                    Тема: {themeState}
                </div>
            </div>
        </>
    )
}
export default Main;