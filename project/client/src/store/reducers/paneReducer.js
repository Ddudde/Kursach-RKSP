import {CHANGE_PANE, CHANGE_PANE_GR} from '../actions';

const initialState = {
        els: []
};

export default function paneReducer(state = initialState, action) {
    let fd;
    switch(action.type) {
        case CHANGE_PANE:
            fd = {...state};
            fd.els[action.payload.Id] = action.payload.State;
            return fd;
        case CHANGE_PANE_GR:
            fd = {...state};
            fd.els[action.payload.Id].group = action.payload.State;
            return fd;
        default:
            return state;
    }
}