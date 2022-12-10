import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import periodsCSS from './periods.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";
import {periods} from "../../../store/selector";

let dispatch, periodsInfo;

export function Periods() {
    periodsInfo = useSelector(periods);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Periods.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(periodsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panPer");
        for(let el of document.querySelectorAll("." + periodsCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Periods.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + periodsCSS.AppHeader + " *")) {
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        }
        console.log('componentDidUpdate Periods.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Расписание периодов</title>
            </Helmet>
            <div className={periodsCSS.AppHeader}>
                {Object.getOwnPropertyNames(periodsInfo).length == 0 && (<div className={periodsCSS.block}>
                    <img alt="banner" src={warn}/>
                    <div className={periodsCSS.block_text}>
                        К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                    </div>
                </div>)}
                {Object.getOwnPropertyNames(periodsInfo).length > 0 && (<div className={periodsCSS.blockSmen}>
                    <div className={periodsCSS.smena}>
                        <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                            Название учебного периода
                        </div>
                        <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                            Период
                        </div>
                        {Object.getOwnPropertyNames(periodsInfo).map(param =>
                            <>
                                <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                    {periodsInfo[param].name}
                                </div>
                                <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                    {periodsInfo[param].per}
                                </div>
                            </>
                        )}
                    </div>
                </div>)}
            </div>
        </>
    )
}
export default Periods;