import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import tutorCSS from './tutor.module.css';
import {useDispatch, useSelector} from "react-redux";
import {states, themes} from "../../store/selector";
import kizo1 from "../../media/tutor/kids/izo1.png";
import kizo2 from "../../media/tutor/kids/izo2.png";
import kizo3 from "../../media/tutor/kids/izo3.png";
import kizo4 from "../../media/tutor/kids/izo4.png";
import kizo5 from "../../media/tutor/kids/izo5.png";
import kizo6 from "../../media/tutor/kids/izo6.png";
import kizo7 from "../../media/tutor/kids/izo7.png";
import kizo8 from "../../media/tutor/kids/izo8.png";
import kizo9 from "../../media/tutor/kids/izo9.png";
import kizo10 from "../../media/tutor/kids/izo10.png";
import kizo11 from "../../media/tutor/kids/izo11.png";
import kizo12 from "../../media/tutor/kids/izo12.png";
import kizo13 from "../../media/tutor/kids/izo13.png";
import kizo14 from "../../media/tutor/kids/izo14.png";
import kizo15 from "../../media/tutor/kids/izo15.png";
import kizo16 from "../../media/tutor/kids/izo16.png";
import kizo17 from "../../media/tutor/kids/izo17.png";
import kizo18 from "../../media/tutor/kids/izo18.png";
import kizo19 from "../../media/tutor/kids/izo19.png";
import pizo1 from "../../media/tutor/parents/izo1.png";
import {setActived} from "../main/Main";
import knopka from "../../media/dnevnik/knopka.png";

let dispatch, ev, timid, scrolling = false, cState, zag = {0: "Обучающимся", 1: "Родителям", 2: "Педагогам", 3: "Школам"};

function goTo(id) {
    document.querySelector("#" + id).scrollIntoView(true);
}

function tim() {
    if (scrolling) {
        scrolling = false;
        knop();
    }
}

function knop() {
    let x = document.querySelector(".sett").getBoundingClientRect().top + Math.round(window.innerHeight / 100) * 7;
    document.querySelector("#CWSEL").style.display = x > 0 ? "none" : "flex";
}

function goToSod() {
    document.querySelector(".soder").scrollIntoView(true);
    let sinc = window.scrollY - Math.round(window.innerHeight / 100) * 7;
    window.scrollTo(0, sinc);
    knop();
}

function visB(e) {
    let el = e.target.nextElementSibling;
    el.hasAttribute("data-act") ? el.removeAttribute("data-act") : el.setAttribute("data-act", "");
}

export function Tutor() {
    const themeState = useSelector(themes);
    cState = useSelector(states);
    dispatch = useDispatch();
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount Tutor.jsx");
        setActived(".panKid");
        window.onwheel = (e) => {
            if(!scrolling) {
                scrolling = true;
                ev = e;
                timid = setTimeout(tim,1000);
            }
        };
        knop();
        return function() {
            window.onwheel = undefined;
            clearTimeout(timid);
            console.log("I was triggered during componentWillUnmount Tutor.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate Tutor.jsx');
    });
    return (
        <>
            <Helmet>
                <title>{zag[cState.role]}</title>
            </Helmet>
            <div className={tutorCSS.AppHeader}>
                <div className={tutorCSS.blockPro}>
                    <div className={tutorCSS.pro}>
                        <div className={tutorCSS.nav_iZag}>
                            <div className={tutorCSS.nav_i+" soder"} id={tutorCSS.nav_i} style={{marginBottom:"0.5vw"}}>
                                Содержание
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={() => (goTo("rek"))}>
                                Общие рекомендации
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={() => (goTo("pep"))}>
                                Люди
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={() => (goTo("dnev"))}>
                                Дневник
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={() => (goTo("ana"))}>
                                Аналитика
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={() => (goTo("prof"))}>
                                Профиль
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag1+" sett"} id={tutorCSS.nav_i} onClick={() => (goTo("set"))}>
                                Настройки
                            </div>
                        </div>
                        <div className={tutorCSS.nav_iZag} id="rek">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Общие рекомендации
                            </div>
                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2+" "+tutorCSS.zag}>
                                Рекомендации будут в виде рубрики "Вопрос-ответ", а также определённых тем.<br/>Возможно информация будет дополняться по мере появления вопросов у пользователей.
                                <br/>(Блоки с вопросами скрываются и раскрываются нажатием на них)
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Как зарегистрироваться?
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Возможность регистрации закрыта для посторонних.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo2} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Регистрация скрыта
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Вам должна придти ссылка-приглашение от учебного центра.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo1} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Пример ссылки
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Перейдите по ссылке. Если ссылка, которую вам отправили верна,
                                            то вам откроется возможность зарегистрировать новый аккаунт.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo3} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Регистрация доступна
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Также имеется возможность добавить роль к существующему аккаунту. Для этого
                                            необходимо быть авторизованным и перейти по ссылке-приглашению.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo4} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Роль успешно добавлена
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            В случае ошибки в приглашении или истечении его срока действия будет
                                            показано оповещение...
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo5} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Ошибка в оповещении
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Для успешной регистрации необходимо заполнить все поля и
                                            принять условия соглашения. Разрешены только латинница и
                                            цифры.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo6} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Регистрация
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Восстановление пароля
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Чтобы была возможность восстановления пароля, необходимо установить
                                            секретную фразу. Для этого нужно перейти в настройки, нажать на
                                            "Добавить секретную фразу". Заполнить соответствующее поле и
                                            подтвердить.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo8} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Установка секретной фразы
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            В случае, если вы прошли данную процедуру, то необходимо перейти к странице
                                            авторизации и зайти при помощи текста-ссылки "Забыли пароль?" в интерфейс
                                            восстановления пароля.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo2} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Переход к интерфейсу
                                            </div>
                                        </div>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Для успешной смены пароля необходимо заполнить все поля. Для всех полей
                                            кроме "Секретной фразы" разрешены только латинница и цифры.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo7} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Интерфейс смены пароля
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Настройка темы
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            По умолчанию тема устанавливается с учётом настроек вашей системы. Но вы
                                            всегда можете воспользоваться соответствующим переключателем в левом нижнем
                                            углу страницы.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo9} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Настройка темы
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Смена роли
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Если у вас на аккаунте имеется какая-то другая роль, то есть возможность
                                            переключаться между ними.<br/>
                                            При наведении мыши на ваш логин, раскроется меню с соответствующей кнопкой.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo10} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Смена роли
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cState.role == 1 && <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Смена наблюдаемого учащегося
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Если вы имеете несколько детей, то у вас есть возможность наблюдать за
                                            всеми, переключаясь между ними.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={pizo1} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Смена наблюдаемого учащегося
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={tutorCSS.nav_iZag} id="pep">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Люди
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Педагоги
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            На данной странице учителя из списка "Мои педагоги" участвуют в вашем
                                            обучении, остальные обозначены как "Другие педагоги".<br/>Нажав на иконку
                                            профиля, можно перейти в профиль преподавателя.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo11} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Педагоги"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Завучи
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Нажав на иконку профиля, можно перейти в профиль завуча.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo12} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Завучи"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {cState.role == 0 && <>
                                    <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                        Одноклассники
                                    </div>
                                    <div className={tutorCSS.blockOtv}>
                                        <div className={tutorCSS.zag}>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Нажав на иконку профиля, можно перейти в профиль одноклассника.
                                            </div>
                                            <div className={tutorCSS.blockImg}>
                                                <img src={kizo13} alt=""/>
                                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                    Страница "Одноклассники"
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                                {cState.role == 0 && <>
                                    <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                        Родители
                                    </div>
                                    <div className={tutorCSS.blockOtv}>
                                        <div className={tutorCSS.zag}>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                На этой страничке представлены одноклассники и их родители.<br/>
                                                Нажав на иконку профиля, можно перейти в профиль родителя.
                                            </div>
                                            <div className={tutorCSS.blockImg}>
                                                <img src={kizo14} alt=""/>
                                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                    Страница "Родители"
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Администраторы портала
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Нажав на иконку профиля, можно перейти в профиль администратора портала.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo15} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Администраторы портала"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={tutorCSS.nav_iZag} id="dnev">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Дневник
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Пользование
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Для того чтобы перейти к прошедшей неделе, необходимо проскроллить вверх, а
                                            для перехода к следующей, сделать наоборот.<br/>
                                            При наличии типа оценки, к примеру "Тест", можно навести мышь на оценку и
                                            тип проявится.<br/>
                                            При весе оценки больше одного, вес показывается.<br/>
                                            Границы недель обозначены.<br/>
                                            При достаточном отдалении от текущей недели появляется кнопка для мгновенного
                                            перехода к текущей неделе.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo16} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Дневник"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={tutorCSS.nav_iZag} id="ana">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Аналитика
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Журнал
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Над оценками показываются даты. Изначально показываются даты первой
                                            дисциплины по списку. Чтобы показать числа выставления оценок других
                                            дисциплин, необходимо навести мышь на линию интересующего вас предмета.<br/>
                                            Если оценка имеет вес более 1, то показывается рядом с оценкой.<br/>
                                            Если педагог уточнил тип оценки, то ниже журнала, появится соответствующая
                                            запись, с датой и типом оценки.<br/>
                                            Также если оценок много, то для удобства появляется возможность скроллить.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo17} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Журнал"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={tutorCSS.nav_iZag} id="prof">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Профиль
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Пользование
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            На этой страничке представленны все данные пользователя. Если вы
                                            открыли свой профиль то у вас будет возможность дополнить/изменить
                                            информацию.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo18} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Профиль"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={tutorCSS.nav_iZag} id="set">
                            <div className={tutorCSS.nav_i} id={tutorCSS.nav_i}>
                                Настройки
                            </div>
                            <div>
                                <div className={tutorCSS.nav_i+" "+tutorCSS.zag1} id={tutorCSS.nav_i} onClick={visB}>
                                    Пользование
                                </div>
                                <div className={tutorCSS.blockOtv}>
                                    <div className={tutorCSS.zag}>
                                        <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                            Настройки доступны только авторизованным пользователям. На данной
                                            страничке можно изменять настройки уведомлений, пароль, аватар,
                                            секретную фразу.
                                        </div>
                                        <div className={tutorCSS.blockImg}>
                                            <img src={kizo19} alt=""/>
                                            <div className={tutorCSS.nav_i+" "+tutorCSS.zag2}>
                                                Страница "Настройки"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tutorCSS.GotCW} id={"CWSEL"}>
                    <div>
                        <img src={knopka} alt="" onClick={() => {goToSod()}}/>
                        <div className={tutorCSS.GotCWText}>
                            Перейти к содержанию
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Tutor;