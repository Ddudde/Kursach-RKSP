export const CHANGE_CHECKBOX = "CHANGE_CHECKBOX";

export function change(checkbox_id, checkBoxState) {
    return { type: CHANGE_CHECKBOX,
        payload: {
            checkBoxId: checkbox_id,
            checkBoxState: !checkBoxState
        }
    };
}