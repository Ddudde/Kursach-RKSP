import React, {useEffect, useRef} from "react";
import warn from '../../media/warning.png';
import ls1 from '../../media/ls-icon1.png';
import ls2 from '../../media/ls-icon2.png';
import ls3 from '../../media/ls-icon3.png';
import ran from '../../media/random.png';
import pedagog from '../../media/pedagog.jpg';
import roditelyam from '../../media/roditelyam.jpg';
import zavuch from '../../media/zavuch.jpg';
import detyam from '../../media/detyam.jpeg';
import left from '../../media/left.png';
import sta from '../../media/start.gif';
import start from './start.module.css';
import * as st from "./start.js";
import button from "../button.module.css";
import {Helmet} from "react-helmet-async";
import CheckBox from "./CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {checkbox, indicators} from "../../store/selector";
import {changeInd, changeIndNext, changeIndPrev, changeIndTimer} from "../../store/actions";
import {setActived} from "../main/Main";

let dispatch, timer, indActState;

function reset_timer() {
    clearInterval(timer);
    timer = setInterval(function() { dispatch(changeIndTimer(indActState.actived)); }, 5000);
}

export function Start() {
    const checkBoxState = useSelector(checkbox);
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
        st.ini(start.AppHeader);
        setActived(".panGL");
        dispatch(changeInd("ind_0", reset_timer, indActState.actived));
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
        console.log('componentDidUpdate Start.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Главная</title>
                <link rel="canonical" href="http://example.com/example" />
            </Helmet>
            <div className={start.AppHeader}>
                <div className={start.g} id="g_id">
                    <div className={start.g_block} id='g_block_1'>
                        <img src={zavuch} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_1">
                            Завучам
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_2'>
                        <img src={pedagog} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_2">
                            Педагогам
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_3'>
                        <img src={roditelyam} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_3">
                            Родителям
                        </div>
                    </div>
                    <div className={start.g_block} id='g_block_4'>
                        <img src={detyam} className={start.pic_g} alt=""/>
                        <div className={start.g_block_text} id="g_text_id_4">
                            Детям
                        </div>
                    </div>
                    <div className={start.g_block_shad}/>
                    <img src={left} className={start.pic_l} alt="" onClick={() => {dispatch(changeIndPrev(indActState.actived, reset_timer))}}/>
                    <img src={left} className={start.pic_r} alt="" onClick={() => {dispatch(changeIndNext(indActState.actived, reset_timer))}}/>
                    <div className={start.indic}>
                        <div className={start.indic_bl} id="ind_0" onClick={() => {dispatch(changeInd("ind_0", reset_timer, indActState.actived))}}>
                        </div>
                        <div className={start.indic_bl} id="ind_1" onClick={() => {dispatch(changeInd("ind_1", reset_timer, indActState.actived))}}>
                        </div>
                        <div className={start.indic_bl} id="ind_2" onClick={() => {dispatch(changeInd("ind_2", reset_timer, indActState.actived))}}>
                        </div>
                        <div className={start.indic_bl} id="ind_3" onClick={() => {dispatch(changeInd("ind_3", reset_timer, indActState.actived))}}>
                        </div>
                    </div>
                </div>
                <div className={start.startimg}>
                    <div className={start.startimgText}>
                        Для авторизации проскролльте или нажмите на стрелки
                    </div>
                    <img src={sta} alt="" onClick={() => {window.scrollTo(0, window.innerHeight)}}/>
                </div>
            </div>
            <div className={start.AppHeader}>
                {/*<pre>{JSON.stringify(checkBoxInfo.checkbox, null, "\t")}</pre>*/}
                {/*<pre>{JSON.stringify(clientsInfo, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '50%', color: '#fff'}}>{JSON.stringify(themeState, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '70%', color: '#fff'}}>{JSON.stringify(themeCheckBoxState, null, "\t")}</pre>*/}
                {/*<pre style={{position: 'fixed', top: '70%', color: '#fff'}}>{JSON.stringify(indActState.actived, null, "\t")}</pre>*/}
                <div className={start.posit} id="posform">
                    <div className={start.help}>
                            <span className={start.r} id="r">
                                Нет аккаунта? <a className={start.helpa} onClick={() => st.onreg()}>Регистрация!</a>
                            </span>
                        <span className={start.v} id="v">
                                Есть аккаунт? <a className={start.helpa} onClick={() => st.onvxod()}>Вход!</a>
                            </span>
                    </div>
                    <form className={start.vxod} id="vxod">
                        <input className={start.login} type="text" placeholder="Логин" id="logv" autoComplete="username" required pattern="^[a-zA-Z0-9]+$"/>
                        <div className={start.grid_cont_l}>
                            <input className={start.pass} type="password" placeholder="Пароль" id="pasv" autoComplete="current-password" required pattern="^[a-zA-Z0-9]+$"/>
                            <span className={start.warn+' '+start.warnc} id="warnc">
                                    <img src={warn} className={start.warnimg} alt=""/>Включён Caps Lock!
                                </span>
                            <div className={start.button+' '+button.button} id="but1" onClick={() => st.vxo(dispatch)}>
                                ВОЙТИ!
                            </div>
                        </div>
                    </form>
                    <form className={start.reg} id="reg">
                        <div className={start.logo}>
                            <p>Выберите иконку для профиля:</p>
                            <input id="ch1" name="ico" type="radio" value="1" defaultChecked/>
                            <img className={start.logoi} src={ls1} alt=""/>
                            <input id="ch2" name="ico" type="radio" value="2"/>
                            <img className={start.logoi} src={ls2} alt=""/>
                            <input id="ch3" name="ico" type="radio" value="3"/>
                            <img className={start.logoi} src={ls3} alt=""/>
                        </div>
                        <input className={start.login} type="text" placeholder="Логин" id="logr" autoComplete="username" required pattern="^[a-zA-Z0-9]+$"/>
                        <div className={start.grid_cont_r}>
                            <input className={start.pass} type="password" placeholder="Пароль" id="pasr" autoComplete="new-password" required pattern="^[a-zA-Z0-9]+$"/>
                            <span className={start.rand+' '+button.button} onClick={() => st.gen_pas()}>
                                    <img src={ran} className={start.randimg} alt=""/>Случайный пароль
                                </span>
                            <div className={start.lic}>
                                <CheckBox name={"a"} value={"согл"} text={"Принимаю условия "} checkbox_id={"checkbox_lic"} checkbox_state={+false}/>
                                <span className={start.url} onClick={() => st.setVisibleOver(true)}>
                                        соглашения
                                    </span>
                                <span className={start.warn} id="warncr">
                                        <img src={warn} className={start.warnimg} alt=""/>Включён Caps Lock!
                                    </span>
                            </div>
                            <div data-enable={+checkBoxState.checkbox_lic} className={start.button+' '+button.button} onClick={() => st.rego()}>
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