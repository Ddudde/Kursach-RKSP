export const all = state => state

export function getCheckBoxState(checkbox_id, checkbox_state) {
    return state =>
        state.checkbox[checkbox_id] ||
        checkbox_state ||
        false;
}