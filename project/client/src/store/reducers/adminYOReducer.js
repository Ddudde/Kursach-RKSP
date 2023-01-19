import {
    CHANGE_ADMINYO, CHANGE_ADMINYO_GR,
    CHANGE_PJOURNAL,
    CHANGE_PJOURNAL_DEL_MARKS,
    CHANGE_PJOURNAL_DEL_PER_MARKS,
    CHANGE_PJOURNAL_DEL_TYPE,
    CHANGE_PJOURNAL_DZ,
    CHANGE_PJOURNAL_MARKS,
    CHANGE_PJOURNAL_NEW_TYPE,
    CHANGE_PJOURNAL_PER_MARKS,
    CHANGE_PJOURNAL_TYPE
} from '../actions';

const initialState = {
        els: []
};

export default function adminYOReducer(state = initialState, action) {
    let fd;
    switch(action.type) {
        case CHANGE_ADMINYO:
            fd = {...state};
            fd.els[action.payload.Id] = action.payload.State;
            return fd;
        case CHANGE_ADMINYO_GR:
            fd = {...state};
            fd.els[action.payload.Id].group = action.payload.State;
            return fd;
        default:
            return state;
    }
}