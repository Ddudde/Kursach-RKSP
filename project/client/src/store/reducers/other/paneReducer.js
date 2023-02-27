import {CHANGE_PANE, CHANGE_PANE_DEL_GRS, CHANGE_PANE_GR, CHANGE_PANE_GRS} from '../../actions';

const initialState = {
    els: []
};

export default function paneReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_PANE:
            fd.els[action.payload.Id] = action.payload.State;
            return fd;
        case CHANGE_PANE_GR:
            fd.els[action.payload.Id].group = action.payload.State;
            return fd;
        case CHANGE_PANE_GRS:
            fd.els[action.payload.Id].groups[action.payload.gId] = action.payload.State;
            fd.els[action.payload.Id].group = action.payload.gId;
            return fd;
        case CHANGE_PANE_DEL_GRS:
            delete fd.els[action.payload.Id].groups[action.payload.gId];
            return fd;
        default:
            return state;
    }
}