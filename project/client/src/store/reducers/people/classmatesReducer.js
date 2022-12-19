import {CHANGE_CLASSMATES} from '../../actions';

const initialState = {
        "id1" : "Петров А.А.",
        "id2" : "Васечкин А.С.",
        "id3" : "Петров А.Г."
    };

export default function classmatesReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_CLASSMATES:
            return {
                    ...state,
                    [action.payload.classmatesId]: action.payload.classmatesState
                };
        default:
            return state;
    }
}