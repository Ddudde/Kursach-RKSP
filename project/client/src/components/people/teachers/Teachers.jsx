import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import teachersCSS from './teachers.module.css';
import {getThemeState, teachers} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, teachersInfo;

export function Teachers() {
    teachersInfo = useSelector(teachers);
    const themeState = useSelector(getThemeState("theme_ch"));
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Teachers.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(teachersInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        setActNew(".panTea");
        for(let el of document.querySelectorAll("." + teachersCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Teachers.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + teachersCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate Teachers.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Педагоги</title>
            </Helmet>
            <div className={teachersCSS.AppHeader}>
                {(Object.getOwnPropertyNames(teachersInfo.my).length == 0 && Object.getOwnPropertyNames(teachersInfo.nemy).length == 0) ?
                    <div className={teachersCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={teachersCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={teachersCSS.blockTea}>
                        <div className={teachersCSS.tea}>
                            <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag} id={teachersCSS.nav_i}>
                                Мои педагоги
                                {Object.getOwnPropertyNames(teachersInfo.my).map(param =>
                                    <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag1} id={teachersCSS.nav_i}>
                                        {param}
                                        {Object.getOwnPropertyNames(teachersInfo.my[param]).map(param1 =>
                                            <div>
                                                <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                                    {teachersInfo.my[param][param1]}
                                                </div>
                                                <img src={themeState ? profd : profl} alt=""/>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag} id={teachersCSS.nav_i}>
                                Другие педагоги
                                {Object.getOwnPropertyNames(teachersInfo.nemy).map(param =>
                                    <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag1} id={teachersCSS.nav_i}>
                                        {param}
                                        {Object.getOwnPropertyNames(teachersInfo.nemy[param]).map(param1 =>
                                            <div>
                                                <div className={teachersCSS.nav_i+" "+teachersCSS.nav_iZag2} id={teachersCSS.nav_i}>
                                                    {teachersInfo.nemy[param][param1]}
                                                </div>
                                                <img src={themeState ? profd : profl} alt=""/>
                                            </div>
                                        )}
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
export default Teachers;