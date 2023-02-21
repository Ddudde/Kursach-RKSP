import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from '../contactMain.module.css';
import {contacts} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {errorLoad, setActNew} from "../ContactMain";
import ErrFound from "../../other/error/ErrFound";

let dispatch, contactsInfo, type, errText;
type = "Por";
errText = "К сожалению, информация не найдена... Ждите новой информации.";

export function ContactPor() {
    contactsInfo = useSelector(contacts);
    if(!dispatch) setActNew(0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount ContactPor.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(contactsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        return function() {
            dispatch = undefined;
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
        <div className={contactCSS.header}>
            <Helmet>
                <title>Контакты портала</title>
            </Helmet>
            {(!contactsInfo[type].contact && !contactsInfo[type].mapPr.imgUrl) ?
                    <ErrFound text={errText}/>
                :
                    <div className={contactCSS.block}>
                        <section className={contactCSS.center_colum}>
                            <div className={contactCSS.blockTel}>
                                <h1 className={contactCSS.zag}>Телефоны для связи</h1>
                                <pre className={contactCSS.field}>
                                    {contactsInfo[type].contact}
                                </pre>
                            </div>
                            <div className={contactCSS.map+" "+contactCSS.blockTel}>
                                <h1 className={contactCSS.zag}>Карта проезда</h1>
                                <pre className={contactCSS.field}>
                                    {contactsInfo[type].mapPr.text}
                                </pre>
                                <span className={contactCSS.banner}>
                                    <img alt="banner" src={contactsInfo[type].mapPr.imgUrl+''} onError={errorLoad}/>
                                </span>
                            </div>
                        </section>
                    </div>
            }
        </div>
    )
}
export default ContactPor;