import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import hteachersCSS from './hteachers.module.css';
import {hteachers, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";

let dispatch, hteachersInfo;

export function HTeachers() {
    hteachersInfo = useSelector(hteachers);
    const themeState = useSelector(themes);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount HTeachers.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(hteachersInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        setActNew(".panHT");
        return function() {
            console.log("I was triggered during componentWillUnmount HTeachers.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate HTeachers.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Завучи</title>
            </Helmet>
            <div className={hteachersCSS.AppHeader}>
                {(Object.getOwnPropertyNames(hteachersInfo).length == 0 && Object.getOwnPropertyNames(hteachersInfo).length == 0) ?
                    <div className={hteachersCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={hteachersCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <div className={hteachersCSS.blockHTea}>
                        <div className={hteachersCSS.htea}>
                            <div className={hteachersCSS.nav_iZag}>
                                <div className={hteachersCSS.nav_i} id={hteachersCSS.nav_i}>
                                    Завучи
                                </div>
                                {Object.getOwnPropertyNames(hteachersInfo).map(param =>
                                    <div>
                                        <div className={hteachersCSS.nav_i+" "+hteachersCSS.nav_iZag1} id={hteachersCSS.nav_i}>
                                            {hteachersInfo[param]}
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
export default HTeachers;