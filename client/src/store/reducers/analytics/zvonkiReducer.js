import {CHANGE_ZVONKI} from '../../actions';

const initialState = {
        0 : ["8.00-8.45", "8.50-9.35", "9.45-10.30", "10.40-11.25", "11.30-12.15", "12.20-13.05", "13.10-13.55"],
        1 : ["13.10-13.55", "14.00-14.45", "14.55-15.40", "15.50-16.35", "16.40-17.25", "17.30-18.15", "18.20-19.05"]
    };

export default function zvonkiReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_ZVONKI:
            return {
                    ...state,
                    [action.payload.smenaId]: action.payload.smenaState
                };
        default:
            return state;
    }
}