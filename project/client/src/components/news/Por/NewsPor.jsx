import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from '../Por/newsPor.module.css';
import {newsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../NewsMain";
import warn from "../../../media/warn_big.png";

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
            </Helmet>
            <div className={newsCSS.AppHeader}>
                {Object.getOwnPropertyNames(newsInfo.newsPor).length == 0 ?
                    <div className={newsCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={newsCSS.block_text}>
                            Новостей нет... Ждите новой информации.
                        </div>
                    </div> :
                    <section className={newsCSS.center_colum}>
                        {Object.getOwnPropertyNames(newsInfo.newsPor).map(param =>
                            <div className={newsCSS.news_line} key={param}>
                                <h2>{newsInfo.newsPor[param].title}</h2>
                                <span className="date">{newsInfo.newsPor[param].date}</span>
                                <p><img alt="banner" src={newsInfo.newsPor[param].img_url+''} onError={errorLoad}/>{newsInfo.newsPor[param].text}</p>
                            </div>
                        )}
                    </section>
                }
            </div>
        </>
    )
}
export default NewsPor;