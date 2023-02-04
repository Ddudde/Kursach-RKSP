import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from './contactYo.module.css';
import {contactsSelec, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../ContactMain";
import warn from "../../../media/warn_big.png";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import {changeContacts, changeContactsMap, changeContactsMapImage} from "../../../store/actions";

let dispatch, contactsInfo, type, cState, inps, pari;
type = "Yo";
inps = {inpntt : "Текст", inpnzt : "Заголовок", inpndt: new Date().toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"numeric"})};
pari = {elems: 0, paels: 0};
let [_, forceUpdate] = [];

function errorLoad(e) {
    e.target.style.display = 'none';
}

function errLoadAddIm(e) {
    dispatch(changeContactsMapImage(type, ""));
}

function onDel(e) {
    let par;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(contactCSS.banner)){
        dispatch(changeContactsMapImage(type, ""));
    }
}

function onEdit(e) {
    let par;
    par = e.target.parentElement;
    if(par.parentElement.classList.contains(contactCSS.im) || par.parentElement.classList.contains(contactCSS.te)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.classList.contains(contactCSS.upr)){
        inps.edAddIm = contactsInfo[type].mapPr.imgUrl;
        dispatch(changeContactsMapImage(type, ""));
    }
}

function onFin(e) {
    let par, inp, bul;
    par = e.target.parentElement;
    bul = par.parentElement.classList.contains(contactCSS.te);
    inp = par.querySelector(bul ? "textarea" : "input");
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(contactCSS.im)) {
            if (inps.edAddIm) inps.edAddIm = undefined;
            dispatch(changeContactsMapImage(type, inp.value));
        }
        if(bul) {
            par = par.parentElement;
            if(par.classList.contains("mapt")){
                dispatch(changeContactsMap(type, inp.value));
            } else {
                dispatch(changeContacts(type, inp.value));
            }
        }
        par.setAttribute('data-st', '0');
    } else {
        inp.style.animation = "but 1s ease infinite";
        setTimeout(function () {
            inp.style.animation = "none"
        }, 1000);
        inp.style.outline = "solid red";
    }
}

function onClose(e) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(contactCSS.im) || par.parentElement.classList.contains(contactCSS.te)){
        par = par.parentElement;
        if(inps.edAddIm) {
            inps.addIm = inps.edAddIm;
            inps.edAddIm = undefined;
            forceUpdate();
        } else {
            par.setAttribute('data-st', '0');
        }
    }
}

function chStatB(e) {
    let el = e.target;
    if(el.pattern) {
        inps[el.id] = !el.validity.patternMismatch && el.value.length != 0;
    } else {
        inps[el.id] = el.value.length != 0;
    }
    if (inps[el.id]) {
        el.style.outline = "none black";
    } else {
        el.style.animation = "but 1s ease infinite";
        setTimeout(function () {
            el.style.animation = "none"
        }, 1000);
        el.style.outline = "solid red";
    }
    el.parentElement.querySelector(".yes").setAttribute("data-enable", +inps[el.id]);
}

function ele (x, par, b) {
    if(b){
        if(!inps[par]) inps[par] = x;
    } else {
        pari[par] = x;
    }
}

export function ContactYo() {
    contactsInfo = useSelector(contactsSelec);
    cState = useSelector(states);
    if(!dispatch) setActNew(1);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount ContactYo.jsx");
        // dispatch(changeContacts("Yo", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Yo", "imageUrl"));
        // dispatch(changeContacts("Yo", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Yo", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Yo", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsYo.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        for(let el of document.querySelectorAll("." + contactCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el});
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount ContactYo.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ContactYo.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Контакты учебного центра</title>
            </Helmet>
            <div className={contactCSS.AppHeader}>
                {(!contactsInfo[type].contact && !contactsInfo[type].mapPr.imgUrl && !(cState.auth && cState.role == 3)) ?
                    <div className={contactCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={contactCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <section className={contactCSS.center_colum}>
                        {(cState.auth && cState.role == 3) ?
                            <>
                                <div className={contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Телефоны для связи</h1>
                                    <div className={contactCSS.te} data-st="0">
                                        <div className={contactCSS.fi}>
                                            <pre className={contactCSS.field}>
                                                {contactsInfo[type].contact}
                                            </pre>
                                            <img className={contactCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                        </div>
                                        <div className={contactCSS.ed}>
                                            <div className={contactCSS.preinf}>
                                                Текст:
                                            </div>
                                            <textarea className={contactCSS.inp+" "+contactCSS.inparea} id={"inpntt_c"} defaultValue={contactsInfo[type].contact} onChange={chStatB}/>
                                            {ele(false, "inpntt_c", true)}
                                            <img className={contactCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                            <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className={contactCSS.map+" "+contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Карта проезда</h1>
                                    <div className={contactCSS.te+" mapt"} data-st="0">
                                        <div className={contactCSS.fi}>
                                            <pre className={contactCSS.field}>
                                                {contactsInfo[type].mapPr.text}
                                            </pre>
                                            <img className={contactCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                        </div>
                                        <div className={contactCSS.ed}>
                                            <div className={contactCSS.preinf}>
                                                Текст:
                                            </div>
                                            <textarea className={contactCSS.inp+" "+contactCSS.inparea} id={"inpntt_m"} defaultValue={contactsInfo[type].mapPr.text} onChange={chStatB}/>
                                            {ele(false, "inpntt_m", true)}
                                            <img className={contactCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                            <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                        {contactsInfo[type].mapPr.imgUrl ?
                                                <span className={contactCSS.banner}>
                                                    <img alt="banner" src={contactsInfo[type].mapPr.imgUrl} onError={errLoadAddIm}/>
                                                    <div className={contactCSS.upr}>
                                                        <img className={contactCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                                        <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onDel} title="Удалить изображение" alt=""/>
                                                    </div>
                                                </span>
                                            :
                                                <div className={contactCSS.im} data-st={inps.edAddIm ? "1" : "0"}>
                                                    <div className={contactCSS.banner+" "+contactCSS.fi}>
                                                        <div>
                                                            <div>
                                                                Изображение
                                                            </div>
                                                            <img className={contactCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className={contactCSS.ed}>
                                                        <div className={contactCSS.preinf}>
                                                            Ссылка:
                                                        </div>
                                                        <input className={contactCSS.inp} id={"inpnit_m"} placeholder={"/media/tuman.jpg"} defaultValue={inps.edAddIm} onChange={chStatB} type="text"/>
                                                        {ele(false, "inpnit_m", true)}
                                                        <img className={contactCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                                        <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                            </> :
                            <>
                                <div className={contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Телефоны для связи</h1>
                                    <pre className={contactCSS.field}>
                                        {contactsInfo[type].contact}
                                    </pre>
                                </div>
                                <div className={contactCSS.map+" "+contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Карта проезда</h1>
                                    <pre className={contactCSS.field}>
                                        {contactsInfo[type].mapPr.text}
                                    </pre>
                                    <span className={contactCSS.banner}>
                                        <img alt="banner" src={contactsInfo[type].mapPr.imgUrl+''} onError={errorLoad}/>
                                    </span>
                                </div>
                            </>
                        }
                    </section>
                }
            </div>
        </>
    )
}
export default ContactYo;