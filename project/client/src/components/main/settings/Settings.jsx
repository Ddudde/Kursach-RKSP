import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import settingsCSS from './settings.module.css';
import {checkbox, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_STATE, changeState} from "../../../store/actions";
import ran from "../../../media/random.png";
import button from "../../button.module.css";
import CheckBox from "../../other/checkBox/CheckBox";
import ls1 from "../../../media/ls-icon1.png";
import ls2 from "../../../media/ls-icon2.png";
import ls3 from "../../../media/ls-icon3.png";
import {addEvent, setActived} from "../Main";

let dispatch, warner, npasinp, powpasinp, zambut, zambut1, oldPasSt, b, els;
oldPasSt = true;
b = [false, false, false, false];
els = {"ch1": 1, "ch2": 2, "ch3": 3, "oldinp": 0, "secinp": 1, "npasinp": 2, "powpasinp": 3};

function inpchr(event) {
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

function onEditPass(e) {
    let par = e.target.parentElement;
    par.setAttribute('data-mod', '1');
}

function onChSt(e) {
    let par = e.target.parentElement.parentElement;
    oldPasSt = !oldPasSt;
    chStatB({target:par.querySelector(oldPasSt ? "#oldinp":"#secinp")});
    par.setAttribute('data-mod', oldPasSt ? '0' : '1');
}

function onClosePas(e) {
    let par = e.target.classList.contains("clA") ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
    par.setAttribute('data-mod', '0');
}

function chStatB(e) {
    let el = e.target;
    b[els[el.id]] = (el.pattern ? !el.validity.patternMismatch : true) && el.value.length != 0;
    zambut.setAttribute("data-enable", +(((oldPasSt ? b[0] : b[1]) & b[2] & b[3]) || false));
}

function chStatAv(e) {
    e.target.firstChild.checked = true;
    dispatch(changeState(CHANGE_STATE, "ico", els[e.target.firstChild.id]));
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
    addEvent(`Сгенерирован пароль: ${password}. Он скопирован в буфер обмена`, 10);
}

export function Settings() {
    const checkBoxInfo = useSelector(checkbox);
    dispatch = useDispatch();
    const cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        setActived(".panSet");
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
        <div className={settingsCSS.AppHeader}>
            <Helmet>
                <title>Настройки</title>
            </Helmet>
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
                    <div className={settingsCSS.nav_iZag} data-mod="0">
                        <div className={settingsCSS.nav_i+" "+settingsCSS.link} id={settingsCSS.nav_i} data-act='1' onClick={onEditPass}>
                            Сменить пароль
                        </div>
                        <div className={settingsCSS.block} data-mod='0'>
                            <div className={settingsCSS.pasBlock+" "+settingsCSS.oldp}>
                                <input className={settingsCSS.inp} onChange={chStatB} id="oldinp" placeholder="Старый пароль" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                <div className={settingsCSS.but+' '+button.button} onClick={onChSt}>
                                    Забыл пароль?
                                </div>
                            </div>
                            <div className={settingsCSS.pasBlock+" "+settingsCSS.frp}>
                                <input className={settingsCSS.inp} onChange={chStatB} id="secinp" placeholder="Секретная фраза" type="password" pattern="^[a-zA-Z0-9]+$"/>
                                <div className={settingsCSS.but+' '+button.button} onClick={onChSt}>
                                    Вспомнил пароль
                                </div>
                            </div>
                            <div className={settingsCSS.pasBlock}>
                                <input className={settingsCSS.inp} onChange={chStatB} id="npasinp" placeholder="Новый пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                                <div className={settingsCSS.but+' '+button.button} onClick={gen_pas}>
                                    <img src={ran} className={settingsCSS.randimg} alt=""/>
                                    Случайный пароль
                                </div>
                            </div>
                            <input className={settingsCSS.inp+" "+settingsCSS.inpPass} id="powpasinp" onChange={chStatB} placeholder="Повторите пароль" type="password" autoComplete="new-password" pattern="^[a-zA-Z0-9]+$"/>
                            <div className={settingsCSS.blockKnops}>
                                <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butL} data-enable={"0"} onClick={onClosePas}>
                                    Замена!
                                </div>
                                <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butR} onClick={onClosePas}>
                                    Отменить
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={settingsCSS.nav_iZag} data-mod="0">
                        <div className={settingsCSS.nav_i+" "+settingsCSS.link} id={settingsCSS.nav_i} onClick={onEditPass}>
                            Сменить аватар
                        </div>
                        <div className={settingsCSS.block}>
                            <div className={settingsCSS.logo}>
                                <p style={{marginBlock: "0.5vw"}}>Выберите аватар для профиля:</p>
                                <div className={settingsCSS.blockAva} onClick={chStatAv}>
                                    <input id="ch1" name="ico" type="radio" value="1"/>
                                    <img className={settingsCSS.logoi} src={ls1} alt=""/>
                                </div>
                                <div className={settingsCSS.blockAva} onClick={chStatAv}>
                                    <input id="ch2" name="ico" type="radio" value="2"/>
                                    <img className={settingsCSS.logoi} src={ls2} alt=""/>
                                </div>
                                <div className={settingsCSS.blockAva} onClick={chStatAv}>
                                    <input id="ch3" name="ico" type="radio" value="3"/>
                                    <img className={settingsCSS.logoi} src={ls3} alt=""/>
                                </div>
                            </div>
                            <div className={settingsCSS.but+' '+button.button + ' clA'} style={{width:"fit-content"}} onClick={onClosePas}>
                                Закрыть меню выбора
                            </div>
                        </div>
                    </div>
                    <div className={settingsCSS.nav_iZag} data-mod="0">
                        <div className={settingsCSS.nav_i+" "+settingsCSS.link} id={settingsCSS.nav_i} onClick={onEditPass}>
                            {cState.secFr? "Изменить" : "Добавить"} секретную фразу
                        </div>
                        <div className={settingsCSS.block}>
                            <input className={settingsCSS.inp+" "+settingsCSS.inpPass} onChange={chStatSb1} placeholder="Секретная фраза" type="password" pattern="^[a-zA-Z0-9]+$"/>
                            <div className={settingsCSS.blockKnops}>
                                <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butL} data-enable={"0"} onClick={onClosePas}>
                                    Подтвердить
                                </div>
                                <div className={settingsCSS.but+' '+button.button+' '+settingsCSS.butR} onClick={onClosePas}>
                                    Отменить
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;