export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_CLIENT = "CHANGE_CLIENT";
export const CHANGE_INDICATOR = "CHANGE_INDICATOR";
export const CHANGE_NEWS_YO = "CHANGE_NEWS_YO";
export const CHANGE_NEWS_POR = "CHANGE_NEWS_POR";
export const CHANGE_CONTACT_YO = "CHANGE_CONTACT_YO";
export const CHANGE_CONTACT_YO_IMAGEURL = "CHANGE_CONTACT_YO_IMAGEURL";
export const CHANGE_CONTACT_POR = "CHANGE_CONTACT_POR";
export const CHANGE_CONTACT_POR_IMAGEURL = "CHANGE_CONTACT_POR_IMAGEURL";

export function changeCB(checkboxId, checkBoxState) {
    return { type: CHANGE_CHECKBOX,
        payload: {
            checkBoxId: checkboxId,
            checkBoxState: !checkBoxState
        }
    };
}

export function changeNews(type, id, title, date, img_url, text) {
    return { type: type === "Yo" ? CHANGE_NEWS_YO : CHANGE_NEWS_POR,
        payload: {
            newsType: type,
            newsId: id,
            newsState: {title: title, date: date, img_url: img_url, text: text}
        }
    };
}

export function changeContacts(type, id, title, number) {
    let stype;
    if(type === "Yo")
    {
        stype = id === "imageUrl" ? CHANGE_CONTACT_YO_IMAGEURL : CHANGE_CONTACT_YO;
    } else {
        stype = id === "imageUrl" ? CHANGE_CONTACT_POR_IMAGEURL : CHANGE_CONTACT_POR;
    }
    return { type: stype,
        payload: {
            contactType: type,
            contactId: id,
            contactState: {title: title, number: number}
        }
    };
}

export function changeTheme(themeState) {
    let stat = !themeState;
    if (stat) {
        document.body.setAttribute('theme_light', '');
        if(document.body.hasAttribute("theme_dark")) document.body.removeAttribute("theme_dark")
    } else {
        document.body.setAttribute('theme_dark', '');
        if(document.body.hasAttribute("theme_light")) document.body.removeAttribute("theme_light")
    }
    return { type: CHANGE_THEME, payload: stat};
}

function preInd(pay, actived) {
    let idind = document.querySelector("#" + actived);
    if(idind) idind.setAttribute('data-activated', '0');
    let idb = document.querySelector('#g_block_' + (parseInt(actived.split('_')[1]) + 1));
    if(idb)
    {
        idb.style.display = 'none';
        idb.style.opacity = '0';
    }
    idb = document.querySelector('#g_block_' + (parseInt(pay.split('_')[1]) + 1));
    if(idb)
    {
        idb.style.display = 'block';
        idb.style.opacity = '1';
    }
    idind = document.querySelector("#" + pay);
    if(idind) idind.setAttribute('data-activated', '1');
    return { type: CHANGE_INDICATOR,
        payload: pay
    };
}

export function changeIndTimer(indState) {
    let stat = parseInt(indState.split('_')[1]) + 1;
    if(stat > 3) stat = 0;
    return preInd('ind_' + stat, indState);
}

export function changeIndNext(indState, res) {
    res();
    let stat = parseInt(indState.split('_')[1]) + 1;
    if(stat > 3) stat = 0;
    return preInd('ind_' + stat, indState);
}

export function changeIndPrev(indState, res) {
    res();
    let stat = parseInt(indState.split('_')[1]) - 1;
    if(stat < 0) stat = 3;
    return preInd('ind_' + stat, indState);
}

export function changeInd(indState, res, actived) {
    res();
    return preInd(indState, actived);
}

export function changeCL(body) {
    return {
        type: CHANGE_CLIENT, payload: body
    };
}