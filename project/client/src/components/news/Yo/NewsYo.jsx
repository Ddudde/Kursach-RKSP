import React, {useEffect, useReducer, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from '../newsMain.module.css';
import {news, states} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {chStatB, errorLoad, getAdd, setActNew} from "../NewsMain";
import ErrFound from "../../other/error/ErrFound";

let dispatch, newsInfo, type, inps, cState, errText;
type = "Yo";
inps = {inpntt : "Текст", inpnzt : "Заголовок", inpndt: new Date().toLocaleString("ru", {day:"2-digit", month: "2-digit", year:"numeric"})};
errText = "Новостей нет... Кажется, что новостная лента пустует не заслужено? Попробуйте попросить завуча заполнить информацию."

let [_, forceUpdate] = [];

export function NewsYo() {
    newsInfo = useSelector(news);
    cState = useSelector(states);
    if(!dispatch) setActNew(1);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount NewsYo.jsx");
        // dispatch(changeNews("Yo", "id_0", 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // dispatch(changeNews("Yo", "id_0"));
        // setInterval(function() {
        //     dispatch(changeNews("Yo", "id_" + Object.getOwnPropertyNames(newsInfo.newsYo).length, 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // }, 5000);
        for(let el of document.querySelectorAll("." + newsCSS.ed + " > *[id^='inpn']")){
            chStatB({target: el}, inps);
        }
        return function() {
            dispatch = undefined;
            console.log("I was triggered during componentWillUnmount NewsYo.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsYo.jsx');
    });
    return (
        <div className={newsCSS.header}>
            <Helmet>
                <title>Объявления учебного центра</title>
            </Helmet>
            {Object.getOwnPropertyNames(newsInfo[type]).length == 0 && !(cState.auth && cState.role == 3) ?
                    <ErrFound text={errText}/>
                :
                    <div className={newsCSS.block}>
                        <section className={newsCSS.center_colum}>
                            {(cState.auth && cState.role == 3) && getAdd(type, newsInfo, inps, forceUpdate)}
                            {Object.getOwnPropertyNames(newsInfo[type]).reverse().map(param =>
                                <div className={newsCSS.news_line} data-st="1" key={param}>
                                    {(cState.auth && cState.role == 3) ?
                                            getAdd(type, newsInfo, inps, forceUpdate, param)
                                        : <>
                                            <h2 className={newsCSS.zag}>{newsInfo[type][param].title}</h2>
                                            <span className={newsCSS.date}>{newsInfo[type][param].date}</span>
                                            <div className={newsCSS.te}>
                                                <span className={newsCSS.banner}>
                                                    <img alt="banner" src={newsInfo[type][param].img_url + ''} onError={errorLoad}/>
                                                </span>
                                                <pre className={newsCSS.field}>
                                                    {newsInfo[type][param].text}
                                                </pre>
                                            </div>
                                    </>}
                                </div>
                            )}
                        </section>
                    </div>
            }
        </div>
    )
}
export default NewsYo;