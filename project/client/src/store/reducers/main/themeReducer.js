import {CHANGE_THEME} from '../../actions';

const initialState = {
    theme_ch: false,
    theme: "тёмная"
};

export default function themeReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_THEME:
            return {
                theme_ch: action.payload,
                theme: action.payload ? "светлая" : "тёмная"
            };
        default:
            return state;
    }
}