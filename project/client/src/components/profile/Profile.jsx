import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import profileCSS from './profile.module.css';
import warn from '../../media/warn_big.png';
import {profiles, themes} from "../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import yes from "../../media/yes.png";
import no from "../../media/no.png";
import ed from "../../media/edit.png";
import profd from "../../media/profd.png";
import profl from "../../media/profl.png";
import {changeProfile, changeProfileRoles, changeState} from "../../store/actions";
import ran from "../../media/random.png";
import button from "../button.module.css";

let profilesInfo, dispatch, warner, moore, npasinp, powpasinp, oldPasSt = true;

moore = `/*
Можете что-то рассказать о себе
Дополнительные контакты:
	Телефон: 8 800 555 35 35
	ВК: https://vk.com/id
	Телеграмм: https://t.me/id
	e-mail1: fsdfdsfd@ya.ru
	e-mail2: fsdfdsfd2@ya.ru
*/`

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

function onEditPass(e) {
    let par = e.target.parentElement, field = par.querySelector("." + profileCSS.field), blockPass = par.querySelector("." + profileCSS.blockPass);
    field.setAttribute('data-act', '0');
    blockPass.setAttribute('data-act', '1');
}

function onEdit(e) {
    let par = e.target.parentElement, field = par.querySelector("." + profileCSS.field), inp = par.querySelector("." + profileCSS.inp);
    field.setAttribute('data-act', '0');
    inp.setAttribute('data-act', '1');
}

function onFinLog(e) {
    let par = e.target.parentElement, inp = par.querySelector("." + profileCSS.inp), field = par.querySelector("." + profileCSS.field);
    if (inp.validity.patternMismatch || inp.value.length == 0) {
        inp.style.animation = "but 1s ease infinite";
        setTimeout(function () {inp.style.animation = "none"}, 1000)
        inp.style.outline = "solid red";
        warner.style.display = "inline";
    } else {
        inp.style.outline = "none black";
        warner.style.display = "none";
        dispatch(changeState("login", inp.value));
        dispatch(changeProfile("login", inp.value));
        field.setAttribute('data-act', '1');
        inp.setAttribute('data-act', '0');
    }
}

function onFinEm(e) {
    let par = e.target.parentElement, inp = par.querySelector("." + profileCSS.inp), field = par.querySelector("." + profileCSS.field);
    if (inp.validity.typeMismatch || inp.value.length == 0) {
        inp.style.animation = "but 1s ease infinite";
        setTimeout(function () {inp.style.animation = "none"}, 1000)
        inp.style.outline = "solid red";
        warner.style.display = "inline";
    } else {
        inp.style.outline = "none black";
        warner.style.display = "none";
        dispatch(changeProfileRoles(e.target.getAttribute('data-id'), "email", inp.value));
        field.setAttribute('data-act', '1');
        inp.setAttribute('data-act', '0');
    }
}

function onFinMore(e) {
    let par = e.target.parentElement, inp = par.querySelector("." + profileCSS.inp), field = par.querySelector("." + profileCSS.field);
    dispatch(changeProfile("more", inp.value));
    field.setAttribute('data-act', '1');
    inp.setAttribute('data-act', '0');
}

function onClose(e) {
    let par = e.target.parentElement, field = par.querySelector("." + profileCSS.field), inp = par.querySelector("." + profileCSS.field);
    field.setAttribute('data-act', '1');
    inp.setAttribute('data-act', '0');
    warner.style.display = "none";
}

function onChSt(e) {
    let par = e.target.parentElement.parentElement, old = par.querySelector("#old"), sec = par.querySelector("#sec");
    oldPasSt = !oldPasSt;
    old.setAttribute('data-act', oldPasSt ? '1' : '0');
    sec.setAttribute('data-act', oldPasSt ? '0' : '1');
}

function onClosePas(e) {
    let par = e.target.parentElement.parentElement.parentElement, chPass = par.querySelector("." + profileCSS.chPass), blockPass = par.querySelector("." + profileCSS.blockPass);
    chPass.setAttribute('data-act', '1');
    blockPass.setAttribute('data-act', '0');
}

export function gen_pas(){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    npasinp.value = password;
    powpasinp.value = password;
    navigator.clipboard.writeText(password);
    let wt = warner.querySelector("#wt");
    wt.innerHTML = `Сгенерирован пароль: ${password}. Он скопирован в буфер обмена`;
    warner.style.display = "inline";
    setTimeout(function (){
        warner.style.display = "none";
        wt.innerHTML = `Допустимы только латинница и цифры`;
    }, 10000);
}

export function Profile() {
    profilesInfo = useSelector(profiles);
    const themeState = useSelector(themes);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Profile.jsx");
        warner = document.getElementsByClassName("warner")[0];
        npasinp = document.querySelector("#npasinp");
        powpasinp = document.querySelector("#powpasinp");
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
                                        <input className={profileCSS.inp} id="loginp" defaultValue={profilesInfo.login} type="text" pattern="^[a-zA-Z0-9]+$" data-act='0'/>
                                        <img className={profileCSS.imginp} src={yes} onClick={onFinLog} title="Подтвердить изменения" alt=""/>
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
                                        <textarea className={profileCSS.inp+" "+profileCSS.inparea} defaultValue={profilesInfo.more ? profilesInfo.more : moore} data-act='0'/>
                                        <img className={profileCSS.imginp} src={yes} onClick={onFinMore} title="Подтвердить изменения" alt=""/>
                                        <img className={profileCSS.imginp} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        <img className={profileCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                    </div>
                                </span>
                                <div className={profileCSS.nav_iZag}>
                                    <div className={profileCSS.nav_i+" "+profileCSS.chPass+" "+profileCSS.field} id={profileCSS.nav_i} data-act='1' onClick={onEditPass}>
                                        Сменить пароль
                                    </div>
                                    <div className={profileCSS.blockPass} data-act='0'>
                                        <div className={profileCSS.nPasBlock}>
                                            <div className={profileCSS.oPasBlock} id="old" data-act='1'>
                                                <input className={profileCSS.inp+" "+profileCSS.inpPass+" "+profileCSS.nPass} id="oldinp" placeholder="Старый пароль" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                                <div className={profileCSS.but+' '+button.button} onClick={onChSt}>
                                                    <div className={profileCSS.tex}>Забыл пароль?</div>
                                                </div>
                                            </div>
                                            <div className={profileCSS.oPasBlock} id="sec" data-act='0'>
                                                <input className={profileCSS.inp+" "+profileCSS.inpPass+" "+profileCSS.nPass} id="secinp" placeholder="Секретная фраза" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                                <div className={profileCSS.but+' '+button.button} onClick={onChSt}>
                                                    <div className={profileCSS.tex}>Вспомнил пароль</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={profileCSS.nPasBlock}>
                                            <input className={profileCSS.inp+" "+profileCSS.inpPass+" "+profileCSS.nPass} id="npasinp" placeholder="Новый пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                                            <div className={profileCSS.but+' '+button.button} onClick={gen_pas}>
                                                <img src={ran} className={profileCSS.randimg} alt=""/>
                                                <div className={profileCSS.tex}>Случайный пароль</div>
                                            </div>
                                        </div>
                                        <input className={profileCSS.inp+" "+profileCSS.inpPass} id="powpasinp" placeholder="Повторите пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                                        <div className={profileCSS.blockKnops}>
                                            <div className={profileCSS.but+' '+button.button+' '+profileCSS.butL} onClick={onClosePas}>
                                                <div className={profileCSS.tex}>Замена!</div>
                                            </div>
                                            <div className={profileCSS.but+' '+button.button+' '+profileCSS.butR} onClick={onClosePas}>
                                                <div className={profileCSS.tex}>Отменить</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                <input className={profileCSS.inp} defaultValue={profilesInfo.roles[param].email} type="email" data-act='0'/>
                                                <img className={profileCSS.imginp} src={yes} onClick={onFinEm} title="Подтвердить изменения" data-id={param} alt=""/>
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