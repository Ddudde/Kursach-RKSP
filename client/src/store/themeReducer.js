import {CHANGE_THEME} from './actions';

const initialState = {
    "theme_ch": false,
    "theme": "тёмная"
};

export default function themeReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_THEME:
            state.theme = action.payload.themeState ? "светлая" : "тёмная";
            if (action.payload.themeState) {
                state.theme = "светлая";
                document.body.setAttribute('theme_light', '');
                if(document.body.hasAttribute("theme_dark")) document.body.removeAttribute("theme_dark")
            } else {
                state.theme = "тёмная";
                document.body.setAttribute('theme_dark', '');
                if(document.body.hasAttribute("theme_light")) document.body.removeAttribute("theme_light")
            }
            return {
                ...state,
                [action.payload.themeId]: action.payload.themeState
            };
        default:
            return state;
    }
}