import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import errCSS from './error.module.css';
import warn from '../../media/warn_big.png';

export function ErrNotFound() {
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
                <link rel="canonical" href="http://example.com/example" />
            </Helmet>
            <div className={errCSS.AppHeader}>
                <div className={errCSS.block}>
                    <img alt="banner" src={warn}/>
                    <div className={errCSS.block_text} id={errCSS.def}>
                        К сожалению, страница не найдена... Предлагаем изучить страницы на выбор ("Школам", "Педагогам", "Родителям", "Учащимся"). <br/>Также можете авторизоваться, тогда система предложит вам подходящую страницу по изучению портала.
                    </div>
                    <div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Школам".
                    </div>
                    <div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Педагогам".
                    </div>
                    <div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Родителям".
                    </div>
                    <div className={errCSS.block_text}>
                        К сожалению, страница не найдена... Предлагаем изучить страницу "Учащимся".
                    </div>
                </div>
            </div>
        </>
    )
}
export default ErrNotFound;