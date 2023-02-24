import React, {useEffect, useRef} from "react";
import mainCSS from './main.module.css';
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {states, themes} from "../../store/selector";
import {CHANGE_EVENTS_STEP, CHANGE_STATE, changeEvents, changeState, changeTheme} from "../../store/actions";
import profd from "../../media/profd.png";
import profl from "../../media/profl.png";
import mapd from "../../media/Map_symbolD.png";
import mapl from "../../media/Map_symbolL.png";
import up from "../../media/up.png";
import Events from "../other/events/Events";

let act, cStateInfo, dispatch, themeInfo, scrolling, timid, d1;
scrolling = false;
act = ".panGL";

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
                {cStateInfo.roles && getPan("Сменить роль", "Rol", "", mainCSS.logMenuBlock,chRoles)}
                {getPan("Настройки", "Set", "settings", mainCSS.logMenuBlock)}
                {getPan("Выход", "Exi", "", mainCSS.logMenuBlock,onExit)}
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
                    <div className={mainCSS.nav_i+' '+mainCSS.log+' '+mainCSS.kidBlock} id={mainCSS.nav_i} onClick={() => (dispatch(changeState(CHANGE_STATE, "kid", param1)))}>
                        <img className={mainCSS.kidImg} src={themeInfo.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                        <div className={mainCSS.kidInf}>Информация о:</div>
                        <div className={mainCSS.kidText}>{cStateInfo.kids[param1]}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export function send(type, bod, url, fun) {
    let sed = {
        method: type//'PUT', 'GET', 'DELETE', 'POST'
    };
    if(bod){
        sed.headers = {
            'Content-Type': 'application/json'
        };
        sed.body = bod;
    }
    fetch("http://localhost:8080/cts/"+(url ? url : ""), sed)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${res.status}`
                );
            }
            console.log(type + "!!!st");
            return res.json();
        })
        .then((repos) => {
            console.log(type + "!!!");
            if(fun) fun(repos);
            // dispatch(changeCL(repos));
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function chRoles() {
    let r = cStateInfo.role;
    r++;
    if(r > 4) r = 0;
    dispatch(changeState(CHANGE_STATE, "role", r));
}

function onExit() {
    dispatch(changeState(CHANGE_STATE, "auth", !cStateInfo.auth));
}

export function setActived(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

function iniTheme(stat) {
    document.body.setAttribute(themeInfo.thP[stat].c, '');
    if(document.body.hasAttribute(themeInfo.thP[stat].p)) document.body.removeAttribute(themeInfo.thP[stat].p)
    Object.getOwnPropertyNames(themeInfo.thP[stat].params).map(param =>
        document.documentElement.style.setProperty(param, themeInfo.thP[stat].params[param])
    );
}

function scr() {
    if (window.pageYOffset >= window.innerHeight * 0.5)
        d1.style.display = "block";
    else
        d1.style.display = "none";
}

function tim() {
    if (scrolling) {
        scrolling = false;
        scr();
    }
}

function onTop(e){
    window.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
    });
}

export function Main() {
    themeInfo = useSelector(themes);
    cStateInfo = useSelector(states);
    const isFirstUpdate = useRef(true);
    dispatch = useDispatch();
    useEffect(() => {
        console.log("I was triggered during componentDidMount Main.jsx");
        scr();
        iniTheme(themeInfo.theme_ch);
        window.onscroll = () => {
            if(!scrolling) {
                scrolling = true;
                timid = setTimeout(tim,300);
            }
        };
        dispatch(changeEvents(CHANGE_EVENTS_STEP, 1));
        // send('GET');
        // send('POST', JSON.stringify({id: 25, login: "nm1", password: "1111", fio: "Петров В.В.", roles: {3:{yo: 4, group: 1}}}));
        // send('PUT', JSON.stringify({id: 28, login: "nm1", password: "11111", fio: "Петров 1В.В.", roles: {3:{yo: 4, group: 1}}}), 65);
        //put(14, JSON.stringify({id: 14, name: 'nm127', email: 'm@y.ru7'}))
        return function() {
            window.onwheel = undefined;
            clearTimeout(timid);
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
                    <input className={mainCSS.inp_sw} type="checkbox" checked={themeInfo.theme_ch ? "checked" : ""} onChange={() => {dispatch(changeTheme(themeInfo.theme_ch, themeInfo.thP))}}/>
                    <span className={mainCSS.slider}/>
                </label>
                <div className={mainCSS.lab_sw}>
                    Тема: {themeInfo.theme}
                </div>
            </div>
            <div className={mainCSS.d}>
                © 2020 ООО "Рога и Копыта" Все права защищены. Project on <a href="https://github.com/Ddudde/Kursach-HTML" style={{color: "var(--cV2)"}}>github</a>.
            </div>
            <img className={mainCSS.d1} src={up} title="Вверх" alt="" onClick={onTop} ref={(el)=>d1 = el}/>
        </>
    )
}
export default Main;