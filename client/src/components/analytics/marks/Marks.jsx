import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import marksCSS from './marks.module.css';
import {marks} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";

let dispatch, marksInfo, maxEl = 0;

export function Marks() {
    marksInfo = useSelector(marks);
    for(let el of Object.getOwnPropertyNames(marksInfo.pers)){
        let len = Object.getOwnPropertyNames(marksInfo.pers[el].per).length;
        if(len > maxEl )maxEl = len;
    }
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Marks.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(marksInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panIto");
        let scr = document.querySelector("." + marksCSS.pers);
        scr.scrollTo(scr.scrollWidth, 0);
        for(let el of document.querySelectorAll("." + marksCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Marks.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + marksCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate Marks.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Итоговые оценки</title>
            </Helmet>
            <div className={marksCSS.AppHeader}>
                {Object.getOwnPropertyNames(marksInfo.pers).length == 0 && (<div className={marksCSS.block}>
                    <img alt="banner" src={warn}/>
                    <div className={marksCSS.block_text}>
                        К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                    </div>
                </div>)}
                {Object.getOwnPropertyNames(marksInfo.pers).length > 0 && (<div className={marksCSS.blockPredm}>
                    <div className={marksCSS.predm}>
                        <div className={marksCSS.pers}>
                            <div className={marksCSS.persGrid} style={{gridTemplate: "15vh /22vw repeat(" + (maxEl + 2) + ", 2vw)"}}>
                                <div className={marksCSS.nav_i} id={marksCSS.nav_i}>
                                    <br/>
                                </div>
                                {marksInfo.namePers.map(param =>
                                    <div className={marksCSS.nav_i+" "+marksCSS.nav_iTextD} id={marksCSS.nav_i}>
                                        {param}
                                    </div>
                                )}
                                <div className={marksCSS.nav_i}>
                                    <div className={marksCSS.nav_iText}>
                                        Годовая
                                    </div>
                                </div>
                                <div className={marksCSS.nav_i}>
                                    <div className={marksCSS.nav_iText}>
                                        Итоговая
                                    </div>
                                </div>
                            </div>
                            {Object.getOwnPropertyNames(marksInfo.pers).map(param => <div className={marksCSS.predmGrid} style={{gridTemplate: "5vh /20vw repeat(" + (maxEl + 3) + ", 2vw)"}} id={param}>
                                    <div className={marksCSS.nav_i+" nam " + marksCSS.nam} id={marksCSS.nav_i}>
                                        {param}
                                    </div>
                                    <div className={marksCSS.nav_i+" "+marksCSS.nav_iBr} id={marksCSS.nav_i}>
                                        <br/>
                                    </div>
                                    <div className={marksCSS.nav_i+" "+marksCSS.nav_iBr} id={marksCSS.nav_i}>
                                        <br/>
                                    </div>
                                    {Object.getOwnPropertyNames(marksInfo.pers[param].per).map(param1 =>
                                        <div className={marksCSS.nav_i} id={marksCSS.nav_i}>
                                            {marksInfo.pers[param].per[param1]}
                                        </div>
                                    )}
                                    {Object.getOwnPropertyNames(marksInfo.pers[param].per).length < maxEl && Array(maxEl-Object.getOwnPropertyNames(marksInfo.pers[param].per).length).fill('').map(param =>
                                        <div className={marksCSS.nav_i} id={marksCSS.nav_i}>
                                            <br/>
                                        </div>
                                    )}
                                    <div className={marksCSS.nav_i + " " + marksCSS.nav_iTextM}>
                                        {marksInfo.pers[param].year}
                                    </div>
                                    <div className={marksCSS.nav_i + " " + marksCSS.nav_iTextM}>
                                        {marksInfo.pers[param].itog}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Marks;