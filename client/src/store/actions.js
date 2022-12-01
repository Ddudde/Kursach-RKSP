export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHANGE_CLIENT = "CHANGE_CLIENT";
export const CHANGE_INDICATOR = "CHANGE_INDICATOR";
export const CHANGE_NEWS = "CHANGE_NEWS";
export const CHANGE_CONTACT = "CHANGE_CONTACT";

export function changeCB(checkboxId, checkBoxState) {
    return { type: CHANGE_CHECKBOX,
        payload: {
            checkBoxId: checkboxId,
            checkBoxState: !checkBoxState
        }
    };
}

export function changeNews(type, id, title, date, img_url, text) {
    return { type: CHANGE_NEWS,
        payload: {
            newsType: type,
            newsId: id,
            newsState: {title: title, date: date, img_url: img_url, text: text}
        }
    };
}

export function changeContacts(type, id, title, number) {
    return { type: CHANGE_CONTACT,
        payload: {
            contactType: type,
            contactId: id,
            contactState: {title: title, number: number}
        }
    };
}

export function changeTheme(themeState) {
    return { type: CHANGE_THEME,
        payload: {
            themeId: "theme_ch",
            themeState: !themeState
        }
    };
}

export function changeIndTimer(indState) {
    let stat = parseInt(indState.split('_')[1]) + 1;
    if(stat > 3) stat = 0;
    return { type: CHANGE_INDICATOR,
        payload: 'ind_' + stat
    };
}

export function changeIndNext(indState, res) {
    res();
    let stat = parseInt(indState.split('_')[1]) + 1;
    if(stat > 3) stat = 0;
    return { type: CHANGE_INDICATOR,
        payload: 'ind_' + stat
    };
}

export function changeIndPrev(indState, res) {
    res();
    let stat = parseInt(indState.split('_')[1]) - 1;
    if(stat < 0) stat = 3;
    return { type: CHANGE_INDICATOR,
        payload: 'ind_' + stat
    };
}

export function changeInd(indState, res) {
    res();
    return { type: CHANGE_INDICATOR,
        payload: indState
    };
}

export function changeCL(body) {
    return {
        type: CHANGE_CLIENT, payload: body
    };
}