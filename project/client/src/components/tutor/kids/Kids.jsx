import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import kidsCSS from './kids.module.css';
import {useDispatch, useSelector} from "react-redux";
import {themes} from "../../../store/selector";

let kidsInfo, dispatch, warner, moore;

function goTo(id) {
    document.querySelector("#" + id).scrollIntoView(true);
}

export function Kids() {
    const themeState = useSelector(themes);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Kids.jsx");
        return function() {
            console.log("I was triggered during componentWillUnmount Kids.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Kids.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Обучающимся</title>
            </Helmet>
            <div className={kidsCSS.AppHeader}>
                <div className={kidsCSS.blockPro}>
                    <div className={kidsCSS.pro}>
                        <div className={kidsCSS.nav_iZag}>
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i} style={{marginBottom:"0.5vw"}}>
                                Содержание
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("rek"))}>
                                Общие рекомендации
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("news"))}>
                                Объявления
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("con"))}>
                                Контакты
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("pep"))}>
                                Люди
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("dnev"))}>
                                Дневник
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("ana"))}>
                                Аналитика
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("prof"))}>
                                Профиль
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag1} id={kidsCSS.nav_i} onClick={() => (goTo("set"))}>
                                Настройки
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="rek">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Общие рекомендации
                            </div>
                            <div className={kidsCSS.nav_i+" "+kidsCSS.zag2}>
                                Не знаете как зарегистрироваться?
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="news">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Объявления
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="con">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Контакты
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="pep">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Люди
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="dnev">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Дневник
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="ana">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Аналитика
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="prof">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Профиль
                            </div>
                        </div>
                        <div className={kidsCSS.nav_iZag} id="set">
                            <div className={kidsCSS.nav_i} id={kidsCSS.nav_i}>
                                Настройки
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Kids;