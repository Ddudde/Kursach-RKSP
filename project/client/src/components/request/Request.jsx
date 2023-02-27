import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import requestCSS from './request.module.css';
import {useDispatch, useSelector} from "react-redux";
import yes from "../../media/yes.png";
import no from "../../media/no.png";
import ed from "../../media/edit.png";
import ErrFound from "../other/error/ErrFound";
import {requests, states} from "../../store/selector";
import {CHANGE_REQUEST, CHANGE_REQUEST_DEL, CHANGE_REQUEST_PARAM, changeReq} from "../../store/actions";
import {setActived} from "../main/Main";

let dispatch, requestInfo, inps, cState, errText;
inps = {inpntt : "Текст", inpnzt : "Заголовок", inpndt: new Date().toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"numeric"})};
errText = "Заявок нет..."

let [_, forceUpdate] = [];

function getEdField(edFi, titleEd, x, inf, inp, info, placeholder, pattern) {
    return (<>
        <div className={requestCSS.fi}>
            {edFi}
            <img className={requestCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
        </div>
        <div className={requestCSS.ed}>
            <div className={requestCSS.preinf}>
                {titleEd}
            </div>
            {edFi.type == "pre" ?
                <textarea className={requestCSS.inp+" "+requestCSS.inparea} id={inp} placeholder={placeholder} defaultValue={inf} data-id={x} onChange={chStatB}/>
                :
                <input className={requestCSS.inp} id={inp} placeholder={placeholder} pattern={pattern} defaultValue={inf} data-id={x} onChange={chStatB}/>
            }
            {ele(false, inp)}
            <img className={requestCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, info)} title="Подтвердить" alt=""/>
            <img className={requestCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
        </div>
    </>)
}

function getAdd(info, x) {
    let edFi, dat, datFi, zag, zagFi, tex, texFi;
    zag = x ? info[x].title : inps.inpnzt;
    zagFi = <h2 className={requestCSS.zag}>
        {zag}
    </h2>;
    dat = x ? info[x].date : inps.inpndt;
    datFi = <span className={requestCSS.date}>
        {dat}
    </span>;
    tex = x ? info[x].text : inps.inpntt;
    texFi = <pre className={requestCSS.field}>
        {tex}
    </pre>;
    edFi = (
        <div className={requestCSS.ns}>
            <div className={requestCSS.za} data-st="0">
                {getEdField(zagFi, "Заголовок:", x, zag, "inpnzt_" + (x?x:""), info)}
            </div>
            <div className={requestCSS.da} data-st="0">
                {getEdField(datFi, "Дата:", x, dat, "inpndt_" + (x?x:""), info, "ДД.ММ.ГГГГ", "^[0-9.]+$")}
            </div>
            <div className={requestCSS.te} data-st="0">
                {getEdField(texFi, "Текст:", x, tex, "inpntt_" + (x?x:""), info)}
            </div>
            <div className={requestCSS.upr} data-id={x}>
                {!x && <img className={requestCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, info)} title="Подтвердить" alt=""/>}
                <img className={requestCSS.imginp+" "} style={{marginRight: "1vw"}} src={no} onClick={onClose} title={x ? "Удалить новость" : "Отменить изменения и выйти из режима редактирования"} alt=""/>
            </div>
        </div>
    );
    return x ? (edFi) : (
        <div className={requestCSS.news_line} data-st="0">
            <div className={requestCSS.nav_i+" "+requestCSS.link} id={requestCSS.nav_i} onClick={onEdit}>
                Добавить новость
            </div>
            {edFi}
        </div>
    )
}

function onEdit(e) {
    let par;
    par = e.target.parentElement;
    if(par.classList.contains(requestCSS.news_line)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(requestCSS.te) || par.parentElement.classList.contains(requestCSS.da) || par.parentElement.classList.contains(requestCSS.za)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.parentElement.classList.contains(requestCSS.im)){
        par = par.parentElement.parentElement;
        par.setAttribute('data-st', '1');
    }
}

function onFin(e, info) {
    let par, inp, bul;
    par = e.target.parentElement;
    bul = par.parentElement.classList.contains(requestCSS.te);
    inp = par.querySelector(bul ? "textarea" : "input");
    if(par.classList.contains(requestCSS.upr)){
        let news, obj;
        news = Object.getOwnPropertyNames(info);
        obj = {
            title: inps.inpnzt,
            date: inps.inpndt,
            text: inps.inpntt
        }
        dispatch(changeReq(CHANGE_REQUEST, news.length == 0 ? 0 : parseInt(news[news.length-1]) + 1, obj));
        return;
    }
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(bul) {
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeReq(CHANGE_REQUEST_PARAM, inp.getAttribute("data-id"), inp.value,"text"));
            }else {
                inps.inpntt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(requestCSS.da)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeReq(CHANGE_REQUEST_PARAM, inp.getAttribute("data-id"), inp.value,"date"));
            }else {
                inps.inpndt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(requestCSS.za)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeReq(CHANGE_REQUEST_PARAM, inp.getAttribute("data-id"), inp.value,"title"));
            }else{
                inps.inpnzt = inp.value;
                forceUpdate();
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
    if(par.parentElement.classList.contains(requestCSS.te) || par.parentElement.classList.contains(requestCSS.da) || par.parentElement.classList.contains(requestCSS.za)){
        par = par.parentElement;
        par.setAttribute('data-st', '0');
    }
    if(par.classList.contains(requestCSS.upr)){
        if (par.hasAttribute("data-id")) {
            dispatch(changeReq(CHANGE_REQUEST_DEL, par.getAttribute("data-id")));
        }else {
            par = par.parentElement.parentElement;
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

function ele (x, par) {
    if(!inps[par]) inps[par] = x;
}

export function Request() {
    requestInfo = useSelector(requests);
    cState = useSelector(states);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Request.jsx");
        for(let el of document.querySelectorAll("." + requestCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el});
        }
        setActived(11);
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Request.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Request.jsx');
    });
    return (
        <div className={requestCSS.header}>
            <Helmet>
                <title>Заявки</title>
            </Helmet>
            {Object.getOwnPropertyNames(requestInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <div className={requestCSS.block}>
                        <section className={requestCSS.center_colum}>
                            {Object.getOwnPropertyNames(requestInfo).reverse().map(param =>
                                <div className={requestCSS.news_line} data-st="1" key={param}>
                                    {getAdd(requestInfo, param)}
                                </div>
                            )}
                        </section>
                    </div>
            }
        </div>
    )
}
export default Request;