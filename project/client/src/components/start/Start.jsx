import React, {useEffect, useRef} from "react";
import warn from '../../media/warning.png';
import ls1 from '../../media/ls-icon1.png';
import ls2 from '../../media/ls-icon2.png';
import ls3 from '../../media/ls-icon3.png';
import ran from '../../media/random.png';
import pedagog from '../../media/start/pedagog.jpg';
import roditelyam from '../../media/start/roditelyam.jpg';
import zavuch from '../../media/start/zavuch.jpg';
import detyam from '../../media/start/detyam.jpeg';
import left from '../../media/start/left.png';
import sta from '../../media/start/start.gif';
import start from './start.module.css';
import * as st from "./start.js";
import button from "../button.module.css";
import {Helmet} from "react-helmet-async";
import CheckBox from "../other/checkBox/CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {checkbox, indicators} from "../../store/selector";
import {changeInd, changeIndNext, changeIndPrev} from "../../store/actions";
import {setActived} from "../main/Main";
import warnb from '../../media/warn_big.png';
import {useParams} from "react-router-dom"

let dispatch, timer, indActState, checkBoxState, regbut, regb, vxbut;
let rb = [false, false], vb = [false, false], sm = false, zb = [false, false, false, false], els = {"logz": 0, "secz": 1, "pasnz": 2, "paspz": 3, "logv": 0, "pasv": 1, "logr": 0, "pasr": 1};

function reset_timer() {
    clearInterval(timer);
    timer = setInterval(function() { dispatch(changeIndNext(indActState.actived)); }, 5000);
}

function chStatRb(e) {
    let el = e.target;
    rb[els[el.id]] = (el ? !el.validity.patternMismatch && el.value.length != 0 : false);
    regb = (checkBoxState.checkbox_lic & rb[0] & rb[1]) || false;
    regbut.setAttribute("data-enable", +regb);
}

function chStatVb(e, x) {
    let el = e.target;
    vb[els[el.id]] = x ? true : (el ? !el.validity.patternMismatch && el.value.length != 0 : false);
    vxbut.setAttribute("data-enable", +((vb[0] & vb[1]) || false));
}

function chStatAv(e) {
    e.target.firstChild.checked = true;
}

function onSmvz(e) {
    let par = e.target.parentElement.parentElement.parentElement;
    sm = !sm;
    par.querySelector("#vxo").setAttribute("data-act", sm ? "0" : "1");
    par.querySelector("#zab").setAttribute("data-act", sm ? "1" : "0");
}

function chStatZb(e) {
    let el = e.target;
    zb[els[el.id]] = (el ? (els[el.id] != 1 ? !el.validity.patternMismatch : true) && el.value.length != 0 : false);
    document.querySelector("#butL").setAttribute("data-enable", +((zb[0] & zb[1] & zb[2] & zb[3]) || false));
}

export function Start() {
    checkBoxState = useSelector(checkbox);
    const { inv } = useParams();
    regb = (checkBoxState.checkbox_lic & rb[0] & rb[1]) || false;
    indActState = useSelector(indicators);
    const isFirstUpdate = useRef(true);
    dispatch = useDispatch();
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Start.jsx")
        //get(dispatch);
        //del(9);
        //post(JSON.stringify({id: 9, name: 'nm124', email: 'm@y.ru'}))
        //put(14, JSON.stringify({id: 14, name: 'nm127', email: 'm@y.ru7'}))
        regbut = document.getElementById("regbut");
        vxbut = document.getElementById("but1");
        st.ini();
        chStatVb({target: document.getElementById("logv")});
        chStatZb({target: document.getElementById("logz")});
        setTimeout(function() {
            for(let el of document.getElementsByClassName("ic")) {
                if(!el.classList.contains("vx")) continue;
                let style = window.getComputedStyle(document.querySelector('#logv'))
                if (style && style.backgroundColor != "rgb(77, 77, 77)") {
                    chStatVb({target: el}, true);
                }
            }
        }, 700);
        setActived(".panGL");
        dispatch(changeInd(0, reset_timer));
        return function() {
            console.log("I was triggered during componentWillUnmount Start.jsx");
            st.destroy();
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        reset_timer();
        console.log('componentDidUpdate Start.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <div className={start.AppHeader+" prole"} data-act="0">
                <div className={start.block}>
                    <img alt="banner" src={warnb}/>
                    <div className={start.block_text}>
                        К действующему аккаунту была добавлена новая роль.
                    </div>
                </div>
            </div>
            <div className={start.AppHeader+" inver"} data-act="0">
                <div className={start.block}>
                    <img alt="banner" src={warnb}/>
                    <div className={start.block_text}>
                        Приглашение неверно или недействительно.
                    </div>
                </div>
            </div>
            <div className={start.AppHeader+" def"} data-act="1">
                <div className={start.g} id="g_id">
                    <div className={start.g_block} id='g_block_1' data-act={!indActState.actived ? "1" : "0"}>
                        <img src={zavuch} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_1">
                            Завучам
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_2' data-act={indActState.actived == 1 ? "1" : "0"}>
                        <img src={pedagog} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_2">
                            Педагогам
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_3' data-act={indActState.actived == 2 ? "1" : "0"}>
                        <img src={roditelyam} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_3">
                            Родителям
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_4' data-act={indActState.actived == 3 ? "1" : "0"}>
                        <img src={detyam} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_4">
                            Детям
                        </div>
                    </div>
                    <div className={start.g_block_shad}/>
                    <img src={left} className={start.pic_l} alt="" onClick={() => {dispatch(changeIndPrev(indActState.actived, reset_timer))}}/>
                    <img src={left} className={start.pic_r} alt="" onClick={() => {dispatch(changeIndNext(indActState.actived, reset_timer))}}/>
                    <div className={start.indic}>
                        <div className={start.indic_bl} id="ind_0" data-act={!indActState.actived ? "1" : "0"} onClick={() => {dispatch(changeInd(0, reset_timer))}}/>
                        <div className={start.indic_bl} id="ind_1" data-act={indActState.actived == 1 ? "1" : "0"} onClick={() => {dispatch(changeInd(1, reset_timer))}}/>
                        <div className={start.indic_bl} id="ind_2" data-act={indActState.actived == 2 ? "1" : "0"} onClick={() => {dispatch(changeInd(2, reset_timer))}}/>
                        <div className={start.indic_bl} id="ind_3" data-act={indActState.actived == 3 ? "1" : "0"} onClick={() => {dispatch(changeInd(3, reset_timer))}}/>
                    </div>
                </div>
                <div className={start.startimg}>
                    <div className={start.startimgText}>
                        Для авторизации проскролльте или нажмите на стрелки
                    </div>
                    <img src={sta} alt="" onClick={() => {window.scrollTo(0, window.innerHeight)}}/>
                </div>
            </div>
            <div className={start.AppHeader+" def"} data-act="1">
                {/*<pre>{JSON.stringify(checkBoxInfo.checkbox, null, "\t")}</pre>*/}
                {/*<pre>{JSON.stringify(clientsInfo, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '50%', color: '#fff'}}>{JSON.stringify(themeState, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '70%', color: '#fff'}}>{JSON.stringify(themeCheckBoxState, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '70%', color: '#fff'}}>{JSON.stringify(indActState.actived, null, "\t")}</pre>*/}
                <div className={start.posit} id="posform">
                    {inv && <div className={start.help}>
                        <span className={start.r} id="r">
                            Нет аккаунта? <a className={start.helpa} onClick={st.onreg}>Регистрация!</a>
                        </span>
                        <span className={start.v} id="v">
                            Есть аккаунт? <a className={start.helpa} onClick={st.onvxod}>Вход!</a>
                        </span>
                    </div>}
                    <form className={start.vxod} id="vxod">
                        <div className={start.vxo} id="vxo" data-act="1">
                            <input className={start.login+" ic vx"} type="login" onChange={chStatVb} placeholder="Логин" id="logv" autoComplete="username" required pattern="^[a-zA-Z0-9]+$"/>
                            <div className={start.grid_cont_l}>
                                <input className={start.pass+" ic vx"} type="password" onChange={chStatVb} placeholder="Пароль" id="pasv" autoComplete="current-password" required pattern="^[a-zA-Z0-9]+$"/>
                                <div className={start.nav_i+" "+start.zabpar} id={start.nav_i} onClick={onSmvz}>
                                    Забыли пароль?
                                </div>
                                <span className={start.warn+' '+start.warnc+" warnc"} id="warnc">
                                    <img src={warn} className={start.warnimg} alt=""/>
                                    <div className={start.tex}>
                                        Включён Caps Lock!
                                    </div>
                                </span>
                                <div className={start.button+' '+button.button} id="but1" onClick={() => st.vxo(dispatch)}>
                                    ВОЙТИ!
                                </div>
                            </div>
                        </div>
                        <div className={start.vxo} id="zab" data-act="0">
                            <input className={start.login+' '+start.inpz+" ic"} type="text" onChange={chStatZb} placeholder="Логин" id="logz" autoComplete="username" required pattern="^[a-zA-Z0-9]+$"/>
                            <input className={start.pass+' '+start.inpz} type="password" onChange={chStatZb} placeholder="Секретная фраза" id="secz"/>
                            <input className={start.pass+' '+start.inpz+" ic"} type="password" onChange={chStatZb} placeholder="Новый пароль" id="pasnz" autoComplete="new-password" required pattern="^[a-zA-Z0-9]+$"/>
                            <div className={start.grid_cont_l}>
                                <input className={start.pass+' '+start.inpz+" ic"} type="password" onChange={chStatZb} placeholder="Подтвердите пароль" id="paspz" autoComplete="new-password" required pattern="^[a-zA-Z0-9]+$"/>
                                <span className={start.warn+' '+start.warncz+" warnc"} id="warncz">
                                    <img src={warn} className={start.warnimg} alt=""/>
                                    <div className={start.tex}>
                                        Включён Caps Lock!
                                    </div>
                                </span>
                                <div className={start.button+' '+button.button+' '+start.butL+' '+start.butz} id="butL" onClick={() => st.vxo(dispatch)}>
                                    Подтвердить
                                </div>
                                <div className={start.button+' '+button.button+' '+start.butz} id="butR" onClick={onSmvz}>
                                    Вспомнил пароль
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className={start.reg} id="reg">
                        <div className={start.logo}>
                            <p style={{marginBlock: "0.5vw"}}>Выберите аватар для профиля:</p>
                            <div className={start.blockAva} onClick={chStatAv}>
                                <input id="ch1" name="ico" type="radio" value="1" defaultChecked/>
                                <img className={start.logoi} src={ls1} alt=""/>
                            </div>
                            <div className={start.blockAva} onClick={chStatAv}>
                                <input id="ch2" name="ico" type="radio" value="2"/>
                                <img className={start.logoi} src={ls2} alt=""/>
                            </div>
                            <div className={start.blockAva} onClick={chStatAv}>
                                <input id="ch3" name="ico" type="radio" value="3"/>
                                <img className={start.logoi} src={ls3} alt=""/>
                            </div>
                        </div>
                        <input className={start.login+" ic"} type="text" placeholder="Логин" onChange={chStatRb} id="logr" autoComplete="username" required pattern="^[a-zA-Z0-9]+$"/>
                        <div className={start.grid_cont_r}>
                            <input className={start.pass+" ic"} type="password" placeholder="Пароль" onChange={chStatRb} id="pasr" autoComplete="new-password" required pattern="^[a-zA-Z0-9]+$"/>
                            <div className={start.rand+' '+button.button} onClick={st.gen_pas}>
                                <img src={ran} className={start.randimg} alt=""/>
                                <div className={start.tex}>Случайный пароль</div>
                            </div>
                            <div className={start.lic}>
                                <CheckBox text={"Принимаю условия "} checkbox_id={"checkbox_lic"}/>
                                <span className={start.url} onClick={() => st.setVisibleOver(true)}>
                                    соглашения
                                </span>
                                <div className={start.warn+" warnc"} id="warncr">
                                    <img src={warn} className={start.warnimg} alt=""/>
                                    <div className={start.tex}>
                                        Включён Caps Lock!
                                    </div>
                                </div>
                            </div>
                            <div data-enable={+regb} id="regbut" className={start.button+' '+button.button+' regs'} onClick={st.rego}>
                                ЗАРЕГИСТРИРОВАТЬСЯ!
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={start.over} id="over">
                <div className={start.dogov}>
                    <div className={start.lic_text}>
                        {st.getLic()}
                    </div>
                    <div className={[button.button, start.lic_but_text].join(' ')} onClick={() => st.setVisibleOver(false)}>Прочитал</div>
                </div>
            </div>
        </>
    )
}
export default Start;