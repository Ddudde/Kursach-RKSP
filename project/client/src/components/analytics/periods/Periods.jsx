import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import periodsCSS from './periods.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setActNew} from "../AnalyticsMain";
import {periods} from "../../../store/selector";
import ErrFound from "../../other/error/ErrFound";

let dispatch, periodsInfo, errText;
errText = "К сожалению, информация не найдена... Можете попробовать попросить завуча заполнить информацию.";

export function Periods() {
    periodsInfo = useSelector(periods);
    if(!dispatch) setActNew(1);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount Periods.jsx");
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount Periods.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Periods.jsx');
    });
    return (
        <div className={periodsCSS.AppHeader}>
            <Helmet>
                <title>Расписание периодов</title>
            </Helmet>
            {Object.getOwnPropertyNames(periodsInfo).length == 0 ?
                    <ErrFound text={errText}/>
                :
                    <div className={periodsCSS.blockPer}>
                        <div className={periodsCSS.per}>
                            <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                Название учебного периода
                            </div>
                            <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                Период
                            </div>
                            {Object.getOwnPropertyNames(periodsInfo).map(param =>
                                <>
                                    <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                        {periodsInfo[param].name}
                                    </div>
                                    <div className={periodsCSS.nav_i} id={periodsCSS.nav_i}>
                                        {periodsInfo[param].per}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
            }
        </div>
    )
}
export default Periods;