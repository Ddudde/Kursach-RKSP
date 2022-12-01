import React, {useEffect, useRef} from "react";
import {Helmet} from "react-helmet-async";
import newsCSS from './newsMain.module.css';
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

export function NewsMain() {
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        console.log("I was triggered during componentDidMount NewsMain.jsx");
        for(let el of document.querySelectorAll("." + newsCSS.AppHeader + " *"))
            el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
        setActivedMy(act_new);
        return function() {
            console.log("I was triggered during componentWillUnmount NewsMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate NewsMain.jsx');
    });
    return (
        <>
            <div className={newsCSS.AppHeader}>
                <nav className={newsCSS.panel} id="her">
                    <Link className={newsCSS.nav_i+" panPor " + newsCSS.panPor} to="por" id={newsCSS.nav_i} onClick={() => {setActivedMy(".panPor")}}>
                        Объявления портала
                    </Link>
                    <Link className={newsCSS.nav_i+" panYo " + newsCSS.panYo} to="yo" id={newsCSS.nav_i} onClick={() => {setActivedMy(".panYo")}}>
                        Объявления учебного центра
                    </Link>
                    <div className={newsCSS.lin}>
                    </div>
                </nav>
                <Outlet />
            </div>
        </>
    )
}
export default NewsMain;