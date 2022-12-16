import React, {useEffect, useRef} from "react";
import peopleCSS from './peopleMain.module.css';
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {states} from "../../store/selector";
import main from "../main/main.module.css";

let act = ".panYo", act_new = "", elems = 0, lin, st = {};

function getPan(name, namecl, link, dopClass, inc) {
    let cl = "pan" + namecl;
    st["."+cl] = elems;
    if (!inc) elems++;
    return (
        <Link className={main.nav_i + " " + cl + " " + (dopClass ? dopClass : "")} id={main.nav_i} to={link} onClick={() => {setActivedMy("."+cl)}}>
            {name}
        </Link>
    )
}

function ele() {
    elems = 0;
    return "";
}

function setActivedMy(name) {
    if(document.querySelector(act)) document.querySelector(act).setAttribute('data-act', '0');
    if(document.querySelector(name)) {
        act = name;
        document.querySelector(name).setAttribute('data-act', '1');
    }
    if(lin) lin.style.left = ((100/elems)*st[name])+"%";
}

export function setActNew(name) {
    act_new = name;
}

export function PeopleMain() {
    const cState = useSelector(states);
    const isFirstUpdate = useRef(true);
    useEffect(() => {
        if(isFirstUpdate.current) return;
        lin = document.querySelector("#lin");
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
                <nav className={peopleCSS.panel} style={{gridTemplate: "auto/repeat("+elems+",1fr)"}} id="her">
                    {ele()}
                    {(cState.auth && cState.role != 4) && getPan("Педагоги", "PTea", "teachers", peopleCSS.panPTea)}
                    {(cState.auth && cState.role != 4) && getPan("Завучи", "HT", "hteachers", peopleCSS.panHT)}
                    {(cState.auth && cState.role == 0) && getPan("Одноклассники", "CM", "classmates", peopleCSS.panCM)}
                    {(cState.auth && cState.role == 0) && getPan("Родители", "Par", "parents", peopleCSS.panPar)}
                    {getPan("Администраторы портала", "Adm", "admins", peopleCSS.panAdm)}
                    <div className={peopleCSS.lin} style={{width: (100/elems)+"%"}} id={"lin"}/>
                </nav>
                <Outlet />
            </div>
        </>
    )
}
export default PeopleMain;