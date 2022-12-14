import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import journalCSS from './journal.module.css';
import {journals} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";
import {changeJournal} from "../../../store/actions";

let dispatch, journalsInfo, maxEl = 0;

function getDate(dat) {
    let d = dat.split('.');
    return new Date("20" + [d[2], d[1], d[0]].join("-"));
}

function updDateP(id) {
    for(let el of document.querySelectorAll("." + journalCSS.daysGrid + " #" + journalCSS.nav_i))
    {
        el.innerHTML = "";
    }
    for(let el of document.querySelectorAll("." + journalCSS.descr + " div"))
    {
        el.innerHTML = "<br/>";
    }
    let mas = Object.getOwnPropertyNames(journalsInfo[id].days), lMonth = 0;
    for(let i = 0, i1 = 0; i < mas.length; i++)
    {
        let date = getDate(mas[i]), month = date.toLocaleString("ru", {month:"2-digit"}), dat = date.toLocaleString("ru", month == lMonth ? {day:"2-digit"} : {day:"2-digit", month:"short"});
        lMonth = month;
        document.querySelector("." + journalCSS.daysGrid + " div:nth-child(" + (i + 2) + ")").innerHTML = dat;
        if(journalsInfo[id].days[mas[i]].type) {
            document.querySelector("." + journalCSS.descr + " div:nth-child(" + (i1 + 1) + ")").innerHTML = mas[i] + " - " + journalsInfo[id].days[mas[i]].type;
            i1++;
        }
    }
}

function updDate(e) {
    updDateP(this.id);
}

export function AnalyticsJournal() {
    journalsInfo = useSelector(journals);
    for(let el of Object.getOwnPropertyNames(journalsInfo)){
        let len = Object.getOwnPropertyNames(journalsInfo[el].days).length;
        if(len > maxEl )maxEl = len;
    }
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount AnalyticsJournal.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(journalsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panZhu");
        // dispatch(changeJournal("Англ. яз.", {
        //         days : {
        //             "14.05.22": {
        //                 mark: 5,
        //                 weight: 1,
        //                 type: "Ответ на уроке"
        //             },
        //             "15.05.22": {
        //                 mark: 5,
        //                 weight: 5,
        //                 type: "Контрольная работа"
        //             },
        //             "16.05.22": {
        //                 mark: "Н",
        //                 weight: 1
        //             },
        //             "17.05.22": {
        //                 mark: 3,
        //                 weight: 4,
        //                 type: "Самостоятельная работа"
        //             }
        //         },
        //         avg: {
        //             mark: 4
        //         }
        //     }));
        // document.querySelector("." + journalCSS.predm).addEventListener('mouseover', updDate, {capture: true});
        for(let el of document.querySelectorAll("." + journalCSS.predmGrid))
        {
            el.addEventListener('mouseover', updDate);
        }
        updDateP(Object.getOwnPropertyNames(journalsInfo)[0]);
        let scr = document.querySelector("." + journalCSS.days);
        scr.scrollTo(scr.scrollWidth, 0);
        for(let el of document.querySelectorAll("." + journalCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount AnalyticsJournal.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + journalCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate AnalyticsJournal.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Журнал</title>
            </Helmet>
            <div className={journalCSS.AppHeader}>
                {Object.getOwnPropertyNames(journalsInfo).length == 0 ?
                    <div className={journalCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={journalCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={journalCSS.blockPredm}>
                        <div className={journalCSS.predm}>
                            <div className={journalCSS.days}>
                                <div className={journalCSS.daysGrid} style={{gridTemplate: "15vh /22vw repeat(" + (maxEl + 1) + ", 2vw)"}}>
                                    <div className={journalCSS.nav_i} id={journalCSS.nav_i}>
                                        <br/>
                                    </div>
                                    {Array(maxEl).fill('').map(param =>
                                        <div className={journalCSS.nav_i+" "+journalCSS.nav_iTextD} id={journalCSS.nav_i}>
                                            <br/>
                                        </div>
                                    )}
                                    <div className={journalCSS.nav_i}>
                                        <div className={journalCSS.nav_iText}>
                                            Средняя
                                        </div>
                                    </div>
                                </div>
                                {Object.getOwnPropertyNames(journalsInfo).map(param =>
                                    <div className={journalCSS.predmGrid} style={{gridTemplate: "5vh /20vw repeat(" + (maxEl + 2) + ", 2vw)"}} id={param}>
                                        <div className={journalCSS.nav_i+" nam " + journalCSS.nam} id={journalCSS.nav_i}>
                                            {param}
                                        </div>
                                        <div className={journalCSS.nav_i+" "+journalCSS.nav_iBr} id={journalCSS.nav_i}>
                                            <br/>
                                        </div>
                                        <div className={journalCSS.nav_i+" "+journalCSS.nav_iBr} id={journalCSS.nav_i}>
                                            <br/>
                                        </div>
                                        {Object.getOwnPropertyNames(journalsInfo[param].days).map(param1 =>
                                            <div className={journalCSS.nav_i} id={journalCSS.nav_i}>
                                                {journalsInfo[param].days[param1].mark}
                                                {journalsInfo[param].days[param1].weight > 1 && (<div className={journalCSS.nav_i+" "+journalCSS.nav_iWeight} id={journalCSS.nav_i}>
                                                    {journalsInfo[param].days[param1].weight}
                                                </div>)}
                                            </div>
                                        )}
                                        {Object.getOwnPropertyNames(journalsInfo[param].days).length < maxEl && Array(maxEl-Object.getOwnPropertyNames(journalsInfo[param].days).length).fill('').map(param =>
                                            <div className={journalCSS.nav_i} id={journalCSS.nav_i}>
                                                <br/>
                                            </div>
                                        )}
                                        <div className={journalCSS.nav_i + " " + journalCSS.nav_iTextM}>
                                            {journalsInfo[param].avg.mark}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={journalCSS.descr}>
                                {Array(maxEl).fill('').map(param =>
                                    <div className={journalCSS.nav_i+" "+journalCSS.nav_iTextDescr} id={journalCSS.nav_i}>
                                        <br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default AnalyticsJournal;