import React, {useEffect, useRef} from "react";
import {useParams} from "react-router-dom"
import {Helmet} from "react-helmet-async";
import profileCSS from './profile.module.css';
import {profiles, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import ed from "../../../media/edit.png";
import profd from "../../../media/profd.png";
import profl from "../../../media/profl.png";
import {
    CHANGE_PROFILE,
    CHANGE_PROFILE_GL,
    CHANGE_PROFILE_ROLES,
    CHANGE_STATE,
    changeProfile,
    changeState
} from "../../../store/actions";
import {addEvent, send, setActived} from "../Main";
import ErrFound from "../../other/error/ErrFound";

let profilesInfo, dispatch, moore, errText;
errText = "К сожалению, информация не найдена...";

moore = `/*
Можете что-то рассказать о себе
Дополнительные контакты:
	Телефон: 8 800 555 35 35
	ВК: https://vk.com/id
	Телеграмм: https://t.me/id
	e-mail1: fsdfdsfd@ya.ru
	e-mail2: fsdfdsfd2@ya.ru
*/`;

function inpchr(event){
    var dat = event.target;
    if (dat.validity.patternMismatch || dat.value.length == 0) {
        dat.style.animation = "but 1s ease infinite";
        setTimeout(function () {dat.style.animation = "none"}, 1000)
        dat.style.outline = "solid red";
        // warner.style.display = "inline";
    } else {
        dat.style.outline = "none black";
        // warner.style.display = "none";
    }
}

function onEdit(e) {
    let par = e.target.parentElement;
    par.setAttribute('data-mod', '1');
}

function onFin(e, param) {
    let par = e.target.parentElement, inp = par.querySelector("." + profileCSS.inp);
    if(inp.tagName == "TEXTAREA")
    {
        dispatch(changeProfile(CHANGE_PROFILE, "more", inp.value));
        par.setAttribute('data-mod', '0');
    } else {
        if ((inp.type == "email" ? inp.validity.typeMismatch : inp.validity.patternMismatch) || inp.value.length == 0) {
            inp.style.animation = "but 1s ease infinite";
            setTimeout(function () {
                inp.style.animation = "none"
            }, 1000)
            inp.style.outline = "solid red";
            // warner.style.display = "inline";
        } else {
            inp.style.outline = "none black";
            // warner.style.display = "none";
            if (inp.type == "email") {
                dispatch(changeProfile(CHANGE_PROFILE_ROLES, "email", inp.value, param));
                par.setAttribute('data-mod', '0');
            } else {
                let bod = {
                    type: "chLogin",
                    body: {
                        oLogin: profilesInfo.login,
                        nLogin: inp.value
                    }
                };
                const setLog = (data) => {
                    if(data.error == false && data.body.login){
                        dispatch(changeState(CHANGE_STATE, "login", inp.value));
                        dispatch(changeProfile(CHANGE_PROFILE, "login", inp.value));
                        par.setAttribute('data-mod', '0');
                    } else {
                        addEvent("Логин занят, попробуйте изменить", 10);
                    }
                };
                send('POST', JSON.stringify(bod), undefined, setLog);
            }
        }
    }
}

function onClose(e) {
    let par = e.target.parentElement;
    par.setAttribute('data-mod', '0');
    // warner.style.display = "none";
}

function chStatB(e) {
    let el = e.target, b = el.tagName == "TEXTAREA" ? true : (el.tagName == "TEXTAREA" ? true : (el.type == "email" ? !el.validity.typeMismatch : !el.validity.patternMismatch));
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +(el ? b && el.value.length != 0 : false));
}

function setInfo(log) {
    let bod = {
        type: "getProfile",
        body: {
            login: log
        }
    };
    const getProf = (data) => {
        if(data.error == false && data.body.prof){
            dispatch(changeProfile(CHANGE_PROFILE_GL, undefined, data.body.prof));
        }
    };
    send('POST', JSON.stringify(bod), undefined, getProf);
}

export function Profile() {
    profilesInfo = useSelector(profiles);
    const { log } = useParams();
    const cState = useSelector(states);
    const themeState = useSelector(themes);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        setActived(".panPro");
        setInfo(log ? log : cState.login);
        console.log("I was triggered during componentDidMount Profile.jsx");
        if(document.querySelector("#loginp")) document.querySelector("#loginp").addEventListener('input', inpchr);
        return function() {
            console.log("I was triggered during componentWillUnmount Profile.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Profile.jsx');
    });
    return (
        <div className={profileCSS.AppHeader}>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            {Object.getOwnPropertyNames(profilesInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <div className={profileCSS.blockPro}>
                        <div className={profileCSS.pro}>
                            <img alt="ico" src={'/media/ls-icon'+ profilesInfo.ico +'.png'}/>
                            <div className={profileCSS.nav_i} id={profileCSS.nav_i} data-mod='0'>
                                <div className={profileCSS.preinf}>
                                    Логин:
                                </div>
                                <div className={profileCSS.field}>
                                    {profilesInfo.login}
                                </div>
                                <input className={profileCSS.inp} id="loginp" onChange={chStatB} defaultValue={profilesInfo.login} type="text" pattern="^[a-zA-Z0-9]+$"/>
                                <img className={profileCSS.imginp+" yes"} src={yes} onClick={onFin} title="Подтвердить изменения" alt=""/>
                                <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            </div>
                            <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                ФИО: {profilesInfo.fio}
                            </div>
                            <div className={profileCSS.nav_i} id={profileCSS.nav_i} data-mod='0'>
                                <div className={profileCSS.preinf}>
                                    Дополнительная информация:
                                </div>
                                <pre className={profileCSS.field}>
                                    {profilesInfo.more}
                                </pre>
                                <textarea className={profileCSS.inp+" "+profileCSS.inparea} onChange={chStatB} defaultValue={profilesInfo.more ? profilesInfo.more : moore}/>
                                <img className={profileCSS.imginp+" yes"} src={yes} onClick={onFin} title="Подтвердить изменения" alt=""/>
                                <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            </div>
                            {profilesInfo.roles && Object.getOwnPropertyNames(profilesInfo.roles).map((param, i, x, role = profilesInfo.roles[param]) =>
                                <div className={profileCSS.nav_iZag} key={param}>
                                    <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                        Роль: {cState.rolesDescrs[param]}
                                    </div>
                                    {role.yo && <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                        Учебная организация: {role.yo}
                                    </div>}
                                    <div className={profileCSS.nav_i} id={profileCSS.nav_i} data-mod='0'>
                                        <div className={profileCSS.preinf}>
                                            Почта:
                                        </div>
                                        <div className={profileCSS.field}>
                                            {role.email}
                                        </div>
                                        <input className={profileCSS.inp} onChange={chStatB} defaultValue={role.email} type="email"/>
                                        <img className={profileCSS.imginp+" yes"} src={yes} onClick={e => onFin(e, param)} title="Подтвердить изменения" alt=""/>
                                        <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    </div>
                                    {role.group && <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                        Класс: {role.group}
                                    </div>}
                                    {role.parents && <>
                                        <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Родители:
                                        </div>
                                        <div className={profileCSS.nav_iZag}>
                                            {Object.getOwnPropertyNames(role.parents).map(param1 => <div key={param1}>
                                                <div className={profileCSS.nav_i+" "+profileCSS.preinf} id={profileCSS.nav_i}>
                                                    {role.parents[param1]}
                                                </div>
                                                <img className={profileCSS.proImg} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                            </div>)}
                                        </div>
                                    </>}
                                    {role.kids && <>
                                        <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Дети:
                                        </div>
                                        <div className={profileCSS.nav_iZag}>
                                            {Object.getOwnPropertyNames(role.kids).map(param1 => <div key={param1}>
                                                <div className={profileCSS.nav_i+" "+profileCSS.preinf} id={profileCSS.nav_i}>
                                                    {role.kids[param1]}
                                                </div>
                                                <img className={profileCSS.proImg} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                            </div>)}
                                        </div>
                                    </>}
                                    {role.lessons && <>
                                        <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Дисциплины:
                                        </div>
                                        <div className={profileCSS.nav_iZag}>
                                            {role.lessons.map(param1 =>
                                                <div className={profileCSS.nav_i} id={profileCSS.nav_i} key={param1}>
                                                    {param1}
                                                </div>
                                            )}
                                        </div>
                                    </>}
                                </div>
                            )}
                        </div>
                    </div>
            }
        </div>
    )
}
export default Profile;