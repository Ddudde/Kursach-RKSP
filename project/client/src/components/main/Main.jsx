import React, {useEffect, useRef} from "react";
import mainCSS from './main.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {states, themes} from "../../store/selector";
import {CHANGE_EVENTS_STEP, changeEvents, changeState, changeTheme} from "../../store/actions";
import * as def from "./default";
import profd from "../../media/profd.png";
import profl from "../../media/profl.png";
import mapd from "../../media/Map_symbolD.png";
import mapl from "../../media/Map_symbolL.png";
import Events from "../other/events/Events";

let act, cStateInfo, dispatch, themeInfo;
act = ".panGL";
export let thP = {
    true: {
        c: "theme_light",
        p: "theme_dark",
        params: {
            "--bgcV1": "#DBDBDBe6",
            "--bgcV2": "#242424e6",
            "--bgcV3": "#000000b3",
            "--shdV1": "#fff",
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
            "--shdV1": "#000",
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
    return fun ?
        <div className={mainCSS.nav_i+" "+cl+" "+(dopClass ? dopClass : "")} id={mainCSS.nav_i} onClick={fun}>
            {name}
        </div>
    :
        <Link className={mainCSS.nav_i+" "+cl+" "+(dopClass ? dopClass : "")} id={mainCSS.nav_i} to={link} onClick={() => {setActived("."+cl)}}>
            {name}
        </Link>;
}

function getLogin() {
    return (
        <div className={mainCSS.logBlock}>
            <div className={mainCSS.nav_i+' '+mainCSS.log} id={mainCSS.nav_i}>
                <img alt="ico" src={'/media/ls-icon'+ cStateInfo.ico +'.png'}/>
                <div className={mainCSS.logLog}>{cStateInfo.login}</div>
                <div className={mainCSS.logText}>Я - {cStateInfo.roleDesc}</div>
            </div>
            <div className={mainCSS.logMenu}>
                {getPan("Профиль", "Pro", "profiles", mainCSS.logMenuBlock)}
                {cStateInfo.roles && getPan("Сменить роль", "Rol", "", mainCSS.logMenuBlock,() => {chRoles()})}
                {getPan("Настройки", "Set", "settings", mainCSS.logMenuBlock)}
                {getPan("Выход", "Exi", "", mainCSS.logMenuBlock,() => {onExit()})}
            </div>
        </div>
    )
}

function getKids() {
    return (
        <div className={mainCSS.logBlock}>
            <div className={mainCSS.nav_i+' '+mainCSS.kidEl} id={mainCSS.nav_i}>
                <img className={mainCSS.kidImg} src={themeInfo.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                <div className={mainCSS.kidInf}>Информация о:</div>
                <div className={mainCSS.kidText}>{cStateInfo.kids[cStateInfo.kid]}</div>
                <img className={mainCSS.mapImg} src={themeInfo.theme_ch ? mapd : mapl} title="Перейти в профиль" alt=""/>
            </div>
            <div className={mainCSS.logMenu}>
                {cStateInfo.kids && Object.getOwnPropertyNames(cStateInfo.kids).map(param1 =>
                    <div className={mainCSS.nav_i+' '+mainCSS.log+' '+mainCSS.kidBlock} id={mainCSS.nav_i} onClick={() => (dispatch(changeState("kid", param1)))}>
                        <img className={mainCSS.kidImg} src={themeInfo.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                        <div className={mainCSS.kidInf}>Информация о:</div>
                        <div className={mainCSS.kidText}>{cStateInfo.kids[param1]}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

function chRoles() {
    let r = cStateInfo.role;
    r++;
    if(r > 4) r = 0;
    dispatch(changeState("role", r));
}

function onExit() {
    dispatch(changeState("auth", !cStateInfo.auth));
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
    Object.getOwnPropertyNames(thP[stat].params).map(param =>
        document.documentElement.style.setProperty(param, thP[stat].params[param])
    );
}

export function Main() {
    themeInfo = useSelector(themes);
    cStateInfo = useSelector(states);
    const isFirstUpdate = useRef(true);
    dispatch = useDispatch();
    useEffect(() => {
        console.log("I was triggered during componentDidMount Main.jsx");
        def.ini();
        ini(themeInfo.theme_ch);
        dispatch(changeEvents(CHANGE_EVENTS_STEP, 1));
        return function() {
            dispatch(changeEvents(CHANGE_EVENTS_STEP, -1));
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
            <div className={mainCSS.fon}>
                <div/>
                <div/>
            </div>
            <nav className={mainCSS.panel} id="her">
                {!cStateInfo.auth && getPan("Главная", "GL", "/")}
                {getPan("Объявления", "New", "news")}
                {getPan("Контакты", "Con", "contacts")}
                {getPan("Люди", "Pep", "people")}
                {(!cStateInfo.auth || (cStateInfo.auth && cStateInfo.role == 3)) && getPan("Школам", "Sch", "tutor/sch")}
                {(!cStateInfo.auth || (cStateInfo.auth && cStateInfo.role == 2)) && getPan("Педагогам", "Tea", "tutor/tea")}
                {(!cStateInfo.auth || (cStateInfo.auth && cStateInfo.role == 1)) && getPan("Родителям", "Par", "tutor/par")}
                {(!cStateInfo.auth || (cStateInfo.auth && cStateInfo.role == 0)) && getPan("Обучающимся", "Kid", "tutor/kid")}
                {(cStateInfo.auth && cStateInfo.role == 2) && getPan("Расписание", "Ras", "/")}
                {(cStateInfo.auth && cStateInfo.role == 2) && getPan("Журнал", "Jur", "journal")}
                {(cStateInfo.auth && cStateInfo.role == 3) && getPan("Администрирование УО", "Ana", "admYO")}
                {(cStateInfo.auth && cStateInfo.role == 4) && getPan("Заявки", "Req", "request")}
                {(cStateInfo.auth && cStateInfo.role < 2) && getPan("Дневник", "Dnev", "/")}
                {(cStateInfo.auth && cStateInfo.role < 2) && getPan("Аналитика", "Ana", "analytics")}
                {cStateInfo.auth && getLogin()}
                {(cStateInfo.auth && cStateInfo.role == 1) && getKids()}
            </nav>
            <Outlet/>
            <Events/>
            <div className={mainCSS.switcher}>
                <label className={mainCSS.switch}>
                    <input className={mainCSS.inp_sw} type="checkbox" checked={themeInfo.theme_ch ? "checked" : ""} onChange={() => {dispatch(changeTheme(themeInfo.theme_ch))}}/>
                    <span className={mainCSS.slider}/>
                </label>
                <div className={mainCSS.lab_sw}>
                    Тема: {themeInfo.theme}
                </div>
            </div>
        </>
    )
}
export default Main;