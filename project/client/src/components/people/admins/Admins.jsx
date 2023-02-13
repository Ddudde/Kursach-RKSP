import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import peopleCSS from '../peopleMain.module.css';
import {admins, themes} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../PeopleMain";
import profl from "../../../media/profl.png";
import profd from "../../../media/profd.png";
import ErrFound from "../../other/error/ErrFound";

let dispatch, adminsInfo, errText;
errText = "К сожалению, информация не найдена...";

export function Admins() {
    adminsInfo = useSelector(admins);
    const themeState = useSelector(themes);
    if(!dispatch) {
        setActNew(4);
    }
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Admins.jsx");
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
            {Object.getOwnPropertyNames(adminsInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <div className={peopleCSS.blockPep}>
                        <div className={peopleCSS.pep}>
                            <div className={peopleCSS.nav_iZag}>
                                <div className={peopleCSS.nav_i} id={peopleCSS.nav_i}>
                                    Администраторы портала
                                </div>
                                {Object.getOwnPropertyNames(adminsInfo).map(param =>
                                    <div key={param}>
                                        <div className={peopleCSS.nav_i+" "+peopleCSS.nav_iZag2} id={peopleCSS.nav_i}>
                                            {adminsInfo[param]}
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