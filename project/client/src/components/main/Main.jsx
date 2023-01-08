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
import mapd from "../../media/Map_symbolD.png";
import mapl from "../../media/Map_symbolL.png";

let act, cState, dispatch, theme;
act = ".panGL";
export let thP = {
    true: {
        c: "theme_light",
        p: "theme_dark",
        params: {
            "--bgcV1": "#DBDBDBe6",
            "--bgcV2": "#242424e6",
            "--bgcV3": "#000000b3",
            "--cV1": "#006600",
            "--cV2": "#009900",
            "--cV3": "#090a0b",
            "--bcV1": "#4d4d4d",
            "--bcV2": "#090a0b",
        }
    },
    false: {
        c: "theme_dark",
        p: "theme_light",
        params: {
            "--bgcV1": "#242424e6",
            "--bgcV2": "#DBDBDBe6",
            "--bgcV3": "#0000004d",
            "--cV1": "#009900",
            "--cV2": "#00bb00",
            "--cV3": "#f5f6f7",
            "--bcV1": "#b3b3b3",
            "--bcV2": "#f5f6f7",
        }
    }
}

function getPan(name, namecl, link, dopClass, fun) {
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
    return (
        <div className={main.logBlock}>
            <div className={main.nav_i+' '+main.log} id={main.nav_i}>
                <img alt="ico" src={'/media/ls-icon'+ cState.ico +'.png'}/>
                <div className={main.logLog}>{cState.login}</div>
                <div className={main.logText}>Я - {cState.roleDesc}</div>
            </div>
            <div className={main.logMenu}>
                {getPan("Профиль", "Pro", "profiles", main.logMenuBlock)}
                {cState.roles && getPan("Сменить роль", "Rol", "", main.logMenuBlock,() => {chRoles()})}
                {getPan("Настройки", "Set", "settings", main.logMenuBlock)}
                {getPan("Выход", "Exi", "", main.logMenuBlock,() => {onExit()})}
            </div>
        </div>
    )
}

function getKids() {
    return (
        <div className={main.logBlock}>
            <div className={main.nav_i+' '+main.kidEl} id={main.nav_i}>
                <img className={main.kidImg} src={theme.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                <div className={main.kidInf}>Информация о:</div>
                <div className={main.kidText}>{cState.kids[cState.kid]}</div>
                <img className={main.mapImg} src={theme.theme_ch ? mapd : mapl} title="Перейти в профиль" alt=""/>
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

function ini(stat) {
    document.body.setAttribute(thP[stat].c, '');
    if(document.body.hasAttribute(thP[stat].p)) document.body.removeAttribute(thP[stat].p)
    Object.getOwnPropertyNames(thP[stat].params).map((param) =>{
        document.documentElement.style.setProperty(param, thP[stat].params[param]);
    });
}

export function Main() {
    theme = useSelector(themes);
    cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    dispatch = useDispatch();
    useEffect(() => {
        console.log("I was triggered during componentDidMount Main.jsx");
        def.ini();
        ini(theme.theme_ch);
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
                {!cState.auth && getPan("Главная", "GL", "/")}
                {getPan("Объявления", "New", "news")}
                {getPan("Контакты", "Con", "contacts")}
                {getPan("Люди", "Pep", "people")}
                {(!cState.auth || (cState.auth && cState.role == 3)) && getPan("Школам", "Sch", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 2)) && getPan("Педагогам", "Tea", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 1)) && getPan("Родителям", "Par", "tutor")}
                {(!cState.auth || (cState.auth && cState.role == 0)) && getPan("Обучающимся", "Kid", "tutor")}
                {(cState.auth && cState.role == 2) && getPan("Расписание", "Ras", "/")}
                {(cState.auth && cState.role == 2) && getPan("Журнал", "Jur", "journal")}
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