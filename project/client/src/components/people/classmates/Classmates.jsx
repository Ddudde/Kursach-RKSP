import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import classmatesCSS from './classmates.module.css';
import {classmates, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../pane/Pane";

let dispatch, classmatesInfo, gr;

gr = {
    groups: {
        0: "11A",
        1: "11Б",
        2: "11В",
        3: "11Г",
        4: "10А",
        5: "10Б",
        6: "10В",
        7: "10Г",
        8: "9А",
        9: "9Б",
        10: "9В",
        11: "9Г",
        12: "8А",
        13: "8Б",
        14: "8В",
        15: "8Г",
        16: "7А",
        17: "7Б",
        18: "7В",
        19: "7Г",
        20: "6А",
        21: "6Б",
        22: "6В",
        23: "6Г",
        24: "5А",
        25: "5Б",
        26: "5В",
        27: "5Г",
        28: "4А",
        29: "4Б",
        30: "4В",
        31: "4Г",
        32: "3А",
        33: "3Б",
        34: "3В",
        35: "3Г",
        36: "2А",
        37: "2Б",
        38: "2В",
        39: "2Г",
        40: "1А",
        41: "1Б",
        42: "1В",
        43: "1Г"
    },
    group: 1
};

export function Classmates() {
    classmatesInfo = useSelector(classmates);
    const cState = useSelector(states);
    const themeState = useSelector(themes);
    if(!dispatch) setActNew(2);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Classmates.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(classmatesInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Classmates.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Classmates.jsx');
    });
    return (
        <>
            <Helmet>
                <title>{cState.role == 3 ? "Обучающиеся" : "Одноклассники"}</title>
            </Helmet>
            <div className={classmatesCSS.AppHeader}>
                {(Object.getOwnPropertyNames(classmatesInfo).length == 0 && Object.getOwnPropertyNames(classmatesInfo).length == 0) ?
                    <div className={classmatesCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={classmatesCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <>
                        {(cState.auth && cState.role == 3) && <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                            <Pane gro={gr} cla={true}/>
                        </div>}
                        <div className={classmatesCSS.blockCM}>
                            <div className={classmatesCSS.cm}>
                                <div className={classmatesCSS.nav_iZag}>
                                    <div className={classmatesCSS.nav_i} id={classmatesCSS.nav_i}>
                                        Одноклассники
                                    </div>
                                    {Object.getOwnPropertyNames(classmatesInfo).map(param =>
                                        <div key={param}>
                                            <div className={classmatesCSS.nav_i+" "+classmatesCSS.nav_iZag1} id={classmatesCSS.nav_i}>
                                                {classmatesInfo[param]}
                                            </div>
                                            <img src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
export default Classmates;