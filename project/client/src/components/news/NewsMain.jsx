import React, {useEffect, useRef} from "react";
import newsCSS from './newsMain.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {CHANGE_NEWS, CHANGE_NEWS_DEL, CHANGE_NEWS_PARAM, changeNews} from "../../store/actions";
import ed from "../../media/edit.png";
import yes from "../../media/yes.png";
import no from "../../media/no.png";

let gr, cState, dispatch;

gr = {
    group: 0
}

export function getEdField(edFi, titleEd, x, inf, inp, type, info, inps, forceUpdate, placeholder, pattern) {
    return (<>
        <div className={newsCSS.fi}>
            {edFi}
            {titleEd != "Ссылка:" && <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, info)} title="Редактировать" alt=""/>}
        </div>
        <div className={newsCSS.ed}>
            <div className={newsCSS.preinf}>
                {titleEd}
            </div>
            {edFi.type == "pre" ?
                    <textarea className={newsCSS.inp+" "+newsCSS.inparea} id={inp} placeholder={placeholder} defaultValue={inf} data-id={x} onChange={(e)=>chStatB(e, inps)}/>
                :
                    <input className={newsCSS.inp} id={inp} placeholder={placeholder} pattern={pattern} defaultValue={inf} data-id={x} onChange={(e)=>chStatB(e, inps)}/>
            }
            {ele(false, inp, inps)}
            <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, info)} title="Подтвердить" alt=""/>
            <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
        </div>
    </>)
}

export function getAdd(type, info, inps, forceUpdate, x) {
    let edFi, dat, datFi, zag, zagFi, imiFi, im, tex, texFi;
    zag = x ? info[type][x].title : inps.inpnzt;
    zagFi = <h2 className={newsCSS.zag}>
        {zag}
    </h2>;
    dat = x ? info[type][x].date : inps.inpndt;
    datFi = <span className={newsCSS.date}>
        {dat}
    </span>;
    im = x ? info[type][x].img_url : inps.addIm;
    imiFi = <div className={newsCSS.banner}>
        <div>
            Изображение
        </div>
        <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, info)} title="Редактировать" alt=""/>
    </div>;
    tex = x ? info[type][x].text : inps.inpntt;
    texFi = <pre className={newsCSS.field}>
        {tex}
    </pre>;
    edFi = (
        <div className={newsCSS.ns}>
            <div className={newsCSS.za} data-st="0">
                {getEdField(zagFi, "Заголовок:", x, zag, "inpnzt_" + (x?x:""), type, info, inps, forceUpdate)}
            </div>
            <div className={newsCSS.da} data-st="0">
                {getEdField(datFi, "Дата:", x, dat, "inpndt_" + (x?x:""), type, info, inps, forceUpdate, "ДД.ММ.ГГГГ", "^[0-9.]+$")}
            </div>
            <div className={newsCSS.te} data-st="0">
                {im ?
                        <span className={newsCSS.banner}>
                            <img alt="banner" data-id={x} src={im} onError={(e)=>errLoadAddIm(e, type, inps, forceUpdate)}/>
                            <div className={newsCSS.upr}>
                                <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, info)} title="Редактировать" alt=""/>
                                <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, type, inps, forceUpdate)} title="Удалить изображение" alt=""/>
                            </div>
                        </span>
                    :
                        <div className={newsCSS.im} data-st={inps.edAddIm ? "1" : "0"}>
                            {getEdField(imiFi, "Ссылка:", x, inps.edAddIm, "inpnit_" + (x?x:""), type, info, inps, forceUpdate, "/media/tuman.jpg")}
                        </div>
                }
                {getEdField(texFi, "Текст:", x, tex, "inpntt_" + (x?x:""), type, info, inps, forceUpdate)}
            </div>
            <div className={newsCSS.upr} data-id={x}>
                {!x && <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, info)} title="Подтвердить" alt=""/>}
                <img className={newsCSS.imginp+" "} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title={x ? "Удалить новость" : "Отменить изменения и выйти из режима редактирования"} alt=""/>
            </div>
        </div>
    );
    return x ? (edFi) : (
        <div className={newsCSS.news_line} data-st="0">
            <div className={newsCSS.nav_i+" "+newsCSS.link} id={newsCSS.nav_i} onClick={(e)=>onEdit(e, type, inps, forceUpdate, info)}>
                Добавить новость
            </div>
            {edFi}
        </div>
    )
}

export function errorLoad(e) {
    e.target.style.display = 'none';
}

export function errLoadAddIm(e, type, inps, forceUpdate) {
    if (e.target.hasAttribute("data-id")) {
        dispatch(changeNews(CHANGE_NEWS_PARAM, type, e.target.getAttribute("data-id"), "", "img_url"));
    } else {
        inps.addIm = undefined;
        forceUpdate();
    }
}

export function onDel(e, type, inps, forceUpdate) {
    let par, ima;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(newsCSS.banner)){
        ima = par.querySelector("img");
        if (ima.hasAttribute("data-id")) {
            dispatch(changeNews(CHANGE_NEWS_PARAM, type, ima.getAttribute("data-id"), "", "img_url"));
        } else {
            inps.addIm = undefined;
            forceUpdate();
        }
    }
}

export function onEdit(e, type, inps, forceUpdate, info) {
    let par, ima;
    par = e.target.parentElement;
    if(par.classList.contains(newsCSS.news_line)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(newsCSS.im) || par.parentElement.classList.contains(newsCSS.te) || par.parentElement.classList.contains(newsCSS.da) || par.parentElement.classList.contains(newsCSS.za)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.parentElement.classList.contains(newsCSS.im)){
        par = par.parentElement.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.classList.contains(newsCSS.upr)){
        ima = par.parentElement.querySelector("img");
        if (ima.hasAttribute("data-id")) {
            inps.edAddIm = info[type][ima.getAttribute("data-id")].img_url;
            dispatch(changeNews(CHANGE_NEWS_PARAM, type, ima.getAttribute("data-id"), "", "img_url"));
        } else {
            inps.edAddIm = inps.addIm;
            inps.addIm = undefined;
            forceUpdate();
        }
    }
}

export function onFin(e, type, inps, forceUpdate, info) {
    let par, inp, bul;
    par = e.target.parentElement;
    bul = par.parentElement.classList.contains(newsCSS.te);
    inp = par.querySelector(bul ? "textarea" : "input");
    if(par.classList.contains(newsCSS.upr)){
        let news, obj;
        news = Object.getOwnPropertyNames(info[type]);
        obj = {
            title: inps.inpnzt,
            date: inps.inpndt,
            img_url: inps.addIm,
            text: inps.inpntt
        }
        dispatch(changeNews(CHANGE_NEWS, type, news.length == 0 ? 0 : parseInt(news[news.length-1]) + 1, obj));
        return;
    }
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(newsCSS.im)) {
            if (inps.edAddIm) inps.edAddIm = undefined;
            if (inp.hasAttribute("data-id")) {
                dispatch(changeNews(CHANGE_NEWS_PARAM, type, inp.getAttribute("data-id"), inp.value, "img_url"));
            } else {
                inps.addIm = inp.value;
                forceUpdate();
            }
        }
        if(bul) {
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNews(CHANGE_NEWS_PARAM, type, inp.getAttribute("data-id"), inp.value,"text"));
            }else {
                inps.inpntt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(newsCSS.da)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNews(CHANGE_NEWS_PARAM, type, inp.getAttribute("data-id"), inp.value,"date"));
            }else {
                inps.inpndt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(newsCSS.za)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNews(CHANGE_NEWS_PARAM, type, inp.getAttribute("data-id"), inp.value,"title"));
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

export function onClose(e, type, inps, forceUpdate) {
    let par = e.target.parentElement;
    if(par.parentElement.classList.contains(newsCSS.im) || par.parentElement.classList.contains(newsCSS.te) || par.parentElement.classList.contains(newsCSS.da) || par.parentElement.classList.contains(newsCSS.za)){
        par = par.parentElement;
        if(inps.edAddIm) {
            inps.addIm = inps.edAddIm;
            inps.edAddIm = undefined;
            forceUpdate();
        } else {
            par.setAttribute('data-st', '0');
        }
    }
    if(par.classList.contains(newsCSS.upr)){
        if (par.hasAttribute("data-id")) {
            dispatch(changeNews(CHANGE_NEWS_DEL, type, par.getAttribute("data-id")));
        }else {
            par = par.parentElement.parentElement;
            par.setAttribute('data-st', '0');
        }
    }
}

export function chStatB(e, inps) {
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

export function ele (x, par, inps) {
    if(!inps[par]) inps[par] = x;
}

export function setActNew(name) {
    gr.group = name;
}

export function NewsMain() {
    cState = useSelector(states);
    const paneInfo = useSelector(pane);
    gr.groups = {
        0: {
            nam: "Объявления портала",
            linke: "por"
        },
        1: {
            nam: "Объявления учебного центра",
            linke: "yo"
        }
    };
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount NewsMain.jsx");
        setActived(1);
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount NewsMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsMain.jsx');
    });
    return (
        <div className={newsCSS.AppHeader}>
            {(cState.auth && cState.role != 4) &&
                <div className={newsCSS.pane}>
                    <Pane gro={gr}/>
                </div>
            }
            <Outlet />
        </div>
    )
}
export default NewsMain;