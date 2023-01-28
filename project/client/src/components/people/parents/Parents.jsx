import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import parentsCSS from './parents.module.css';
import {parents, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../PeopleMain";
import warn from "../../../media/warn_big.png";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../pane/Pane";

let dispatch, parentsInfo, gr;

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

export function Parents() {
    parentsInfo = useSelector(parents);
    const themeState = useSelector(themes);
    const cState = useSelector(states);
    if(!dispatch) setActNew(3);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Parents.jsx");
        // dispatch(changeContacts("Por", "imageUrl", '/media/tuman.jpg'));
        // dispatch(changeContacts("Por", "imageUrl"));
        // dispatch(changeContacts("Por", "id_0", '8 (800) 555 35 37', '+78005553537'));
        // dispatch(changeContacts("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeContacts("Por", "id_" + Object.getOwnPropertyNames(parentsInfo.contactsPor.numbers).length, '8 (800) 555 35 37', '+78005553537'));
        // }, 5000);
        setActived(".panPep");
        return function() {
            console.log("I was triggered during componentWillUnmount Parents.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Parents.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Родители</title>
            </Helmet>
            <div className={parentsCSS.AppHeader}>
                {(Object.getOwnPropertyNames(parentsInfo).length == 0) ?
                    <div className={parentsCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={parentsCSS.block_text}>
                            К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <>
                        {(cState.auth && cState.role == 3) && <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                            <Pane gro={gr}/>
                        </div>}
                        <div className={parentsCSS.blockPar}>
                            <div className={parentsCSS.par}>
                                <div className={parentsCSS.nav_iZag}>
                                    <div className={parentsCSS.nav_i} id={parentsCSS.nav_i}>
                                        Родители
                                    </div>
                                    {Object.getOwnPropertyNames(parentsInfo).map(param =>
                                        <div className={parentsCSS.nav_iZag+" "+parentsCSS.nav_iZag1} key={param}>
                                            <div className={parentsCSS.nav_i} id={parentsCSS.nav_i}>
                                                {parentsInfo[param].name}
                                            </div>
                                            {Object.getOwnPropertyNames(parentsInfo[param].par).map(param1 =>
                                                <div key={param1}>
                                                    <div className={parentsCSS.nav_i+" "+parentsCSS.nav_iZag2} id={parentsCSS.nav_i}>
                                                        {parentsInfo[param].par[param1]}
                                                    </div>
                                                    <img src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                                </div>
                                            )}
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
export default Parents;