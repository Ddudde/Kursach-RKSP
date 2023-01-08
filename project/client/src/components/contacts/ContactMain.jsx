import React, {useEffect, useRef} from "react";
import contactCSS from './contactMain.module.css';
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {states} from "../../store/selector";

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

export function ContactMain() {
    const cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        console.log("I was triggered during componentDidMount ContactMain.jsx");
        setActivedMy(act_new);
        return function() {
            console.log("I was triggered during componentWillUnmount ContactMain.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        console.log('componentDidUpdate ContactMain.jsx');
    });
    return (
        <>
            <div className={contactCSS.AppHeader}>
                {(cState.auth && cState.role != 4) && <nav className={contactCSS.panel} id="her">
                    <Link className={contactCSS.nav_i+" panPor " + contactCSS.panPor} to="por" id={contactCSS.nav_i} onClick={() => {setActivedMy(".panPor")}}>
                        Контакты портала
                    </Link>
                    <Link className={contactCSS.nav_i+" panYo " + contactCSS.panYo} to="yo" id={contactCSS.nav_i} onClick={() => {setActivedMy(".panYo")}}>
                        Контакты учебного центра
                    </Link>
                    <div className={contactCSS.lin}>
                    </div>
                </nav>}
                <Outlet />
            </div>
        </>
    )
}
export default ContactMain;