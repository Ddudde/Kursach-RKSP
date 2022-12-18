import React, {useEffect, useRef} from "react";
import warn from '../../media/warning.png';
import main from './main.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {states, themes} from "../../store/selector";
import {changeTheme} from "../../store/actions";
import * as def from "./default";

let act = ".panGL", elems = 0, cState;

function getPan(name, namecl, link, inc, dopClass) {
    if(!inc) elems++;
    let cl = "pan" + namecl;
    return (
        <Link className={main.nav_i+" "+cl+" "+(dopClass ? dopClass : "")} id={main.nav_i} to={link} onClick={() => {setActived("."+cl)}}>
            {name}
        </Link>
    )
}

function getLogin(login, ico, desc) {
    elems++;
    return (
        <div className={main.logBlock}>
            <div className={main.nav_i+' '+main.log} id={main.nav_i}>
                <img alt="ico" src={'/media/ls-icon'+ ico +'.png'}/>
                <div className={main.logLog}>{login}</div>
                <div className={main.logText}>Я - {desc}</div>
            </div>
            <div className={main.logMenu}>
                {getPan("Профиль", "Pro", "profiles", true, main.logMenuBlock)}
                {cState.roles && getPan("Сменить роль", "Rol", "start", true, main.logMenuBlock)}
                {getPan("Настройки", "Set", "start", true, main.logMenuBlock)}
                {getPan("Выход", "Exi", "start", true, main.logMenuBlock)}
            </div>
        </div>
    )
}

export function setActived(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

export function Main() {
    const theme = useSelector(themes);
    cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Main.jsx");
        def.ini();
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
        elems = 0;
        console.log('componentDidUpdate Main.jsx');
    });
    return (
        <>
            <div className={main.fon}>
                <div/>
                <div/>
            </div>
            <nav className={main.panel} style={{gridTemplate: "auto/repeat("+elems+",1fr)"}} id="her">
                {!cState.auth && getPan("Главная", "GL", "/")}
                {getPan("Объявления", "New", "news")}
                {getPan("Контакты", "Con", "contacts")}
                {getPan("Люди", "Pep", "people")}
                {(!cState.auth || (cState.auth && cState.role == 3)) && getPan("Школам", "Sch", "start")}
                {(!cState.auth || (cState.auth && cState.role == 2)) && getPan("Педагогам", "Tea", "start")}
                {(!cState.auth || (cState.auth && cState.role == 1)) && getPan("Родителям", "Par", "start")}
                {(cState.auth && cState.role == 0) && getPan("Дневник", "Dnev", "/")}
                {(cState.auth && cState.role == 0) && getPan("Аналитика", "Ana", "analytics")}
                {(!cState.auth || (cState.auth && cState.role == 0)) && getPan("Обучающимся", "Kid", "start")}
                {cState.auth && getLogin(cState.login, cState.ico, cState.roleDesc)}
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
                    <input className={main.inp_sw} type="checkbox" checked={theme.theme_ch ? "checked" : ""} onChange={() => {dispatch(changeTheme(theme.theme_ch))}}/>
                    <span className={main.slider}></span>
                </label>
                <div className={main.lab_sw}>
                    Тема: {theme.theme}
                </div>
            </div>
        </>
    )
}
export default Main;