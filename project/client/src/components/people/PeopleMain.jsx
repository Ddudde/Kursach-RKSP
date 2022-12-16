import React, {useEffect, useRef} from "react";
import peopleCSS from './peopleMain.module.css';
import {Link, Outlet} from "react-router-dom";

let act = ".panYo", act_new = "";

function setActivedMy(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
}

export function setActNew(name) {
    act_new = name;
}

export function PeopleMain() {
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount PeopleMain.jsx");
        for(let el of document.querySelectorAll("." + peopleCSS.AppHeader + " *"))
            if(!el.style.cssText) el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        setActivedMy(act_new);
        return function() {
            console.log("I was triggered during componentWillUnmount PeopleMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate PeopleMain.jsx');
    });
    return (
        <>
            <div className={peopleCSS.AppHeader}>
                <nav className={peopleCSS.panel} id="her">
                    <Link className={peopleCSS.nav_i+" panTea " + peopleCSS.panTea} to="teachers" id={peopleCSS.nav_i} onClick={() => {setActivedMy(".panTea")}}>
                        Педагоги
                    </Link>
                    <Link className={peopleCSS.nav_i+" panHT " + peopleCSS.panHT} to="hteachers" id={peopleCSS.nav_i} onClick={() => {setActivedMy(".panHT")}}>
                        Завучи
                    </Link>
                    <Link className={peopleCSS.nav_i+" panCM " + peopleCSS.panCM} to="classmates" id={peopleCSS.nav_i} onClick={() => {setActivedMy(".panCM")}}>
                        Одноклассники
                    </Link>
                    <Link className={peopleCSS.nav_i+" panPar " + peopleCSS.panPar} to="parents" id={peopleCSS.nav_i} onClick={() => {setActivedMy(".panPar")}}>
                        Родители
                    </Link>
                    <Link className={peopleCSS.nav_i+" panAdm " + peopleCSS.panAdm} to="admins" id={peopleCSS.nav_i} onClick={() => {setActivedMy(".panAdm")}}>
                        Администраторы портала
                    </Link>
                    <div className={peopleCSS.lin}>
                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    )
}
export default PeopleMain;