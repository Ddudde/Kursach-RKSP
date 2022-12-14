import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import parentsCSS from './parents.module.css';
import {getThemeState, marks, parents, teachers} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, parentsInfo;

export function Parents() {
    parentsInfo = useSelector(parents);
    const themeState = useSelector(getThemeState("theme_ch"));
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Parents.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(parentsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        setActNew(".panPar");
        for(let el of document.querySelectorAll("." + parentsCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Parents.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        for(let el of document.querySelectorAll("." + parentsCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        console.log('componentDidUpdate Parents.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Родители</title>
            </Helmet>
            <div className={parentsCSS.AppHeader}>
                {(Object.getOwnPropertyNames(parentsInfo).length == 0) ?
                    <div className={parentsCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={parentsCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={parentsCSS.blockPar}>
                        <div className={parentsCSS.par}>
                            <div className={parentsCSS.nav_i+" "+parentsCSS.nav_iZag} id={parentsCSS.nav_i}>
                                Родители
                                {Object.getOwnPropertyNames(parentsInfo).map(param =>
                                    <div className={parentsCSS.nav_i+" "+parentsCSS.nav_iZag1} id={parentsCSS.nav_i}>
                                        {parentsInfo[param].name}
                                        {Object.getOwnPropertyNames(parentsInfo[param].par).map(param1 =>
                                            <div>
                                                <div className={parentsCSS.nav_i+" "+parentsCSS.nav_iZag2} id={parentsCSS.nav_i}>
                                                    {parentsInfo[param].par[param1]}
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
export default Parents;