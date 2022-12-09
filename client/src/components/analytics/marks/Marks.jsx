import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import marksCSS from './marks.module.css';
import {contactsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../AnalyticsMain";

let dispatch, contactsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function Marks() {
    contactsInfo = useSelector(contactsSelec);
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
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panIto");
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
        console.log('componentDidUpdate Marks.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Итоговые оценки</title>
            </Helmet>
            <div className={marksCSS.AppHeader}>
                <section className={marksCSS.center_colum}>
                    <div className={marksCSS.block}>
                        <h1>ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</h1>
                        {Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).map(param =>
                            <p key={param}><a href={"tel:" + contactsInfo.contactsPor.numbers[param].number}>{contactsInfo.contactsPor.numbers[param].title}</a></p>
                        )}
                    </div>
                    <div className={marksCSS.map+" "+marksCSS.block}>
                        <h1>КАРТА ПРОЕЗДА</h1>
                        <p><img className={marksCSS.imk} alt="banner" src={contactsInfo.contactsPor.imageUrl+''} onError={errorLoad}/></p>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Marks;