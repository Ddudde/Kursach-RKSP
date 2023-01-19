import React, {useEffect, useRef, useReducer} from "react";
import adminYOCSS from './adminYO.module.css';
import {Link, Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {admYO, pjournal, states} from "../../store/selector";
import main from "../main/main.module.css";
import {changeAdminYO, changeAdminYOGR, changePjournal} from "../../store/actions";
import journalCSS from "../prepjur/journal.module.css";

let act, act_new, lin, st, gr, pari, mor, lmor, timid, parb, lel, eles, dispatch, admYOInfo, ke;
act = ".panYo";
pari = {elems: 0, paels: 0};
parb = {resiz: false, updf: false, updlb: false};
st = {};
gr = {};
let [_, forceUpdate] = [];

function getPan(name, namecl, link, dopClass, fun, inc) {
    let cl = "pan" + namecl;
    st["."+cl] = pari.elems;
    if (!inc) pari.elems++;
    let cla = [adminYOCSS.nav_i, adminYOCSS.nav_iJur, "pa", cl, dopClass ? dopClass : ""].join(" ");
    return fun ? (
        <div className={cla} id={adminYOCSS.nav_i} onClick={fun} data-id={namecl}>
            {name}
        </div>
    ) : (
        <Link className={cla} id={adminYOCSS.nav_i} to={link} onClick={() => {setActivedMy("."+cl)}} data-id={namecl}>
            {name}
        </Link>
    )
}

function overpan() {
    let pan, wid, pa, morel, MMel;
    eles = [];
    morel = document.querySelector("#mor");
    MMel = document.querySelector("#MM");
    pan = document.querySelector("."+adminYOCSS.panel);
    pa = document.querySelectorAll("."+adminYOCSS.panel + " > .pa");
    for(let pae of pa) {
        if(pae.style.display) pae.style.display = "";
    }
    if(morel) mor = React.cloneElement( mor, { style: {display: "none"}});
    lin.style.display = "none";
    wid = pan.scrollWidth - pan.getBoundingClientRect().width;
    lin.style.display = "";
    if(wid > 0) {
        let i = -1;
        for(let el, i1 = 0, elc; wid > 0 || i1 < 2; i--) {
            if(wid < 0) i1++;
            el = pa[pa.length+i];
            wid -= el.getBoundingClientRect().width;
            elc = gr[el.getAttribute("data-id")];
            eles[eles.length] = React.cloneElement(elc, {className: elc.props.className+" "+adminYOCSS.pred});
            el.style.display = "none";
            pari.elems--;
        }
        lel = pa[pa.length+i];
        if(MMel) MMel.style.width = lel.getBoundingClientRect().width < 50 ? "200%" : "100%";
        updMor();
        pan.style.gridTemplate = "auto/repeat(" + pari.elems + ",1fr)";
    }
    setActivedMy(".pan" + admYOInfo.els[ke].group);
}

function updMor() {
    let gmor = getMore(eles);
    if(eles.length > 0) {
        mor = React.cloneElement( lmor, { children: gmor.props.children, style: {display: "flex"}});
        parb.updf = true;
        forceUpdate();
    }
}

function getMore(el) {
    pari.elems++;
    return (
        <>
            <div className={adminYOCSS.nav_i+' '+adminYOCSS.nav_iJur+' '+adminYOCSS.predEl} id={adminYOCSS.nav_i}>
                <div className={adminYOCSS.predInf}>...</div>
            </div>
            <div className={adminYOCSS.predMenu+" pre "+adminYOCSS.predMM} style={{width:lel.getBoundingClientRect().width < 50 ? "200%" : "100%"}} id="MM">
                <div>
                    {el.map(par =>
                        par
                    )}
                </div>
            </div>
        </>
    )
}

function ele(x, par) {
    pari[par] = x;
}

function tim() {
    if (parb.resiz) {
        parb.resiz = false;
        overpan();
        setActivedMy(".pan" + admYOInfo.els[ke].group);
    }
}

let preTim;

function replGr(x) {
    let elc = gr[lel.getAttribute("data-id")];
    let elr = React.cloneElement(elc, {className: elc.props.className+" "+journalCSS.pred});
    for (let i = 0; i < eles.length; i++){
        if(eles[i].props["data-id"] == x.getAttribute("data-id")) eles[i] = elr;
    }
    lel.style.display = "none";
    x.style.display = "";
    lel = x;
    updMor();
}

function setActivedMy(name) {
    let ao = document.querySelector(act), an = document.querySelector(name), con = 0;
    if(ao) ao.setAttribute('data-act', '0');
    if(an) {
        act = name;
        an.setAttribute('data-act', '1');
        if(an.style.display == "none") replGr(an);
    }
    if(lin) {
        con = Math.floor(an.getBoundingClientRect().width);
        lin.style.left = Math.round(an.getBoundingClientRect().left)+"px";
        lin.style.width = con+"px";
    }
}

export function AdminYO(props) {
    const cState = useSelector(states);
    admYOInfo = useSelector(admYO);
    const isFirstUpdate = useRef(true);
    [_, forceUpdate] = useReducer((x) => x + 1, 0);
    dispatch = useDispatch();
    useEffect(() => {
        lin = document.querySelector("#lin");
        lmor = <div className={adminYOCSS.predBlock} id="mor" style={{display: "none"}}/>;
        mor = React.cloneElement( lmor, {});
        if(!ke) {
            ke = admYOInfo.els.length;
            dispatch(changeAdminYO(admYOInfo.els.length, props.gro));
        }
        preTim = () => {
            if(!parb.resiz) {
                parb.resiz = true;
                timid = setTimeout(tim,1000);
            }
        }
        console.log("I was triggered during componentDidMount AdminYO.jsx");
        window.addEventListener('resize', preTim);
        let el = document.querySelectorAll("."+adminYOCSS.panel + " > .pa");
        if(el.length != pari.paels) {
            parb.updlb = true;
            forceUpdate();
        }
        pari.paels = el.length;
        // overpan();
        return function() {
            window.removeEventListener('resize', preTim);
            clearTimeout(timid);
            console.log("I was triggered during componentWillUnmount AdminYO.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        if(parb.updlb) {
            parb.updlb = false;
            overpan();
        }
        if(parb.updf){
            parb.updf = false;
            console.log('componentDidUpdate onlyRender AdminYO.jsx');
            return;
        }
        let el = document.querySelectorAll("."+adminYOCSS.panel + " > .pa");
        if(el.length != pari.paels) {
            parb.updlb = true;
            forceUpdate();
        }
        pari.paels = el.length;
        if(admYOInfo.els[ke]) {
            let nam = ".pan" + admYOInfo.els[ke].group;
            if (act != nam) setActivedMy(nam);
        }
        console.log('componentDidUpdate AdminYO.jsx');
    });
    return (
        <nav className={adminYOCSS.panel} id="her">
            {ele(0, "elems")}
            {admYOInfo.els[ke] && Object.getOwnPropertyNames(admYOInfo.els[ke].groups).map(param =>
                gr[param] = getPan(admYOInfo.els[ke].groups[param], param, "", undefined, () => (dispatch(changeAdminYOGR(ke, param))))
            )}
            {mor}
            <div className={adminYOCSS.lin} style={{width: (100 / pari.elems) + "%"}} id={"lin"}/>
        </nav>
    )
}
export default AdminYO;