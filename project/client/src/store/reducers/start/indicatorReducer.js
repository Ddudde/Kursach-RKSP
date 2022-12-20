import {CHANGE_INDICATOR} from '../../actions';

const initialState = {
    actived: 0
};

export default function indicatorReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_INDICATOR:
            return {
                actived : action.payload
            };
        default:
            return state;
    }
}