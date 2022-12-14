export const all = state => state
export const states = state => state.states || {};
export const dnevnik = state => state.dnevnik || {};
export const periods = state => state.periods || {};
export const teachers = state => state.teachers || {};
export const classmates = state => state.classmates || {};
export const parents = state => state.parents || {};
export const hteachers = state => state.hteachers || {};
export const schedules = state => state.schedules || {};
export const marks = state => state.marks || {};
export const journals = state => state.journals || {};
export const zvonki = state => state.zvonki || {};
export const newsSelec = state => state.news || {"newsYo": {}, "newsPor": {}};
export const contactsSelec = state => state.contacts || {"contactsYo": {}, "contactsPor": {}};

export function getCheckBoxState(checkbox_id, checkbox_state) {
    return state =>
        state.checkbox[checkbox_id] ||
        checkbox_state ||
        false;
}

export function getThemeState(theme_id, theme_state) {
    return state =>
        state.themes[theme_id] ||
        theme_state ||
        false;
}

export function getIndicatorState(indicator_id, indicator_state) {
    return state =>
        state.indicators[indicator_id];
}