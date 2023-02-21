import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import contactCSS from '../contactMain.module.css';
import {contacts, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, ele, errLoadAddIm, errorLoad, onClose, onDel, onEdit, onFin, setActNew} from "../ContactMain";
import ed from "../../../media/edit.png";
import yes from "../../../media/yes.png";
import no from "../../../media/no.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, contactsInfo, type, cState, inps, pari, errText;
type = "Yo";
inps = {};
pari = {elems: 0, paels: 0};
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
let [_, forceUpdate] = [];

export function ContactYo() {
    contactsInfo = useSelector(contacts);
    cState = useSelector(states);
    if(!dispatch) setActNew(1);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
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
        for(let el of document.querySelectorAll("." + contactCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
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
        <div className={contactCSS.header}>
            <Helmet>
                <title>Контакты учебного центра</title>
            </Helmet>
            {(!contactsInfo[type].contact && !contactsInfo[type].mapPr.imgUrl && !(cState.auth && cState.role == 3)) ?
                    <ErrFound text={errText}/>
                :
                    <div className={contactCSS.block}>
                        {(cState.auth && cState.role == 3) ?
                            <section className={contactCSS.center_colum}>
                                <div className={contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Телефоны для связи</h1>
                                    <div className={contactCSS.te} data-st="0">
                                        <div className={contactCSS.fi}>
                                            <pre className={contactCSS.field}>
                                                {contactsInfo[type].contact}
                                            </pre>
                                            <img className={contactCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, inps, type, contactsInfo)} title="Редактировать" alt=""/>
                                        </div>
                                        <div className={contactCSS.ed}>
                                            <div className={contactCSS.preinf}>
                                                Текст:
                                            </div>
                                            <textarea className={contactCSS.inp+" "+contactCSS.inparea} id={"inpntt_c"} defaultValue={contactsInfo[type].contact} onChange={(e)=>chStatB(e, inps)}/>
                                            {ele(false, "inpntt_c", inps)}
                                            <img className={contactCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps)} title="Подтвердить" alt=""/>
                                            <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className={contactCSS.map+" "+contactCSS.blockTel}>
                                    <h1 className={contactCSS.zag}>Карта проезда</h1>
                                    <div className={contactCSS.te+" mapt"} data-st="0">
                                        <div className={contactCSS.fi}>
                                            <pre className={contactCSS.field}>
                                                {contactsInfo[type].mapPr.text}
                                            </pre>
                                            <img className={contactCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, inps, type, contactsInfo)} title="Редактировать" alt=""/>
                                        </div>
                                        <div className={contactCSS.ed}>
                                            <div className={contactCSS.preinf}>
                                                Текст:
                                            </div>
                                            <textarea className={contactCSS.inp+" "+contactCSS.inparea} id={"inpntt_m"} defaultValue={contactsInfo[type].mapPr.text} onChange={(e)=>chStatB(e, inps)}/>
                                            {ele(false, "inpntt_m", inps)}
                                            <img className={contactCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps)} title="Подтвердить" alt=""/>
                                            <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                        </div>
                                        {contactsInfo[type].mapPr.imgUrl ?
                                                <span className={contactCSS.banner}>
                                                    <img alt="banner" src={contactsInfo[type].mapPr.imgUrl} onError={(e)=>errLoadAddIm(e, type)}/>
                                                    <div className={contactCSS.upr}>
                                                        <img className={contactCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, inps, type, contactsInfo)} title="Редактировать" alt=""/>
                                                        <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onDel(e, type)} title="Удалить изображение" alt=""/>
                                                    </div>
                                                </span>
                                            :
                                                <div className={contactCSS.im} data-st={inps.edAddIm ? "1" : "0"}>
                                                    <div className={contactCSS.banner+" "+contactCSS.fi}>
                                                        <div>
                                                            <div>
                                                                Изображение
                                                            </div>
                                                            <img className={contactCSS.imgfield} src={ed} onClick={(e)=>onEdit(e, inps, type, contactsInfo)} title="Редактировать" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className={contactCSS.ed}>
                                                        <div className={contactCSS.preinf}>
                                                            Ссылка:
                                                        </div>
                                                        <input className={contactCSS.inp} id={"inpnit_m"} placeholder={"/media/tuman.jpg"} defaultValue={inps.edAddIm} onChange={(e)=>chStatB(e, inps)} type="text"/>
                                                        {ele(false, "inpnit_m", inps)}
                                                        <img className={contactCSS.imginp+" yes "} src={yes} onClick={(e)=>onFin(e, type, inps)} title="Подтвердить" alt=""/>
                                                        <img className={contactCSS.imginp} style={{marginRight: "1vw"}} src={no} onClick={(e)=>onClose(e, inps, forceUpdate)} title="Отменить изменения и выйти из режима редактирования" alt=""/>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                            </section> :
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
                        }
                    </div>
            }
        </div>
    )
}
export default ContactYo;