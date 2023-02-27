import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import {classmates, states, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, getPep, setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import Pane from "../../other/pane/Pane";
import ErrFound from "../../other/error/ErrFound";
import peopleCSS from "../peopleMain.module.css";

let dispatch, classmatesInfo, errText, inps, themeState, cState, typ;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";
typ = "kids";
inps = {inpnpt : "Фамилия И.О."};
let [_, forceUpdate] = [];

export function Classmates() {
    classmatesInfo = useSelector(classmates);
    cState = useSelector(states);
    themeState = useSelector(themes);
    if(!dispatch) setActNew(2);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Classmates.jsx");
        for(let el of document.querySelectorAll("." + peopleCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
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
        <div className={peopleCSS.header}>
            <Helmet>
                <title>{cState.role == 3 ? "Обучающиеся" : "Одноклассники"}</title>
            </Helmet>
            {Object.getOwnPropertyNames(classmatesInfo).length == 0 && !(cState.auth && cState.role == 3) ?
                    <ErrFound text={errText}/>
                :
                    <>
                        {(cState.auth && cState.role == 3) &&
                            <div style={{width:"inherit", height: "7vh", position: "fixed", zIndex:"1"}}>
                                <Pane cla={true}/>
                            </div>
                        }
                        <div className={peopleCSS.blockPep}>
                            <div className={peopleCSS.pep}>
                                <div className={peopleCSS.nav_iZag}>
                                    <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                        {cState.role == 3 ? "Обучающиеся" : "Одноклассники"}
                                    </div>
                                    {(cState.auth && cState.role == 3) && getPep("Добавить ученика", typ, inps, forceUpdate)}
                                    {Object.getOwnPropertyNames(classmatesInfo).map(param =>
                                        (cState.auth && cState.role == 3) ?
                                            getPep("Добавить ученика", typ, inps, forceUpdate, param, classmatesInfo[param])
                                            : <div key={param}>
                                                <div className={peopleCSS.nav_i + " " + peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                                    {classmatesInfo[param].name}
                                                </div>
                                                <img className={peopleCSS.profIm} src={themeState.theme_ch ? profd : profl} title="Перейти в профиль" alt=""/>
                                            </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
export default Classmates;