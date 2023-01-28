import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import adminsCSS from './admins.module.css';
import {admins, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, adminsInfo;

export function Admins() {
    adminsInfo = useSelector(admins);
    const themeState = useSelector(themes);
    if(!dispatch) setActNew(4);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Admins.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(adminsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        return function() {
            console.log("I was triggered during componentWillUnmount Admins.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
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
                            <div className={adminsCSS.nav_iZag}>
                                <div className={adminsCSS.nav_i} id={adminsCSS.nav_i}>
                                    Администраторы портала
                                </div>
                                {Object.getOwnPropertyNames(adminsInfo).map(param =>
                                    <div key={param}>
                                        <div className={adminsCSS.nav_i+" "+adminsCSS.nav_iZag1} id={adminsCSS.nav_i}>
                                            {adminsInfo[param]}
                                        </div>
                                        <img src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
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