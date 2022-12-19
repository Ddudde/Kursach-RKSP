import {CHANGE_HTEACHERS} from '../../actions';

const initialState = {
        "id1" : "Петров А.А.",
        "id2" : "Петров А.С.",
        "id3" : "Петров А.Г."
    };

export default function hteachersReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_HTEACHERS:
            return {
                    ...state,
                    [action.payload.hteaId]: action.payload.hteaState
                };
        default:
            return state;
    }
}