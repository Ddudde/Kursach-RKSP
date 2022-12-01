import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from './contactYo.module.css';
import {contactsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {changeContacts} from "../../../store/actions";
import {setActNew} from "../ContactMain";

let dispatch, contactsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function ContactYo() {
    contactsInfo = useSelector(contactsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount ContactYo.jsx");
        // dispatch(changeContacts("Yo", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Yo", "imageUrl"));
        // dispatch(changeContacts("Yo", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Yo", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Yo", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsYo.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panCon");
        setActNew(".panYo");
        for(let el of document.querySelectorAll("." + contactCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount ContactYo.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ContactYo.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Контакты учебного центра</title>
                <link rel="canonical" href="http://example.com/example" />
            </Helmet>
            <div className={contactCSS.AppHeader}>
                <section className={contactCSS.center_colum}>
                    <div className={contactCSS.block}>
                        <h1>ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</h1>
                        {Object.getOwnPropertyNames(contactsInfo.contactsYo.numbers).map(param =>
                            <p key={param}><a href={"tel:" + contactsInfo.contactsYo.numbers[param].number}>{contactsInfo.contactsYo.numbers[param].title}</a></p>
                        )}
                    </div>
                    <div className={contactCSS.map+" "+contactCSS.block}>
                        <h1>КАРТА ПРОЕЗДА</h1>
                        <p><img className={contactCSS.imk} alt="banner" src={contactsInfo.contactsYo.imageUrl+''} onError={errorLoad}/></p>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ContactYo;