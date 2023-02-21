import React, {useEffect, useRef} from "react";
import newsCSS from './newsMain.module.css';
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import Pane from "../other/pane/Pane";
import {setActived} from "../main/Main";
import {changeNews, changeNewsDel, changeNewsParam} from "../../store/actions";

let gr, cState, dispatch;

gr = {
    group: 0
}

export function errorLoad(e) {
    e.target.style.display = 'none';
}

export function errLoadAddIm(e, type, inps, forceUpdate) {
    if (e.target.hasAttribute("data-id")) {
        dispatch(changeNewsParam(type, e.target.getAttribute("data-id"), "img_url", ""));
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
            dispatch(changeNewsParam(type, ima.getAttribute("data-id"), "img_url", ""));
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
    if(par.classList.contains(newsCSS.upr)){
        ima = par.parentElement.querySelector("img");
        if (ima.hasAttribute("data-id")) {
            inps.edAddIm = info[type][ima.getAttribute("data-id")].img_url;
            dispatch(changeNewsParam(type, ima.getAttribute("data-id"), "img_url", ""));
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
        let news = Object.getOwnPropertyNames(info[type])
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
            dispatch(changeNewsDel(type, par.getAttribute("data-id")));
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
        setActived(".panNew");
        return function() {
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