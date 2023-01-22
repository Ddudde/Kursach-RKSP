import React, {useEffect, useReducer, useRef} from "react";
import paneCSS from './pane.module.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pane, states} from "../../store/selector";
import {changePane, changePaneGR} from "../../store/actions";
import journalCSS from "../prepjur/journal.module.css";
import PanJs from "./PanJs";

export function Pane(props) {
    const ele = (x, par) => {
        panJs.pari[par] = x;
    };
    const getPan = (name, namecl, link, dopClass, fun, inc) => {
        let cl = "pan" + namecl;
        panJs.st["."+cl] = panJs.pari.elems;
        if (!inc) panJs.pari.elems++;
        let cla = [paneCSS.nav_i, paneCSS.nav_iJur, "pa", cl, dopClass ? dopClass : ""].join(" ");
        return link ? (
            <Link className={cla} id={paneCSS.nav_i} to={link} onClick={fun} data-id={namecl} key={namecl}>
                {name.nam}
            </Link>
        ) : (
            <div className={cla} id={paneCSS.nav_i} onClick={fun} data-id={namecl} key={namecl}>
                {name}
            </div>
        )
    };
    const overpan = () => {
        let pan, wid, pa;
        panJs.eles = [];
        pan = document.querySelector("."+paneCSS.panel + "[data-ke='" + panJs.ke + "']");
        pa = document.querySelectorAll("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] > .pa");
        for(let pae of pa) {
            if(pae.style.display) pae.style.display = "";
        }
        if(panJs.mor) document.querySelector("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] #mor").style.display = "none";
        panJs.refes.lin.style.display = "none";
        pan.style.gridTemplate = "auto/repeat(" + panJs.pari.elems + ",1fr)";
        wid = pan.scrollWidth - pan.getBoundingClientRect().width;
        panJs.refes.lin.style.display = "";
        if(wid > 3) {
            let i = -1;
            for(let el, i1 = 0, elc; wid > 3 || i1 < 1; i--) {
                if(wid < -3) i1++;
                el = pa[pa.length+i];
                wid -= el.getBoundingClientRect().width;
                elc = panJs.gr[el.getAttribute("data-id")];
                panJs.eles[panJs.eles.length] = React.cloneElement(elc, {className: elc.props.className+" "+paneCSS.pred});
                el.style.display = "none";
                panJs.pari.elems--;
            }
            panJs.lel = pa[pa.length+i];
            if(panJs.refes.MMel) panJs.refes.MMel.style.width = panJs.lel.getBoundingClientRect().width < 50 ? "200%" : "100%";
            updMor();
            pan.style.gridTemplate = "auto/repeat(" + panJs.pari.elems + ",1fr)";
        }
        setActivedMy(".pan" + paneInfo.els[panJs.ke].group);
    };
    const updMor = () => {
        let gmor = getMore(panJs.eles);
        if(panJs.eles.length > 0) {
            panJs.mor = React.cloneElement( panJs.lmor, { children: gmor.props.children});
            panJs.parb.updf = true;
            document.querySelector("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] #mor").style.display = "flex";
            forceUpdate();
        }
    };
    const getMore = (el) => {
        panJs.pari.elems++;
        return (
            <>
                <div className={paneCSS.nav_i+' '+paneCSS.nav_iJur+' '+paneCSS.predEl} id={paneCSS.nav_i}>
                    <div className={paneCSS.predInf}>...</div>
                </div>
                <div className={paneCSS.predMenu+" pre "+paneCSS.predMM} style={{width:panJs.lel.getBoundingClientRect().width < 50 ? "200%" : "100%"}} id="MM" ref={(re)=>(panJs.refes.MMel = re)}>
                    <div>
                        {el.map(par =>
                            par
                        )}
                    </div>
                </div>
            </>
        )
    };
    const replGr = (x) => {
        let elc = panJs.gr[panJs.lel.getAttribute("data-id")];
        let elr = React.cloneElement(elc, {className: elc.props.className+" "+journalCSS.pred});
        for (let i = 0; i < panJs.eles.length; i++){
            if(panJs.eles[i].props["data-id"] == x.getAttribute("data-id")) panJs.eles[i] = elr;
        }
        panJs.lel.style.display = "none";
        x.style.display = "";
        panJs.lel = x;
        updMor();
    };
    const tim = () => {
        if (panJs.parb.resiz) {
            panJs.parb.resiz = false;
            overpan();
            setActivedMy(".pan" + paneInfo.els[panJs.ke].group);
        }
    };
    const setActivedMy = (name) => {
        let ao = document.querySelector("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] " + panJs.act), an = document.querySelector("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] " + name), con = 0;
        if(ao) ao.setAttribute('data-act', '0');
        if(an) {
            panJs.act = name;
            an.setAttribute('data-act', '1');
            if(an.style.display == "none") replGr(an);
            if(panJs.refes.lin) {
                con = Math.floor(an.getBoundingClientRect().width);
                panJs.refes.lin.style.left = Math.round(an.getBoundingClientRect().left)+"px";
                panJs.refes.lin.style.width = con+"px";
            }
        }
    };
    const preTim = () => {
        if(!panJs.parb.resiz) {
            panJs.parb.resiz = true;
            panJs.timid = setTimeout(tim,1000);
        }
    }
    const cState = useSelector(states);
    const paneInfo = useSelector(pane);
    const panJs = useRef(new PanJs()).current;
    const isFirstUpdate = useRef(true);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const dispatch = useDispatch();
    useEffect(() => {
        panJs.lmor = <div className={paneCSS.predBlock} id="mor" style={{display: "none"}}/>;
        panJs.mor = React.cloneElement( panJs.lmor, {});
        if(!panJs.ke) {
            panJs.ke = paneInfo.els.length;
            dispatch(changePane(paneInfo.els.length, props.gro));
        }
        console.log("I was triggered during componentDidMount Pane.jsx");
        window.addEventListener('resize', preTim);
        let el = document.querySelectorAll("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] > .pa");
        if(el.length != panJs.pari.paels) {
            panJs.parb.updlb = true;
            forceUpdate();
        }
        panJs.pari.paels = el.length;
        return function() {
            window.removeEventListener('resize', preTim);
            clearTimeout(panJs.timid);
            console.log("I was triggered during componentWillUnmount Pane.jsx");
        }
    }, []);
    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }
        if(panJs.parb.updlb) {
            panJs.parb.updlb = false;
            overpan();
        }
        if(panJs.parb.updf){
            panJs.parb.updf = false;
            console.log('componentDidUpdate onlyRender Pane.jsx');
            return;
        }
        let el = document.querySelectorAll("."+paneCSS.panel + "[data-ke='" + panJs.ke + "'] > .pa");
        if(el.length != panJs.pari.paels) {
            panJs.parb.updlb = true;
            forceUpdate();
        }
        panJs.pari.paels = el.length;
        if(paneInfo.els[panJs.ke]) {
            let nam = ".pan" + paneInfo.els[panJs.ke].group;
            if (panJs.act != nam) setActivedMy(nam);
        }
        console.log('componentDidUpdate Pane.jsx');
    });
    return (
        <nav className={paneCSS.panel} id="her" data-ke={panJs.ke}>
            {ele(0, "elems")}
            {paneInfo.els[panJs.ke] && Object.getOwnPropertyNames(paneInfo.els[panJs.ke].groups).map(param =>
                panJs.gr[param] = getPan(paneInfo.els[panJs.ke].groups[param], param, paneInfo.els[panJs.ke].groups[param].linke, undefined, () => (dispatch(changePaneGR(panJs.ke, param))))
            )}
            {panJs.mor}
            <div className={paneCSS.lin} style={{width: (100 / panJs.pari.elems) + "%"}} id={"lin"} ref={(ele)=>(panJs.refes.lin = ele)}/>
        </nav>
    )
}
export default Pane;