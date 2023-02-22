import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import peopleCSS from '../peopleMain.module.css';
import {hteachers, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, getPep, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, errText, inps, typ;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
typ = "hteachers";
inps = {inpnpt : "Фамилия И.О."};
let [_, forceUpdate] = [];

export function HTeachers() {
    const hteachersInfo = useSelector(hteachers);
    const themeState = useSelector(themes);
    const cState = useSelector(states);
    if(!dispatch) setActNew(1);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount HTeachers.jsx");
        for(let el of document.querySelectorAll("." + peopleCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
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
        <div className={peopleCSS.header}>
            <Helmet>
                <title>{cState.role == 4 ? "Администрации учебных организаций" : "Администрация учебной организации"}</title>
            </Helmet>
            {Object.getOwnPropertyNames(hteachersInfo).length == 0 && !(cState.auth && cState.role > 2) ?
                    <ErrFound text={errText}/>
                :
                    <div className={peopleCSS.blockPep}>
                        <div className={peopleCSS.pep}>
                            <div className={peopleCSS.nav_iZag}>
                                <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                    {cState.role == 4 ? "Администрации учебных организаций" : "Администрация учебной организации"}
                                </div>
                                {(cState.auth && cState.role > 2) && getPep(cState.role == 4 ? "Добавить учебную организацию" : "Добавить завуча", typ + (cState.role == 4 ? "4" : ""), inps, forceUpdate)}
                                {Object.getOwnPropertyNames(hteachersInfo).map(param =>
                                    (cState.auth && cState.role > 2) ?
                                            cState.role == 4 ? <div className={peopleCSS.nav_iZag} style={{marginLeft: "1vw"}} key={param}>
                                                    {getPep(undefined, typ+"4", inps, forceUpdate, param, hteachersInfo[param])}
                                                    {getPep("Добавить завуча", typ+"4L2", inps, forceUpdate, param)}
                                                    {hteachersInfo[param].pep && Object.getOwnPropertyNames(hteachersInfo[param].pep).map(param1 =>
                                                        getPep(undefined, typ+"4L2", inps, forceUpdate, param, hteachersInfo[param].pep[param1], param1)
                                                    )}
                                                </div>:
                                                    getPep(undefined, typ, inps, forceUpdate, param, hteachersInfo[param])
                                        : <div key={param}>
                                            <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                                {hteachersInfo[param].name}
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
export default HTeachers;