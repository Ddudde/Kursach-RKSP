import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from '../Por/newsPor.module.css';
import {newsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../NewsMain";
import {changeNews} from "../../../store/actions";

let dispatch, newsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function NewsPor() {
    newsInfo = useSelector(newsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount NewsPor.jsx");
        // dispatch(changeNews("Por", "id_0", 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // dispatch(changeNews("Por", "id_0"));
        // setInterval(function() {
        //     dispatch(changeNews("Por", "id_" + Object.getOwnPropertyNames(newsInfo.newsPor).length, 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // }, 5000);
        setActived(".panNew");
        setActNew(".panPor");
        for(let el of document.querySelectorAll("." + newsCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        return function() {
            console.log("I was triggered during componentWillUnmount NewsPor.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsPor.jsx');
    });
    return (
        <>
            <Helmet>
                <title>Объявления портала</title>
                <link rel="canonical" href="http://example.com/example" />
            </Helmet>
            <div className={newsCSS.AppHeader}>
                <section className={newsCSS.center_colum}>
                    {Object.getOwnPropertyNames(newsInfo.newsPor).map(param =>
                        <div className={newsCSS.news_line} key={param}>
                            <h2>{newsInfo.newsPor[param].title}</h2>
                            <span className="date">{newsInfo.newsPor[param].date}</span>
                            <p><img alt="banner" src={newsInfo.newsPor[param].img_url+''} onError={errorLoad}/>{newsInfo.newsPor[param].text}</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}
export default NewsPor;