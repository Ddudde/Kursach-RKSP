import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import errCSS from './error.module.css';
import warn from '../../../media/warn_big.png';
import {states} from "../../../store/selector";
import {useSelector} from "react-redux";

export function ErrNotFound() {
    const cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount ErrNotFound.jsx");
        for(let el of document.querySelectorAll("." + errCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount ErrNotFound.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ErrNotFound.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Ошибка</title>
            </Helmet>
            <div className={errCSS.AppHeader}>
                <div className={errCSS.block}>
                    <img alt="banner" src={warn}/>
                    {!cState.auth && (<div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницы на выбор ("Школам", "Педагогам", "Родителям", "Учащимся"). <br/>Также можете авторизоваться, тогда система предложит вам подходящую страницу по изучению портала.
                    </div>)}
                    {(cState.auth && cState.role == 3) && (<div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Школам".
                    </div>)}
                    {(cState.auth && cState.role == 2) && (<div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Педагогам".
                    </div>)}
                    {(cState.auth && cState.role == 1) && (<div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Родителям".
                    </div>)}
                    {(cState.auth && cState.role == 0) && (<div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Обучающимся".
                    </div>)}
                </div>
            </div>
        </>
    )
}
export default ErrNotFound;