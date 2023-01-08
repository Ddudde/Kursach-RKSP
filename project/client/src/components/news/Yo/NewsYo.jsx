import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from './newsYo.module.css';
import {newsSelec} from "../../../store/selector";
import {useDispatch, useSelector} from "react-redux";
import {setActived} from "../../main/Main";
import {setActNew} from "../NewsMain";
import warn from "../../../media/warn_big.png";

let dispatch, newsInfo;

function errorLoad(e) {
    e.target.style.display = 'none';
}

export function NewsYo() {
    newsInfo = useSelector(newsSelec);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount NewsYo.jsx");
        // dispatch(changeNews("Yo", "id_0", 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // dispatch(changeNews("Yo", "id_0"));
        // setInterval(function() {
        //     dispatch(changeNews("Yo", "id_" + Object.getOwnPropertyNames(newsInfo.newsYo).length, 'ПОШЛА ВОДА В ХАТУ', '02.12.2020', '', 'Да'));
        // }, 5000);
        setActived(".panNew");
        setActNew(".panYo");
        return function() {
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
        <>
            <Helmet>
                <title>Объявления учебного центра</title>
            </Helmet>
            <div className={newsCSS.AppHeader}>
                {Object.getOwnPropertyNames(newsInfo.newsYo).length == 0 ?
                    <div className={newsCSS.block}>
                        <img alt="banner" src={warn}/>
                        <div className={newsCSS.block_text}>
                            Новостей нет... Кажется, что новостная лента пустует не заслужено? Попробуйте попросить завуча заполнить информацию.
                        </div>
                    </div> :
                    <section className={newsCSS.center_colum}>
                        {Object.getOwnPropertyNames(newsInfo.newsYo).map(param =>
                            <div className={newsCSS.news_line} key={param}>
                                <h2>{newsInfo.newsYo[param].title}</h2>
                                <span className="date">{newsInfo.newsYo[param].date}</span>
                                <p><img alt="banner" src={newsInfo.newsYo[param].img_url+''} onError={errorLoad}/>{newsInfo.newsYo[param].text}</p>
                            </div>
                        )}
                    </section>
                }
            </div>
        </>
    )
}
export default NewsYo;