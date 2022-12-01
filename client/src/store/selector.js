export const all = state => state
export const clients = state => state.client || {"clients":[]};
export const newsSelec = state => state.news || {"news":[]};

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