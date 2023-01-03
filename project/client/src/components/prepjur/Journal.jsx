import React, {useEffect, useRef} from "react";
import journalCSS from './journal.module.css';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pjournal, states, themes} from "../../store/selector";
import {setActived} from "../main/Main";
import mapd from "../../media/Map_symbolD.png";
import mapl from "../../media/Map_symbolL.png";
import {changePjournal} from "../../store/actions";
import warn from "../../media/warn_big.png";

let act, act_new, elems, elems1, lin, st, jourInfo, dispatch, theme, maxEl, lMonth, mb, wmb, ev, timid, resiz, mor, lmor, updf, paels, updlb, lel, eles, gr;
act = ".panYo";
act_new = "";
elems = 0;
elems1 = 0;
eles = [];
st = {};
maxEl = 0;
paels = 0;
lMonth = 0;
mb = false;
wmb = false;
resiz = false;
updf = false;
updlb = false;
gr = {};

function getPan(name, namecl, link, dopClass, fun, inc) {
    let cl = "pan" + namecl;
    st["."+cl] = elems;
    if (!inc) elems++;
    let cla = [journalCSS.nav_i, journalCSS.nav_iJur, "pa", cl, dopClass ? dopClass : ""].join(" ");
    return fun ? (
        <div className={cla} id={journalCSS.nav_i} onClick={fun} data-id={namecl}>
            {name}
        </div>
    ) : (
        <Link className={cla} id={journalCSS.nav_i} to={link} onClick={() => {setActivedMy("."+cl)}} data-id={namecl}>
            {name}
        </Link>
    )
}

function getPredms() {
    elems++;
    return (
        <div className={journalCSS.predBlock}>
            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+' '+journalCSS.predEl} id={journalCSS.nav_i}>
                <div className={journalCSS.predInf}>Предмет:</div>
                <div className={journalCSS.predText}>{jourInfo.predms[jourInfo.predm]}</div>
                <img className={journalCSS.mapImg} src={theme.theme_ch ? mapd : mapl} title="Перейти в профиль" alt=""/>
            </div>
            <div className={journalCSS.predMenu}>
                {jourInfo.predms && Object.getOwnPropertyNames(jourInfo.predms).map(param1 =>
                    <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+' '+journalCSS.pred} id={journalCSS.nav_i} onClick={() => (dispatch(changePjournal("predm", param1)))}>
                        <div className={journalCSS.predInf}>Предмет:</div>
                        <div className={journalCSS.predText}>{jourInfo.predms[param1]}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

function getDate(dat) {
    let d = dat.split('.');
    return new Date("20" + [d[2], d[1], d[0]].join("-"));
}

function getDay(da) {
    let date = getDate(da), month = date.toLocaleString("ru", {month:"2-digit"}), dat = date.toLocaleString("ru", month == lMonth ? {day:"2-digit"} : {day:"2-digit", month:"short"});
    lMonth = month;
    return dat;
}

function ele() {
    elems = 0;
    return "";
}

function ele1(x) {
    elems1 = x;
    return "";
}

function lm(x) {
    lMonth = x;
    return "";
}

function tim() {
    if (resiz) {
        resiz = false;
        overpan();
        setActivedMy(".pan" + jourInfo.group);
    }
}

function getMore(el) {
    if(!mb) {
        elems++;
        mb = true;
    }
    return (
        <>
            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+' '+journalCSS.predEl} id={journalCSS.nav_i}>
                <div className={journalCSS.predInf}>...</div>
            </div>
            <div className={journalCSS.predMenu+" pre "+journalCSS.predMM} style={{width:wmb?"200%":"100%"}}>
                <div>
                    {el.map(par =>
                        par
                    )}
                </div>
            </div>
        </>
    )
}

function overpan() {
    let pan, wid, pa, morel, lin;
    eles = [];
    lin = document.querySelector("#lin");
    morel = document.querySelector("#mor");
    pan = document.querySelector("."+journalCSS.panel);
    pa = document.querySelectorAll("."+journalCSS.panel + " > .pa");
    for(let pae of pa) {
        if(pae.style.display) pae.style.display = "";
    }
    if(morel) mor = React.cloneElement( mor, { style: {display: "none"}});
    lin.style.display = "none";
    wid = pan.scrollWidth - pan.getBoundingClientRect().width;
    lin.style.display = "";
    if(wid > 0) {
        let i = -1;
        for(let el, i1 = 0; wid > 0 || i1 < 2; i--) {
            if(wid < 0) i1++;
            el = pa[pa.length+i];
            wid -= el.getBoundingClientRect().width;
            let elc = gr[el.getAttribute("data-id")];
            let elr = React.cloneElement(elc, {className: elc.props.className+" "+journalCSS.pred});
            eles[eles.length] = elr;
            el.style.display = "none";
            elems--;
        }
        lel = pa[pa.length+i];
        wmb = eles.length > 2;
        updMor();
        pan.style.gridTemplate = "auto/repeat(" + elems + ",1fr)";
    }
    setActivedMy(".pan" + jourInfo.group);
}

function updMor() {
    let gmor = getMore(eles);
    if(eles.length > 0) {
        mor = React.cloneElement( lmor, { children: gmor.props.children, style: {display: "flex"}});
        updf = true;
        dispatch(changePjournal("group", jourInfo.group));
    }
}

function replGr(x) {
    let elc = gr[lel.getAttribute("data-id")];
    let elr = React.cloneElement(elc, {className: elc.props.className+" "+journalCSS.pred});
    for (let i = 0; i < eles.length; i++){
        if(eles[i].props["data-id"] == x.getAttribute("data-id")) eles[i] = elr;
    }
    lel.style.display = "none";
    x.style.display = "";
    lel = x;
    updMor();
}

function setActivedMy(name) {
    let ao = document.querySelector(act), an = document.querySelector(name), con = 0;
    if(ao) ao.setAttribute('data-act', '0');
    if(an) {
        act = name;
        an.setAttribute('data-act', '1');
        if(an.style.display == "none") replGr(an);
    }
    if(lin) {
        con = Math.floor(an.getBoundingClientRect().width);
        lin.style.left = Math.round(an.getBoundingClientRect().left)+"px";
        lin.style.width = con+"px";
    }
}

export function setActNew(name) {
    act_new = name;
}

export function Journal() {
    const cState = useSelector(states);
    theme = useSelector(themes);
    jourInfo = useSelector(pjournal);
    maxEl = Object.getOwnPropertyNames(jourInfo.jur.day).length;
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        lin = document.querySelector("#lin");
        lmor = <div className={journalCSS.predBlock} id="mor" style={{display: "none"}}/>;
        mor = React.cloneElement( lmor, {});
        console.log("I was triggered during componentDidMount Journal.jsx");
        window.onresize = (e) => {
            if(!resiz) {
                resiz = true;
                ev = e;
                timid = setTimeout(tim,1000);
            }
        };
        setActived(".panJur");
        let scr = document.querySelector("." + journalCSS.days);
        scr.scrollTo(scr.scrollWidth, 0);
        return function() {
            window.onresize = undefined;
            clearTimeout(timid);
            console.log("I was triggered during componentWillUnmount Journal.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        if(updf){
            updf = false;
            return;
        }
        let el = document.querySelectorAll("."+journalCSS.panel + " > .pa");
        if(updlb) {
            updlb = false;
            overpan();
        }
        if(el.length != paels) {
            updlb = true;
            dispatch(changePjournal("group", jourInfo.group));
        }
        paels = el.length;
        let nam = ".pan" + jourInfo.group;
        if(act != nam) setActivedMy(nam);
        console.log('componentDidUpdate Journal.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Журнал</title>
            </Helmet>
            <div className={journalCSS.AppHeader}>
                {Object.getOwnPropertyNames(jourInfo.jur.kids).length == 0 ?
                    <div className={journalCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={journalCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить
                            информацию.
                        </div>
                    </div> :
                    <>
                        <nav className={journalCSS.panel} style={{gridTemplate: "auto/repeat(" + elems + ",1fr)"}} id="her">
                            {ele()}
                            {Object.getOwnPropertyNames(jourInfo.groups).map(param =>
                                gr[param] = getPan(jourInfo.groups[param], param, "", undefined, () => (dispatch(changePjournal("group", param))))
                            )}
                            {mor}
                            {getPredms()}
                            <div className={journalCSS.lin} style={{width: (100 / elems) + "%"}} id={"lin"}/>
                        </nav>
                        <div className={journalCSS.blockPredm}>
                            <div className={journalCSS.predm}>
                                <div className={journalCSS.days}>
                                    <div className={journalCSS.daysGrid} style={{gridTemplate: "15vh /20vw repeat(" + (maxEl + 1) + ", 2vw)"}}>
                                        <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" "+journalCSS.namd} id={journalCSS.nav_i}>
                                            <br/>
                                        </div>
                                        <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" "+journalCSS.nav_iBr} id={journalCSS.nav_i}>
                                            <br/>
                                        </div>
                                        {lm(0)}
                                        {Object.getOwnPropertyNames(jourInfo.jur.day).map(param =>
                                            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" "+journalCSS.nav_iTextD} id={journalCSS.nav_i}>
                                                {getDay(jourInfo.jur.day[param])}
                                            </div>
                                        )}
                                        <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur}>
                                            <div className={journalCSS.nav_iText}>
                                                Средняя
                                            </div>
                                        </div>
                                    </div>
                                    {Object.getOwnPropertyNames(jourInfo.jur.kids).map(param =>
                                        <div className={journalCSS.predmGrid} style={{gridTemplate: "5vh /20vw repeat(" + (maxEl + 1) + ", 2vw)"}} id={param}>
                                            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" nam " + journalCSS.nam} id={journalCSS.nav_i}>
                                                {param}
                                            </div>
                                            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" "+journalCSS.nav_iBr} id={journalCSS.nav_i}>
                                                <br/>
                                            </div>
                                            {ele1(0)}
                                            {Object.getOwnPropertyNames(jourInfo.jur.kids[param].days).map(param1 => <>
                                                    {parseInt(param1) - elems1 > 0 && Array(parseInt(param1) - elems1).fill('').map(param =>
                                                        <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur} id={journalCSS.nav_i}>
                                                            <br/>
                                                        </div>
                                                    )}
                                                    {ele1(parseInt(param1)+1)}
                                                    <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur} id={journalCSS.nav_i}>
                                                        {jourInfo.jur.kids[param].days[param1].mark}
                                                        {jourInfo.jur.kids[param].days[param1].weight > 1 && (<div className={journalCSS.nav_i+' '+journalCSS.nav_iJur+" "+journalCSS.nav_iWeight} id={journalCSS.nav_i}>
                                                            {jourInfo.jur.kids[param].days[param1].weight}
                                                        </div>)}
                                                    </div>
                                                </>
                                            )}
                                            {Object.getOwnPropertyNames(jourInfo.jur.kids[param].days)[Object.getOwnPropertyNames(jourInfo.jur.kids[param].days).length-1] < maxEl-1 && Array(maxEl-1-Object.getOwnPropertyNames(jourInfo.jur.kids[param].days)[Object.getOwnPropertyNames(jourInfo.jur.kids[param].days).length-1]).fill('').map(param =>
                                                <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur} id={journalCSS.nav_i}>
                                                    <br/>
                                                </div>
                                            )}
                                            <div className={journalCSS.nav_i+' '+journalCSS.nav_iJur + " " + journalCSS.nav_iTextM}>
                                                {jourInfo.jur.kids[param].avg.mark}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={journalCSS.blockInstrum}>
                            <div className={journalCSS.nav_i} id={journalCSS.nav_i}>

                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
export default Journal;