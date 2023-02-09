import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from './newsYo.module.css';
import {news, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../NewsMain";
import warn from "../../../media/warn_big.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import {changeNews, changeNewsDel, changeNewsParam} from "../../../store/actions";
import ed from "../../../media/edit.png";

let dispatch, newsInfo, type, inps, pari, cState;
type = "Yo";
inps = {inpntt : "Текст", inpnzt : "Заголовок", inpndt: new Date().toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"numeric"})};
pari = {elems: 0, paels: 0};

let [_, forceUpdate] = [];

function errorLoad(e) {
    e.target.style.display = 'none';
}

function errLoadAddIm(e) {
    if (e.target.hasAttribute("data-id")) {
        dispatch(changeNewsParam(type, e.target.getAttribute("data-id"), "img_url", ""));
    } else {
        inps.addIm = undefined;
        forceUpdate();
    }
}

function onDel(e) {
    let par, ima;
    par = e.target.parentElement.parentElement;
    if(par.classList.contains(newsCSS.banner)){
        ima = par.querySelector("img");
        if (ima.hasAttribute("data-id")) {
            dispatch(changeNewsParam(type, ima.getAttribute("data-id"), "img_url", ""));
        } else {
            inps.addIm = undefined;
            forceUpdate();
        }
    }
}

function onEdit(e) {
    let par, ima;
    par = e.target.parentElement;
    if(par.classList.contains(newsCSS.news_line)){
        par.setAttribute('data-st', '1');
    }
    if(par.parentElement.classList.contains(newsCSS.im) || par.parentElement.classList.contains(newsCSS.te) || par.parentElement.classList.contains(newsCSS.da) || par.parentElement.classList.contains(newsCSS.za)){
        par = par.parentElement;
        par.setAttribute('data-st', '1');
    }
    if(par.classList.contains(newsCSS.upr)){
        ima = par.parentElement.querySelector("img");
        if (ima.hasAttribute("data-id")) {
            inps.edAddIm = newsInfo[type][ima.getAttribute("data-id")].img_url;
            dispatch(changeNewsParam(type, ima.getAttribute("data-id"), "img_url", ""));
        } else {
            inps.edAddIm = inps.addIm;
            inps.addIm = undefined;
            forceUpdate();
        }
    }
}

function onFin(e) {
    let par, inp, bul;
    par = e.target.parentElement;
    bul = par.parentElement.classList.contains(newsCSS.te);
    inp = par.querySelector(bul ? "textarea" : "input");
    if(par.classList.contains(newsCSS.upr)){
        let news = Object.getOwnPropertyNames(newsInfo[type])
        dispatch(changeNews("Yo", news.length == 0 ? 0 : parseInt(news[news.length-1]) + 1, inps.inpnzt, inps.inpndt, inps.addIm, inps.inpntt));
        return;
    }
    if (inps[inp.id]) {
        inp.style.outline = "none black";
        if(par.parentElement.classList.contains(newsCSS.im)) {
            if (inps.edAddIm) inps.edAddIm = undefined;
            if (inp.hasAttribute("data-id")) {
                dispatch(changeNewsParam(type, inp.getAttribute("data-id"), "img_url", inp.value));
            } else {
                inps.addIm = inp.value;
                forceUpdate();
            }
        }
        if(bul) {
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNewsParam(type, inp.getAttribute("data-id"),"text", inp.value));
            }else {
                inps.inpntt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(newsCSS.da)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNewsParam(type, inp.getAttribute("data-id"),"date", inp.value));
            }else {
                inps.inpndt = inp.value;
                forceUpdate();
            }
        }
        if(par.parentElement.classList.contains(newsCSS.za)){
            par = par.parentElement;
            if(inp.hasAttribute("data-id")){
                dispatch(changeNewsParam(type, inp.getAttribute("data-id"),"title", inp.value));
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
            dispatch(changeNewsDel(type, par.getAttribute("data-id")));
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

function ele (x, par, b) {
    if(b){
        if(!inps[par]) inps[par] = x;
    } else {
        pari[par] = x;
    }
}

function getAdd(x) {
    let ns, dati, dat, zagi, zag, imi, im, texi, tex;
    zag = x ? newsInfo[type][x].title : inps.inpnzt;
    zagi = "inpnzt_" + (x?x:"");
    dat = x ? newsInfo[type][x].date : inps.inpndt;
    dati = "inpndt_" + (x?x:"");
    im = x ? newsInfo[type][x].img_url : inps.addIm;
    imi = "inpnit_" + (x?x:"");
    tex = x ? newsInfo[type][x].text : inps.inpntt;
    texi = "inpntt_" + (x?x:"");
    ns = (<div className={newsCSS.ns}>
            <div className={newsCSS.za} data-st="0">
                <div className={newsCSS.fi}>
                    <h2 className={newsCSS.zag}>
                        {zag}
                    </h2>
                    <img className={newsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Заголовок:
                    </div>
                    <input className={newsCSS.inp} id={zagi} defaultValue={zag} data-id={x ? x : undefined} onChange={chStatB}/>
                    {ele(false, zagi, true)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.da} data-st="0">
                <div className={newsCSS.fi}>
                    <span className={newsCSS.date}>
                        {dat}
                    </span>
                    <img className={newsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Дата:
                    </div>
                    <input className={newsCSS.inp} id={dati} data-id={x ? x : undefined} placeholder={"ДД.ММ.ГГГГ"} defaultValue={dat} pattern="^[0-9.]+$" onChange={chStatB}/>
                    {ele(false, dati, true)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.te} data-st="0">
                {im ?
                        <span className={newsCSS.banner}>
                            <img alt="banner" data-id={x ? x : undefined} src={im} onError={errLoadAddIm}/>
                            <div className={newsCSS.upr}>
                                <img className={newsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                                <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onDel} title="Удалить изображение" alt=""/>
                            </div>
                        </span>
                    :
                        <div className={newsCSS.im} data-st={inps.edAddIm ? "1" : "0"}>
                            <div className={newsCSS.banner+" "+newsCSS.fi}>
                                <div>
                                    Изображение
                                </div>
                                <img className={newsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                            </div>
                            <div className={newsCSS.ed}>
                                <div className={newsCSS.preinf}>
                                    Ссылка:
                                </div>
                                <input className={newsCSS.inp} id={imi} data-id={x ? x : undefined} placeholder={"/media/tuman.jpg"} defaultValue={inps.edAddIm} onChange={chStatB} type="text"/>
                                {ele(false, imi, true)}
                                <img className={newsCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                                <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                            </div>
                        </div>
                }
                <div className={newsCSS.fi}>
                    <pre className={newsCSS.field}>
                        {tex}
                    </pre>
                    <img className={newsCSS.imgfield} src={ed} onClick={onEdit} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Текст:
                    </div>
                    <textarea className={newsCSS.inp+" "+newsCSS.inparea} data-id={x ? x : undefined} id={texi} defaultValue={tex} onChange={chStatB}/>
                    {ele(false, texi, true)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={onClose} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.upr} data-id={x ? x : undefined}>
                {!x && <img className={newsCSS.imginp+" yes "} src={yes} onClick={onFin} title="Подтвердить" alt=""/>}
                <img className={newsCSS.imginp+" "} style={{marginRight: "1vw"}} src={no} onClick={onClose} title={x ? "Удалить новость" : "Отменить изменения и выйти из режима редактирования"} alt=""/>
            </div>
        </div>);
    return x ? (ns) : (
        <div className={newsCSS.news_line} data-st="0">
            <div className={newsCSS.nav_i+" "+newsCSS.link} id={newsCSS.nav_i} onClick={onEdit}>
                Добавить новость
            </div>
            {ns}
        </div>
    )
}

export function NewsYo() {
    newsInfo = useSelector(news);
    cState = useSelector(states);
    if(!dispatch) setActNew(1);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount NewsYo.jsx");
        // dispatch(changeNews("Yo", "id_0", 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // dispatch(changeNews("Yo", "id_0"));
        // setInterval(function() {
        //     dispatch(changeNews("Yo", "id_" + Object.getOwnPropertyNames(newsInfo.newsYo).length, 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // }, 5000);
        for(let el of document.querySelectorAll("." + newsCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el});
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount NewsYo.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsYo.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Объявления учебного центра</title>
            </Helmet>
            <div className={newsCSS.AppHeader}>
                {(cState.auth && cState.role == 3) ?
                        <section className={newsCSS.center_colum}>
                            {getAdd()}
                            {Object.getOwnPropertyNames(newsInfo[type]).reverse().map(param =>
                                <div className={newsCSS.news_line} data-st="1" key={param}>
                                    {getAdd(param)}
                                </div>
                            )}
                        </section>
                    :
                        <>
                            {Object.getOwnPropertyNames(newsInfo[type]).length == 0 ?
                                    <div className={newsCSS.block}>
                                        <img alt="banner" src={warn}/>
                                        <div className={newsCSS.block_text}>
                                            Новостей нет... Кажется, что новостная лента пустует не заслужено? Попробуйте
                                            попросить
                                            завуча заполнить информацию.
                                        </div>
                                    </div>
                                :
                                    <section className={newsCSS.center_colum}>
                                        {Object.getOwnPropertyNames(newsInfo[type]).reverse().map(param =>
                                            <div className={newsCSS.news_line} data-st="1" key={param}>
                                                <h2 className={newsCSS.zag}>{newsInfo[type][param].title}</h2>
                                                <span className={newsCSS.date}>{newsInfo[type][param].date}</span>
                                                <div className={newsCSS.te}>
                                                    <span className={newsCSS.banner}>
                                                        <img alt="banner" src={newsInfo[type][param].img_url + ''} onError={errorLoad}/>
                                                    </span>
                                                    <pre className={newsCSS.field}>
                                                        {newsInfo[type][param].text}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                            }
                        </>
                }
            </div>
        </>
    )
}
export default NewsYo;