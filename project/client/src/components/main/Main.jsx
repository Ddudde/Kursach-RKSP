import React, {useEffect, useRef} from "react";
import warn from '../../media/warning.png';
import main from './main.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {states, themes} from "../../store/selector";
import {changeState, changeTheme} from "../../store/actions";
import * as def from "./default";
import profd from "../../media/profd.png";
import profl from "../../media/profl.png";

let act = ".panGL", elems = 0, cState, dispatch, theme;

function getPan(name, namecl, link, inc, dopClass, fun) {
    if(!inc) elems++;
    let cl = "pan" + namecl;
    return fun ? (
        <div className={main.nav_i+" "+cl+" "+(dopClass ? dopClass : "")} id={main.nav_i} onClick={fun}>
            {name}
        </div>
    ):(
        <Link className={main.nav_i+" "+cl+" "+(dopClass ? dopClass : "")} id={main.nav_i} to={link} onClick={() => {setActived("."+cl)}}>
            {name}
        </Link>
    )
}

function getLogin() {
    elems++;
    return (
        <div className={main.logBlock}>
            <div className={main.nav_i+' '+main.log} id={main.nav_i}>
                <img alt="ico" src={'/media/ls-icon'+ cState.ico +'.png'}/>
                <div className={main.logLog}>{cState.login}</div>
                <div className={main.logText}>Я - {cState.roleDesc}</div>
            </div>
            <div className={main.logMenu}>
                {getPan("Профиль", "Pro", "profiles", true, main.logMenuBlock)}
                {cState.roles && getPan("Сменить роль", "Rol", "", true, main.logMenuBlock,() => {chRoles()})}
                {getPan("Настройки", "Set", "settings", true, main.logMenuBlock)}
                {getPan("Выход", "Exi", "", true, main.logMenuBlock,() => {onExit()})}
            </div>
        </div>
    )
}

function getKids() {
    elems++;
    return (
        <div className={main.logBlock}>
            <div className={main.nav_i+' '+main.log} id={main.nav_i}>
                <img className={main.kidImg} src={theme.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                <div className={main.kidInf}>Информация о:</div>
                <div className={main.kidText}>{cState.kids[cState.kid]}</div>
            </div>
            <div className={main.logMenu}>
                {cState.kids && Object.getOwnPropertyNames(cState.kids).map(param1 =>
                    <div className={main.nav_i+' '+main.log+' '+main.kidBlock} id={main.nav_i} onClick={() => (dispatch(changeState("kid", param1)))}>
                        <img className={main.kidImg} src={theme.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                        <div className={main.kidInf}>Информация о:</div>
                        <div className={main.kidText}>{cState.kids[param1]}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

function chRoles() {
    let r = cState.role;
    r++;
    if(r > 4) r = 0;
    dispatch(changeState("role", r, dispatch, cState.rolesDescrs));
}

function onExit() {
    dispatch(changeState("auth", !cState.auth));
}

export function setActived(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

export function Main() {
    theme = useSelector(themes);
    cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    dispatch = useDispatch();
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
                {(!cState.auth || (cState.auth && cState.role == 3)) && getPan("Школам", "Sch", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 2)) && getPan("Педагогам", "Tea", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 1)) && getPan("Родителям", "Par", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 0)) && getPan("Обучающимся", "Kid", "tutor")}
                {(cState.auth && cState.role < 2) && getPan("Дневник", "Dnev", "/")}
                {(cState.auth && cState.role < 2) && getPan("Аналитика", "Ana", "analytics")}
                {cState.auth && getLogin()}
                {(cState.auth && cState.role == 1) && getKids()}
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