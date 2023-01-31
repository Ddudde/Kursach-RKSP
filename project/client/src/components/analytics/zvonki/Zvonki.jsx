import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import zvonkiCSS from './zvonki.module.css';
import {zvonki} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../AnalyticsMain";
import warn from "../../../media/warn_big.png";

let dispatch, zvonkiInfo, incSmen = 0, les = 0;

function getSmen() {
    let s = incSmen;
    incSmen++;
    les = 0;
    return s;
}

function setSmen(inte) {
    incSmen = inte;
    return "";
}

export function Zvonki() {
    zvonkiInfo = useSelector(zvonki);
    if(!dispatch) setActNew(0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Zvonki.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(zvonkiInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panAna");
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Zvonki.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Zvonki.jsx');
    });
    return (
        <div className={zvonkiCSS.AppHeader}>
            <Helmet>
                <title>Расписание звонков</title>
            </Helmet>
            {Object.getOwnPropertyNames(zvonkiInfo).length == 0 ?
                <div className={zvonkiCSS.block}>
                    <img alt="banner" src={warn}/>
                    <div className={zvonkiCSS.block_text}>
                        К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                    </div>
                </div> :
                <div className={zvonkiCSS.blockSmen}>
                    {setSmen(1)}
                    <div className={zvonkiCSS.smena}>
                        {Object.getOwnPropertyNames(zvonkiInfo).map(param =>
                            <div className={zvonkiCSS.smenaGrid} key={param}>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    №
                                </div>
                                <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                    {getSmen()} смена
                                </div>
                                {zvonkiInfo[param].map(param1 =>
                                    <>
                                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                            {les++ + 1}
                                        </div>
                                        <div className={zvonkiCSS.nav_i} id={zvonkiCSS.nav_i}>
                                            {param1}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
export default Zvonki;