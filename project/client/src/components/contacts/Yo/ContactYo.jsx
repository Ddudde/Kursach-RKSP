import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from './contactYo.module.css';
import {contactsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../ContactMain";
import warn from "../../../media/warn_big.png";

let dispatch, contactsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function ContactYo() {
    contactsInfo = useSelector(contactsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
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
            </Helmet>
            <div className={contactCSS.AppHeader}>
                {(Object.getOwnPropertyNames(contactsInfo.contactsYo.numbers).length == 0 && !contactsInfo.contactsYo.imageUrl) ?
                    <div className={contactCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={contactCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <section className={contactCSS.center_colum}>
                        <div className={contactCSS.blockTel}>
                            <h1>ТЕЛЕФОНЫ ДЛЯ СВЯЗИ</h1>
                            {Object.getOwnPropertyNames(contactsInfo.contactsYo.numbers).map(param =>
                                <p key={param}><a href={"tel:" + contactsInfo.contactsYo.numbers[param].number}>{contactsInfo.contactsYo.numbers[param].title}</a></p>
                            )}
                        </div>
                        <div className={contactCSS.map+" "+contactCSS.blockTel}>
                            <h1>КАРТА ПРОЕЗДА</h1>
                            <p><img className={contactCSS.imk} alt="banner" src={contactsInfo.contactsYo.imageUrl+''} onError={errorLoad}/></p>
                        </div>
                    </section>
                }
            </div>
        </>
    )
}
export default ContactYo;