import React, {useEffect, useRef} from "react";
import {useParams} from "react-router-dom"
import {Helmet} from "react-helmet-async";
import profileCSS from './profile.module.css';
import warn from '../../../media/warn_big.png';
import {profiles, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import ed from "../../../media/edit.png";
import profd from "../../../media/profd.png";
import profl from "../../../media/profl.png";
import {changeProfile, changeProfileRoles, changeState} from "../../../store/actions";
import {setActived} from "../Main";

let profilesInfo, dispatch, warner, moore;

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
        warner.style.display = "inline";
    } else {
        dat.style.outline = "none black";
        warner.style.display = "none";
    }
}

function onEdit(e) {
    let par = e.target.parentElement, field = par.querySelector("." + profileCSS.field), inp = par.querySelector("." + profileCSS.inp);
    field.setAttribute('data-act', '0');
    inp.setAttribute('data-act', '1');
}

function onFin(e) {
    let par = e.target.parentElement, inp = par.querySelector("." + profileCSS.inp), field = par.querySelector("." + profileCSS.field);
    if(inp.tagName == "TEXTAREA")
    {
        dispatch(changeProfile("more", inp.value));
        field.setAttribute('data-act', '1');
        inp.setAttribute('data-act', '0');
    } else {
        if ((inp.type == "email" ? inp.validity.typeMismatch : inp.validity.patternMismatch) || inp.value.length == 0) {
            inp.style.animation = "but 1s ease infinite";
            setTimeout(function () {
                inp.style.animation = "none"
            }, 1000)
            inp.style.outline = "solid red";
            warner.style.display = "inline";
        } else {
            inp.style.outline = "none black";
            warner.style.display = "none";
            if (inp.type == "email") {
                dispatch(changeProfileRoles(e.target.getAttribute('data-id'), "email", inp.value));
            } else {
                dispatch(changeState("login", inp.value));
                dispatch(changeProfile("login", inp.value));
            }
            field.setAttribute('data-act', '1');
            inp.setAttribute('data-act', '0');
        }
    }
}

function onClose(e) {
    let par = e.target.parentElement, field = par.querySelector("." + profileCSS.field), inp = par.querySelector("." + profileCSS.inp);
    field.setAttribute('data-act', '1');
    inp.setAttribute('data-act', '0');
    warner.style.display = "none";
}

function chStatB(e) {
    let el = e.target, b = el.tagName == "TEXTAREA" ? true : (el.tagName == "TEXTAREA" ? true : (el.type == "email" ? !el.validity.typeMismatch : !el.validity.patternMismatch));
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +(el ? b && el.value.length != 0 : false));
}

export function Profile() {
    profilesInfo = useSelector(profiles);
    const { log } = useParams();
    const themeState = useSelector(themes);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        setActived(".panPro");
        console.log("I was triggered during componentDidMount Profile.jsx");
        warner = document.getElementsByClassName("warner")[0];
        document.querySelector("#loginp").addEventListener('input', inpchr);
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
        <>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <div className={profileCSS.AppHeader}>
                {Object.getOwnPropertyNames(profilesInfo).length == 0 ?
                    <div className={profileCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={profileCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={profileCSS.blockPro}>
                        <div className={profileCSS.pro}>
                            <img alt="ico" src={'/media/ls-icon'+ profilesInfo.ico +'.png'}/>
                            <div className={profileCSS.inf}>
                                <span className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                    <div className={profileCSS.nav_i+" "+profileCSS.nav_iZag1} id={profileCSS.nav_i}>
                                        <div className={profileCSS.preinf}>
                                            Логин:
                                        </div>
                                        <div className={profileCSS.field} data-act='1'>
                                            {profilesInfo.login}
                                        </div>
                                        <input className={profileCSS.inp} id="loginp" onChange={chStatB} defaultValue={profilesInfo.login} type="text" pattern="^[a-zA-Z0-9]+$" data-act='0'/>
                                        <img className={profileCSS.imginp+" yes"} src={yes} onClick={onFin} title="Подтвердить изменения" alt=""/>
                                        <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    </div>
                                </span>
                                <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                    ФИО: {profilesInfo.fio}
                                </div>
                                <span className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                    <div className={profileCSS.nav_i+" "+profileCSS.nav_iZag1} id={profileCSS.nav_i}>
                                        <div className={profileCSS.preinf}>
                                            Дополнительная информация:
                                        </div>
                                        <pre className={profileCSS.field} data-act='1'>
                                            {profilesInfo.more}
                                        </pre>
                                        <textarea className={profileCSS.inp+" "+profileCSS.inparea} onChange={chStatB} defaultValue={profilesInfo.more ? profilesInfo.more : moore} data-act='0'/>
                                        <img className={profileCSS.imginp+" yes"} src={yes} onClick={onFin} title="Подтвердить изменения" alt=""/>
                                        <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    </div>
                                </span>
                                {Object.getOwnPropertyNames(profilesInfo.roles).map(param =>
                                    <div className={profileCSS.nav_iZag}>
                                        <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Роль: {profilesInfo.roles[param].roleDesc}
                                        </div>
                                        {profilesInfo.roles[param].yo && <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Учебная организация: {profilesInfo.roles[param].yo}
                                        </div>}
                                        <span className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            <div className={profileCSS.nav_i+" "+profileCSS.nav_iZag1} id={profileCSS.nav_i}>
                                                <div className={profileCSS.preinf}>
                                                    Почта:
                                                </div>
                                                <div className={profileCSS.field} data-act='1'>
                                                    {profilesInfo.roles[param].email}
                                                </div>
                                                <input className={profileCSS.inp} onChange={chStatB} defaultValue={profilesInfo.roles[param].email} type="email" data-act='0'/>
                                                <img className={profileCSS.imginp+" yes"} src={yes} onClick={onFin} title="Подтвердить изменения" data-id={param} alt=""/>
                                                <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                                <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                            </div>
                                        </span>
                                        {profilesInfo.roles[param].group && <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                            Класс: {profilesInfo.roles[param].group}
                                        </div>}
                                        {profilesInfo.roles[param].parents && <>
                                            <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                                Родители:
                                            </div>
                                            <div className={profileCSS.nav_iZag}>
                                                {Object.getOwnPropertyNames(profilesInfo.roles[param].parents).map(param1 => <div>
                                                    <div className={profileCSS.nav_i+" "+profileCSS.preinf} id={profileCSS.nav_i}>
                                                        {profilesInfo.roles[param].parents[param1]}
                                                    </div>
                                                    <img className={profileCSS.proImg} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                                </div>)}
                                            </div>
                                        </>}
                                        {profilesInfo.roles[param].kids && <>
                                            <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                                Дети:
                                            </div>
                                            <div className={profileCSS.nav_iZag}>
                                                {Object.getOwnPropertyNames(profilesInfo.roles[param].kids).map(param1 => <div>
                                                    <div className={profileCSS.nav_i+" "+profileCSS.preinf} id={profileCSS.nav_i}>
                                                        {profilesInfo.roles[param].kids[param1]}
                                                    </div>
                                                    <img className={profileCSS.proImg} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                                </div>)}
                                            </div>
                                        </>}
                                        {profilesInfo.roles[param].lessons && <>
                                            <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                                Дисциплины:
                                            </div>
                                            <div className={profileCSS.nav_iZag}>
                                                {profilesInfo.roles[param].lessons.map(param1 =>
                                                    <div className={profileCSS.nav_i} id={profileCSS.nav_i}>
                                                        {param1}
                                                    </div>
                                                )}
                                            </div>
                                        </>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default Profile;