import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import settingsCSS from './settings.module.css';
import {checkbox, states} from "../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {changeState} from "../../store/actions";
import ran from "../../media/random.png";
import button from "../button.module.css";
import CheckBox from "../checkBox/CheckBox";
import ls1 from "../../media/ls-icon1.png";
import ls2 from "../../media/ls-icon2.png";
import ls3 from "../../media/ls-icon3.png";

let checkBoxInfo, dispatch, warner, npasinp, powpasinp, oldPasSt = true, zambut, zambut1, ob = false, sb = false, nb = false, pb = false;

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
    let par = e.target.parentElement, field = par.querySelector("." + settingsCSS.field), blockPass = par.querySelector("." + settingsCSS.blockPass);
    field.setAttribute('data-act', '0');
    blockPass.setAttribute('data-act', '1');
}

function onChSt(e) {
    let par = e.target.parentElement.parentElement, old = par.querySelector("#old"), sec = par.querySelector("#sec");
    oldPasSt = !oldPasSt;
    oldPasSt ? chStatOb({target:par.querySelector("#oldinp")}) : chStatSb({target:par.querySelector("#secinp")});
    old.setAttribute('data-act', oldPasSt ? '1' : '0');
    sec.setAttribute('data-act', oldPasSt ? '0' : '1');
}

function onClosePas(e) {
    let par = e.target.parentElement.parentElement.parentElement, chPass = par.querySelector("." + settingsCSS.chPass), blockPass = par.querySelector("." + settingsCSS.blockPass);
    chPass.setAttribute('data-act', '1');
    blockPass.setAttribute('data-act', '0');
    warner.style.display = "none";
}

function chStatOb(e) {
    let el = e.target;
    ob = (el ? !el.validity.patternMismatch && el.value.length != 0 : false);
    zambut.setAttribute("data-enable", +(((oldPasSt ? ob : sb) & nb & pb) || false));
}

function chStatSb(e) {
    let el = e.target;
    sb = (el ? el.value.length != 0 : false);
    zambut.setAttribute("data-enable", +(((oldPasSt ? ob : sb) & nb & pb) || false));
}

function chStatNb(e) {
    let el = e.target;
    nb = (el ? !el.validity.patternMismatch && el.value.length != 0 : false);
    zambut.setAttribute("data-enable", +(((oldPasSt ? ob : sb) & nb & pb) || false));
}

function chStatPb(e) {
    let el = e.target;
    pb = (el ? !el.validity.patternMismatch && el.value.length != 0 : false);
    zambut.setAttribute("data-enable", +(((oldPasSt ? ob : sb) & nb & pb) || false));
}

function onClosePasAva(e) {
    let par = e.target.parentElement, chPass = par.parentElement.querySelector("." + settingsCSS.chPass);
    chPass.setAttribute('data-act', '1');
    par.setAttribute('data-act', '0');
    warner.style.display = "none";
}

function chStatAv1(e) {
    e.target.firstChild.checked = true;
    dispatch(changeState("ico", 1));
}

function chStatAv2(e) {
    e.target.firstChild.checked = true;
    dispatch(changeState("ico", 2));
}

function chStatAv3(e) {
    e.target.firstChild.checked = true;
    dispatch(changeState("ico", 3));
}

function chStatSb1(e) {
    let el = e.target;
    zambut1.setAttribute("data-enable", +(el ? el.value.length != 0 : false));
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

export function Settings() {
    checkBoxInfo = useSelector(checkbox);
    dispatch = useDispatch();
    const cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Settings.jsx");
        warner = document.getElementsByClassName("warner")[0];
        npasinp = document.querySelector("#npasinp");
        powpasinp = document.querySelector("#powpasinp");
        document.querySelector("#oldinp").addEventListener('input', inpchr);
        npasinp.addEventListener('input', inpchr);
        powpasinp.addEventListener('input', inpchr);
        zambut = document.getElementsByClassName(settingsCSS.butL)[0];
        zambut1 = document.getElementsByClassName(settingsCSS.butL)[1];
        document.querySelector("#ch" + cState.ico).checked = true;
        return function() {
            console.log("I was triggered during componentWillUnmount Settings.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Settings.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Настройки</title>
            </Helmet>
            <div className={settingsCSS.AppHeader}>
                <div className={settingsCSS.blockPro}>
                    <div className={settingsCSS.pro}>
                        <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                            <CheckBox text={"Включить уведомления"} checkbox_id={"checkbox_notify"}/>
                        </div>
                        <div className={settingsCSS.nav_iZag+" "+settingsCSS.blockNotif} data-act={(checkBoxInfo.checkbox_notify || false) ? '1' : '0'}>
                            {(cState.role < 3) && <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                                <CheckBox text={"Уведомления о изменении в расписании"} checkbox_id={"checkbox_notify_sched"}/>
                            </div>}
                            {(cState.role < 2) && <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                                <CheckBox text={"Уведомления о новых оценках"} checkbox_id={"checkbox_notify_marks"}/>
                            </div>}
                            {(cState.role < 3) && <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                                <CheckBox text={"Присылать новые объявления учебного центра"} checkbox_id={"checkbox_notify_yo"}/>
                            </div>}
                            {(cState.role < 4) && <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                                <CheckBox text={"Присылать новые объявления портала"} checkbox_id={"checkbox_notify_por"}/>
                            </div>}
                            {(cState.role == 4) && <div className={settingsCSS.nav_i} id={settingsCSS.nav_i}>
                                <CheckBox text={"Присылать уведомления о новых заявках школ"} checkbox_id={"checkbox_notify_new_sch"}/>
                            </div>}
                        </div>
                        <div className={settingsCSS.nav_iZag}>
                            <div className={settingsCSS.nav_i+" "+settingsCSS.chPass+" "+settingsCSS.field} id={settingsCSS.nav_i} data-act='1' onClick={onEditPass}>
                                Сменить пароль
                            </div>
                            <div className={settingsCSS.blockPass} data-act='0'>
                                <div className={settingsCSS.nPasBlock}>
                                    <div className={settingsCSS.oPasBlock} id="old" data-act='1'>
                                        <input className={settingsCSS.inp+" "+settingsCSS.inpPass+" "+settingsCSS.nPass} onChange={chStatOb} id="oldinp" placeholder="Старый пароль" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                        <div className={settingsCSS.but+' '+button.button} onClick={onChSt}>
                                            <div className={settingsCSS.tex}>Забыл пароль?</div>
                                        </div>
                                    </div>
                                    <div className={settingsCSS.oPasBlock} id="sec" data-act='0'>
                                        <input className={settingsCSS.inp+" "+settingsCSS.inpPass+" "+settingsCSS.nPass} onChange={chStatSb} id="secinp" placeholder="Секретная фраза" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                        <div className={settingsCSS.but+' '+button.button} onClick={onChSt}>
                                            <div className={settingsCSS.tex}>Вспомнил пароль</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={settingsCSS.nPasBlock}>
                                    <input className={settingsCSS.inp+" "+settingsCSS.inpPass+" "+settingsCSS.nPass} onChange={chStatNb} id="npasinp" placeholder="Новый пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                                    <div className={settingsCSS.but+' '+button.button} onClick={gen_pas}>
                                        <img src={ran} className={settingsCSS.randimg} alt=""/>
                                        <div className={settingsCSS.tex}>Случайный пароль</div>
                                    </div>
                                </div>
                                <input className={settingsCSS.inp+" "+settingsCSS.inpPass} id="powpasinp" onChange={chStatPb} placeholder="Повторите пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                                <div className={settingsCSS.blockKnops}>
                                    <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butL} data-enable={"0"} onClick={onClosePas}>
                                        <div className={settingsCSS.tex}>Замена!</div>
                                    </div>
                                    <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butR} onClick={onClosePas}>
                                        <div className={settingsCSS.tex}>Отменить</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={settingsCSS.nav_iZag}>
                            <div className={settingsCSS.nav_i+" "+settingsCSS.chPass+" "+settingsCSS.field} id={settingsCSS.nav_i} data-act='1' onClick={onEditPass}>
                                Сменить аватар
                            </div>
                            <div className={settingsCSS.blockPass} data-act='0'>
                                <div className={settingsCSS.logo}>
                                    <p style={{marginBlock: "0.5vw"}}>Выберите аватар для профиля:</p>
                                    <div className={settingsCSS.blockAva} onClick={chStatAv1}>
                                        <input id="ch1" name="ico" type="radio" value="1"/>
                                        <img className={settingsCSS.logoi} src={ls1} alt=""/>
                                    </div>
                                    <div className={settingsCSS.blockAva} onClick={chStatAv2}>
                                        <input id="ch2" name="ico" type="radio" value="2"/>
                                        <img className={settingsCSS.logoi} src={ls2} alt=""/>
                                    </div>
                                    <div className={settingsCSS.blockAva} onClick={chStatAv3}>
                                        <input id="ch3" name="ico" type="radio" value="3"/>
                                        <img className={settingsCSS.logoi} src={ls3} alt=""/>
                                    </div>
                                </div>
                                <div className={settingsCSS.but+' '+button.button} style={{width:"fit-content"}} onClick={onClosePasAva}>
                                    <div className={settingsCSS.tex}>Закрыть меню выбора</div>
                                </div>
                            </div>
                        </div>
                        <div className={settingsCSS.nav_iZag}>
                            <div className={settingsCSS.nav_i+" "+settingsCSS.chPass+" "+settingsCSS.field} id={settingsCSS.nav_i} data-act='1' onClick={onEditPass}>
                                {cState.secFr? "Изменить" : "Добавить"} секретную фразу
                            </div>
                            <div className={settingsCSS.blockPass} data-act='0'>
                                <input className={settingsCSS.inp+" "+settingsCSS.inpPass} onChange={chStatSb1} id="secinp" placeholder="Секретная фраза" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                <div className={settingsCSS.blockKnops}>
                                    <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butL} data-enable={"0"} onClick={onClosePas}>
                                        <div className={settingsCSS.tex}>Замена!</div>
                                    </div>
                                    <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butR} onClick={onClosePas}>
                                        <div className={settingsCSS.tex}>Отменить</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Settings;