import {CHANGE_THEME} from '../../actions';

let x = !window.matchMedia('(prefers-color-scheme: dark)');

const initialState = {
    theme_ch: x,
    theme: x ? "светлая" : "тёмная"
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