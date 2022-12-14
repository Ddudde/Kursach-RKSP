import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import adminsCSS from './admins.module.css';
import {admins, getThemeState, hteachers} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, adminsInfo;

export function Admins() {
    adminsInfo = useSelector(admins);
    const themeState = useSelector(getThemeState("theme_ch"));
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Admins.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(adminsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        setActNew(".panAdm");
        for(let el of document.querySelectorAll("." + adminsCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Admins.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + adminsCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate Admins.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Администраторы портала</title>
            </Helmet>
            <div className={adminsCSS.AppHeader}>
                {(Object.getOwnPropertyNames(adminsInfo).length == 0 && Object.getOwnPropertyNames(adminsInfo).length == 0) ?
                    <div className={adminsCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={adminsCSS.block_text}>
                            К сожалению, информация не найдена...
                        </div>
                    </div> :
                    <div className={adminsCSS.blockAdm}>
                        <div className={adminsCSS.adm}>
                            <div className={adminsCSS.nav_i+" "+adminsCSS.nav_iZag} id={adminsCSS.nav_i}>
                                Администраторы портала
                                {Object.getOwnPropertyNames(adminsInfo).map(param =>
                                    <div>
                                        <div className={adminsCSS.nav_i+" "+adminsCSS.nav_iZag1} id={adminsCSS.nav_i}>
                                            {adminsInfo[param]}
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
export default Admins;