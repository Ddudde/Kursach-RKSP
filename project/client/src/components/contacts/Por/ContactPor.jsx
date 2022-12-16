import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from './contactPor.module.css';
import {contactsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../ContactMain";
import warn from "../../../media/warn_big.png";

let dispatch, contactsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function ContactPor() {
    contactsInfo = useSelector(contactsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount ContactPor.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panCon");
        setActNew(".panPor");
        return function() {
            console.log("I was triggered during componentWillUnmount ContactPor.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ContactPor.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Контакты портала</title>
            </Helmet>
            <div className={contactCSS.AppHeader}>
                {(Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).length == 0 && !contactsInfo.contactsPor.imageUrl) ?
                    <div className={contactCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={contactCSS.block_text}>
                            К сожалению, информация не найдена... Ждите новой информации.
                        </div>
                    </div> :
                    <section className={contactCSS.center_colum}>
                        <div className={contactCSS.blockTel}>
                            <h1>ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</h1>
                            {Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).map(param =>
                                <p key={param}><a href={"tel:" + contactsInfo.contactsPor.numbers[param].number}>{contactsInfo.contactsPor.numbers[param].title}</a></p>
                            )}
                        </div>
                        <div className={contactCSS.map+" "+contactCSS.blockTel}>
                            <h1>КАРТА ПРОЕЗДА</h1>
                            <p><img className={contactCSS.imk} alt="banner" src={contactsInfo.contactsPor.imageUrl+''} onError={errorLoad}/></p>
                        </div>
                    </section>
                }
            </div>
        </>
    )
}
export default ContactPor;