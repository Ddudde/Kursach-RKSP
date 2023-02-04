import {thP} from "../components/main/Main";

export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_STATE = "CHANGE_STATE";
export const CHANGE_ZVONKI = "CHANGE_ZVONKI";
export const CHANGE_PERIODS = "CHANGE_PERIODS";
export const CHANGE_PROFILE = "CHANGE_PROFILE";
export const CHANGE_PROFILE_ROLES = "CHANGE_PROFILE_ROLES";
export const CHANGE_SCHEDULE = "CHANGE_SCHEDULE";
export const CHANGE_JOURNAL = "CHANGE_JOURNAL";
export const CHANGE_PJOURNAL = "CHANGE_PJOURNAL";
export const CHANGE_PANE = "CHANGE_PANE";
export const CHANGE_PANE_GRS = "CHANGE_PANE_GRS";
export const CHANGE_PANE_DEL_GRS = "CHANGE_PANE_DEL_GRS";
export const CHANGE_PANE_GR = "CHANGE_PANE_GR";
export const CHANGE_PJOURNAL_MARKS = "CHANGE_PJOURNAL_MARKS";
export const CHANGE_PJOURNAL_DEL_MARKS = "CHANGE_PJOURNAL_DEL_MARKS";
export const CHANGE_PJOURNAL_PER_MARKS = "CHANGE_PJOURNAL_PER_MARKS";
export const CHANGE_PJOURNAL_DEL_PER_MARKS = "CHANGE_PJOURNAL_DEL_PER_MARKS";
export const CHANGE_PJOURNAL_TYPE = "CHANGE_PJOURNAL_TYPE";
export const CHANGE_PJOURNAL_DEL_TYPE = "CHANGE_PJOURNAL_DEL_TYPE";
export const CHANGE_PJOURNAL_NEW_TYPE = "CHANGE_PJOURNAL_NEW_TYPE";
export const CHANGE_PJOURNAL_DZ = "CHANGE_PJOURNAL_DZ";
export const CHANGE_TEACHERS = "CHANGE_TEACHERS";
export const CHANGE_HTEACHERS = "CHANGE_HTEACHERS";
export const CHANGE_CLASSMATES = "CHANGE_CLASSMATES";
export const CHANGE_PARENTS = "CHANGE_PARENTS";
export const CHANGE_ADMINS = "CHANGE_ADMINS";
export const CHANGE_MARKS = "CHANGE_MARKS";
export const CHANGE_DNEVNIK = "CHANGE_DNEVNIK";
export const CHANGE_DNEVNIK_DAY_UP = "CHANGE_DNEVNIK_DAY_UP";
export const CHANGE_DNEVNIK_DAY_DOWN = "CHANGE_DNEVNIK_DAY_DOWN";
export const CHANGE_CLIENT = "CHANGE_CLIENT";
export const CHANGE_INDICATOR = "CHANGE_INDICATOR";
export const CHANGE_NEWS = "CHANGE_NEWS";
export const CHANGE_NEWS_PARAM = "CHANGE_NEWS_PARAM";
export const CHANGE_NEWS_DEL = "CHANGE_NEWS_DEL";
export const CHANGE_CONTACT = "CHANGE_CONTACT";
export const CHANGE_CONTACT_MAPIMG = "CHANGE_CONTACT_MAPIMG";
export const CHANGE_CONTACT_MAP = "CHANGE_CONTACT_MAP";

export function changeCB(checkboxId, checkBoxState) {
    return { type: CHANGE_CHECKBOX,
        payload: {
            checkBoxId: checkboxId,
            checkBoxState: !checkBoxState
        }
    };
}

export function changeState(id, state, dispatch, roleDescrs) {
    if(id == "role")
    {
        dispatch(changeState("roleDesc", roleDescrs[state]));
    }
    return { type: CHANGE_STATE,
        payload: {
            stateId: id,
            cState: state
        }
    };
}

export function changeJType(pret, t, st) {
    if(!pret) {
        if(!st)
            return { type: CHANGE_PJOURNAL_DEL_TYPE,
                payload: {
                    t: t
                }
            };
        return {
            type: CHANGE_PJOURNAL_NEW_TYPE,
            payload: {
                t: t,
                st: st
            }
        };
    }
    return { type: CHANGE_PJOURNAL_TYPE,
        payload: {
            pret: pret,
            t: t,
            st: st
        }
    };
}

export function changeDZ(dz, st) {
    return { type: CHANGE_PJOURNAL_DZ,
        payload: {
            dz: dz,
            st: st
        }
    };
}

export function changePjournalMarks(kid, day, mark, st, per, typ, wei) {
    if(per != undefined){
        if(mark == "Л") {
            return {
                type: CHANGE_PJOURNAL_DEL_PER_MARKS,
                payload: {
                    kid: kid,
                    per: per
                }
            };
        }
        return mark == 0 || mark == "Н" ? {type: "default", payload: undefined} : {
            type: CHANGE_PJOURNAL_PER_MARKS,
            payload: {
                kid: kid,
                per: per,
                State: mark
            }
        };
    }
    if(st == undefined){
        st = {
            mark: mark
        }
        if(typ != "") st["type"] = typ;
        if(wei) st["weight"] = mark == "Н" ? 1 : wei;
        if(mark == "Л") mark = 0;
    } else {
        st = {
            ...st,
            mark : mark,
            weight : mark == "Н" || typ == "" ? 1 : st.weight
        }
        if(typ != "") st["type"] = typ;
        if(wei) st["weight"] = mark == "Н" ? 1 : wei;
        if(mark == "Л") {
            return {
                type: CHANGE_PJOURNAL_DEL_MARKS,
                payload: {
                    kid: kid,
                    day: day
                }
            };
        }
    }
    return mark == 0 ? {type: "default", payload: undefined} : {
        type: CHANGE_PJOURNAL_MARKS,
        payload: {
            kid: kid,
            day: day,
            State: st
        }
    };
}

export function changePjournal(id, state) {
    return { type: CHANGE_PJOURNAL,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changeProfileRoles(roleid, id, state) {
    return { type: CHANGE_PROFILE_ROLES,
        payload: {
            Id: id,
            roleId: roleid,
            State: state
        }
    };
}

export function changeProfile(id, state) {
    return { type: CHANGE_PROFILE,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changePaneDelGRS(id, gid) {
    return { type: CHANGE_PANE_DEL_GRS,
        payload: {
            Id: id,
            gId: gid
        }
    };
}

export function changePaneGRS(id, gid, state) {
    return { type: CHANGE_PANE_GRS,
        payload: {
            Id: id,
            gId: gid,
            State: state
        }
    };
}

export function changePaneGR(id, state, block) {
    if(block) return {type: "default", payload: {}};
    return { type: CHANGE_PANE_GR,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changePane(id, state) {
    return { type: CHANGE_PANE,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changeAdmins(id, state) {
    return { type: CHANGE_ADMINS,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changeParents(id, state) {
    return { type: CHANGE_PARENTS,
        payload: {
            Id: id,
            State: state
        }
    };
}

export function changeClassmates(id, state) {
    return { type: CHANGE_CLASSMATES,
        payload: {
            classmatesId: id,
            classmatesState: state
        }
    };
}

export function changeHTeachers(id, state) {
    return { type: CHANGE_HTEACHERS,
        payload: {
            hteaId: id,
            hteaState: state
        }
    };
}

export function changeTeachers(id, state) {
    return { type: CHANGE_TEACHERS,
        payload: {
            teaId: id,
            teaState: state
        }
    };
}

export function changeMarks(id, state) {
    return { type: CHANGE_MARKS,
        payload: {
            markId: id,
            markState: state
        }
    };
}

export function changeJournal(id, state) {
    return { type: CHANGE_JOURNAL,
        payload: {
            jourId: id,
            jourState: state
        }
    };
}

export function changeSchedule(id, state) {
    return { type: CHANGE_SCHEDULE,
        payload: {
            schId: id,
            schState: state
        }
    };
}

export function changePeriods(id, state) {
    return { type: CHANGE_ZVONKI,
        payload: {
            perId: id,
            perState: state
        }
    };
}

export function changeZvonki(id, state) {
    return { type: CHANGE_ZVONKI,
        payload: {
            smenaId: id,
            smenaState: state
        }
    };
}

export function changeDnevnik(id, state, type) {
    return { type: type,
        payload: {
            stateId: id,
            cState: state
        }
    };
}

export function changeNewsDel(type, id) {
    return {
        type: CHANGE_NEWS_DEL,
        payload: {
            type: type,
            id: id
        }
    };
}

export function changeNewsParam(type, id, param, state) {
    return {
        type: CHANGE_NEWS_PARAM,
        payload: {
            type: type,
            id: id,
            param: param,
            state: state
        }
    };
}

export function changeNews(type, id, title, date, img_url, text) {
    return {
        type: CHANGE_NEWS,
        payload: {
            type: type,
            id: id,
            state: {
                title: title,
                date: date,
                img_url: img_url,
                text: text
            }
        }
    };
}

export function changeContactsMapImage(type, url) {
    return {
        type: CHANGE_CONTACT_MAPIMG,
        payload: {
            type: type,
            state: url
        }
    };
}

export function changeContactsMap(type, text) {
    return {
        type: CHANGE_CONTACT_MAP,
        payload: {
            type: type,
            state: text
        }
    };
}

export function changeContacts(type, text) {
    return {
        type: CHANGE_CONTACT,
        payload: {
            type: type,
            state: text
        }
    };
}

export function changeTheme(themeState) {
    let stat = !themeState;
    document.body.setAttribute(thP[stat].c, '');
    if(document.body.hasAttribute(thP[stat].p)) document.body.removeAttribute(thP[stat].p)
    Object.getOwnPropertyNames(thP[stat].params).map((param) =>{
        document.documentElement.style.setProperty(param, thP[stat].params[param]);
    });
    return {type: CHANGE_THEME, payload: stat};
}

export function changeIndNext(indState, res) {
    if(res) res();
    let stat = indState + 1;
    if(stat > 3) stat = 0;
    return { type: CHANGE_INDICATOR, payload: stat};
}

export function changeIndPrev(indState, res) {
    res();
    let stat = indState - 1;
    if(stat < 0) stat = 3;
    return { type: CHANGE_INDICATOR, payload: stat};
}

export function changeInd(indState, res) {
    res();
    return { type: CHANGE_INDICATOR, payload: indState};
}

export function changeCL(body) {
    return {
        type: CHANGE_CLIENT, payload: body
    };
}