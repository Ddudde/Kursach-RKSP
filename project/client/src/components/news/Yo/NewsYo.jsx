import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from '../newsMain.module.css';
import {news, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, ele, errLoadAddIm, errorLoad, onClose, onDel, onEdit, onFin, setActNew} from "../NewsMain";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import ed from "../../../media/edit.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, newsInfo, type, inps, pari, cState, errText;
type = "Yo";
inps = {inpntt : "Текст", inpnzt : "Заголовок", inpndt: new Date().toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"numeric"})};
pari = {elems: 0, paels: 0};
errText = "Новостей нет... Кажется, что новостная лента пустует не заслужено? Попробуйте попросить завуча заполнить информацию."

let [_, forceUpdate] = [];

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
    ns = (
        <div className={newsCSS.ns}>
            <div className={newsCSS.za} data-st="0">
                <div className={newsCSS.fi}>
                    <h2 className={newsCSS.zag}>
                        {zag}
                    </h2>
                    <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Заголовок:
                    </div>
                    <input className={newsCSS.inp} id={zagi} defaultValue={zag} data-id={x ? x : undefined} onChange={(e)=>chStatB(e, inps)}/>
                    {ele(false, zagi, inps)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, newsInfo)} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.da} data-st="0">
                <div className={newsCSS.fi}>
                    <span className={newsCSS.date}>
                        {dat}
                    </span>
                    <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Дата:
                    </div>
                    <input className={newsCSS.inp} id={dati} data-id={x ? x : undefined} placeholder={"ДД.ММ.ГГГГ"} defaultValue={dat} pattern="^[0-9.]+$" onChange={(e)=>chStatB(e, inps)}/>
                    {ele(false, dati, inps)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, newsInfo)} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.te} data-st="0">
                {im ?
                        <span className={newsCSS.banner}>
                            <img alt="banner" data-id={x ? x : undefined} src={im} onError={(e)=>errLoadAddIm(e, type, inps, forceUpdate)}/>
                            <div className={newsCSS.upr}>
                                <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)} title="Редактировать" alt=""/>
                                <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, type, inps, forceUpdate)} title="Удалить изображение" alt=""/>
                            </div>
                        </span>
                    :
                        <div className={newsCSS.im} data-st={inps.edAddIm ? "1" : "0"}>
                            <div className={newsCSS.banner+" "+newsCSS.fi}>
                                <div>
                                    Изображение
                                </div>
                                <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)} title="Редактировать" alt=""/>
                            </div>
                            <div className={newsCSS.ed}>
                                <div className={newsCSS.preinf}>
                                    Ссылка:
                                </div>
                                <input className={newsCSS.inp} id={imi} data-id={x ? x : undefined} placeholder={"/media/tuman.jpg"} defaultValue={inps.edAddIm} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                {ele(false, imi, inps)}
                                <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, newsInfo)} title="Подтвердить" alt=""/>
                                <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                            </div>
                        </div>
                }
                <div className={newsCSS.fi}>
                    <pre className={newsCSS.field}>
                        {tex}
                    </pre>
                    <img className={newsCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)} title="Редактировать" alt=""/>
                </div>
                <div className={newsCSS.ed}>
                    <div className={newsCSS.preinf}>
                        Текст:
                    </div>
                    <textarea className={newsCSS.inp+" "+newsCSS.inparea} data-id={x ? x : undefined} id={texi} defaultValue={tex} onChange={(e)=>chStatB(e, inps)}/>
                    {ele(false, texi, inps)}
                    <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, newsInfo)} title="Подтвердить" alt=""/>
                    <img className={newsCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                </div>
            </div>
            <div className={newsCSS.upr} data-id={x ? x : undefined}>
                {!x && <img className={newsCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps, forceUpdate, newsInfo)} title="Подтвердить" alt=""/>}
                <img className={newsCSS.imginp+" "} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, type, inps, forceUpdate)} title={x ? "Удалить новость" : "Отменить изменения и выйти из режима редактирования"} alt=""/>
            </div>
        </div>
    );
    return x ? (ns) : (
        <div className={newsCSS.news_line} data-st="0">
            <div className={newsCSS.nav_i+" "+newsCSS.link} id={newsCSS.nav_i} onClick={(e)=>onEdit(e, type, inps, forceUpdate, newsInfo)}>
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
            chStatB({target: el}, inps);
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
        <div className={newsCSS.header}>
            <Helmet>
                <title>Объявления учебного центра</title>
            </Helmet>
            {(cState.auth && cState.role == 3) ?
                    <div className={newsCSS.block}>
                        <section className={newsCSS.center_colum}>
                            {getAdd()}
                            {Object.getOwnPropertyNames(newsInfo[type]).reverse().map(param =>
                                <div className={newsCSS.news_line} data-st="1" key={param}>
                                    {getAdd(param)}
                                </div>
                            )}
                        </section>
                    </div>
                :
                    Object.getOwnPropertyNames(newsInfo[type]).length == 0 ?
                            <ErrFound text={errText}/>
                        :
                            <div className={newsCSS.block}>
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
                            </div>
            }
        </div>
    )
}
export default NewsYo;