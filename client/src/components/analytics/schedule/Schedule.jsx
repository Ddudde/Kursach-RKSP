import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import scheduleCSS from './schedule.module.css';
import {contactsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../AnalyticsMain";

let dispatch, contactsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function Schedule() {
    contactsInfo = useSelector(contactsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Schedule.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        setActNew(".panRas");
        for(let el of document.querySelectorAll("." + scheduleCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount Schedule.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Schedule.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Расписание</title>
            </Helmet>
            <div className={scheduleCSS.AppHeader}>
                <section className={scheduleCSS.center_colum}>
                    <div className={scheduleCSS.block}>
                        <h1>ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</h1>
                        {Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).map(param =>
                            <p key={param}><a href={"tel:" + contactsInfo.contactsPor.numbers[param].number}>{contactsInfo.contactsPor.numbers[param].title}</a></p>
                        )}
                    </div>
                    <div className={scheduleCSS.map+" "+scheduleCSS.block}>
                        <h1>КАРТА ПРОЕЗДА</h1>
                        <p><img className={scheduleCSS.imk} alt="banner" src={contactsInfo.contactsPor.imageUrl+''} onError={errorLoad}/></p>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Schedule;