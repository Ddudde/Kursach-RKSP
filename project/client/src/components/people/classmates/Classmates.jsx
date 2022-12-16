import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import classmatesCSS from './classmates.module.css';
import {classmates, getThemeState} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, classmatesInfo;

export function Classmates() {
    classmatesInfo = useSelector(classmates);
    const themeState = useSelector(getThemeState("theme_ch"));
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Classmates.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(classmatesInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        setActNew(".panCM");
        for(let el of document.querySelectorAll("." + classmatesCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Classmates.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + classmatesCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate Classmates.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Одноклассники</title>
            </Helmet>
            <div className={classmatesCSS.AppHeader}>
                {(Object.getOwnPropertyNames(classmatesInfo).length == 0 && Object.getOwnPropertyNames(classmatesInfo).length == 0) ?
                    <div className={classmatesCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={classmatesCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={classmatesCSS.blockCM}>
                        <div className={classmatesCSS.cm}>
                            <div className={classmatesCSS.nav_i+" "+classmatesCSS.nav_iZag} id={classmatesCSS.nav_i}>
                                Одноклассники
                                {Object.getOwnPropertyNames(classmatesInfo).map(param =>
                                    <div>
                                        <div className={classmatesCSS.nav_i+" "+classmatesCSS.nav_iZag1} id={classmatesCSS.nav_i}>
                                            {classmatesInfo[param]}
                                        </div>
                                        <img src={themeState ? profd : profl} alt=""/>
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
export default Classmates;