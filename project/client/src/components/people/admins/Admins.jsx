import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import peopleCSS from '../peopleMain.module.css';
import {admins, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, getPep, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, errText, inps, typ;
errText = "К сожалению, информация не найдена...";
typ = "admins";
inps = {inpnpt : "Фамилия И.О."};
let [_, forceUpdate] = [];

export function Admins() {
    const adminsInfo = useSelector(admins);
    const themeState = useSelector(themes);
    const cState = useSelector(states);
    if(!dispatch) setActNew(4);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Admins.jsx");
        for(let el of document.querySelectorAll("." + peopleCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
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
        <div className={peopleCSS.header}>
            <Helmet>
                <title>Администраторы портала</title>
            </Helmet>
            {Object.getOwnPropertyNames(adminsInfo).length == 0 && !(cState.auth && cState.role == 4) ?
                    <ErrFound text={errText}/>
                :
                    <div className={peopleCSS.blockPep}>
                        <div className={peopleCSS.pep}>
                            <div className={peopleCSS.nav_iZag}>
                                <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                    Администраторы портала
                                </div>
                                {(cState.auth && cState.role == 4) && getPep("Добавить администратора", typ, inps, forceUpdate)}
                                {Object.getOwnPropertyNames(adminsInfo).map(param =>
                                    (cState.auth && cState.role == 4) ?
                                        getPep("Добавить администратора", typ, inps, forceUpdate, param, adminsInfo[param])
                                        : <div key={param}>
                                            <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                                {adminsInfo[param].name}
                                            </div>
                                            <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                        </div>
                                )}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default Admins;