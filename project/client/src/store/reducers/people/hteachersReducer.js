import {CHANGE_HTEACHERS, CHANGE_HTEACHERS_DEL, CHANGE_HTEACHERS_GL} from '../../actions';

const initialState = {
        "id1" : {
            name: "Петров А.А."
        },
        "id2" : {
            name: "Петров А.С."
        },
        "id3" : {
            name: "Петров А.Г."
        }
    };

export default function hteachersReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_HTEACHERS_GL:
            return action.payload.state;
        case CHANGE_HTEACHERS:
            if(!fd[action.payload.l2]){
                fd[action.payload.l2] = {};
            }
            fd[action.payload.l2][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_HTEACHERS_DEL:
            delete fd[action.payload.l2];
            return fd;
        default:
            return state;
    }
}