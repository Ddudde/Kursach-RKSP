import {CHANGE_CHECKBOX} from './actions';

const initialState = {
        "0": false
    };

export default function checkBoxReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_CHECKBOX:
            return {
                    ...state,
                    [action.payload.checkBoxId]: action.payload.checkBoxState
                };
        default:
            return state;
    }
}