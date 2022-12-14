import {CHANGE_INDICATOR} from '../../actions';

const initialState = {
    actived: "ind_0",
    ind_0: "1",
    ind_1: "0",
    ind_2: "0",
    ind_3: "0"
};

export default function indicatorReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_INDICATOR:
            return {
                ...state,
                [state.actived] : "0",
                actived : action.payload,
                [action.payload] : "1"
            };
        default:
            return state;
    }
}