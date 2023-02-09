import {CHANGE_TEACHERS, CHANGE_TEACHERS_DEL, CHANGE_TEACHERS_GL} from '../../actions';

const initialState = {
        0: {},
        1: {}
    };

export default function teachersReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_TEACHERS_GL:
            fd[action.payload.type] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS:
            fd[action.payload.type][action.payload.l1][action.payload.l2][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS_DEL:
            delete fd[action.payload.type][action.payload.l1][action.payload.l2];
            return fd;
        default:
            return state;
    }
}