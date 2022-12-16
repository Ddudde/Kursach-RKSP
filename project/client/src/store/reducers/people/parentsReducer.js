import {CHANGE_PARENTS} from '../../actions';

const initialState = {
        "id1" : {
            name : "Петров А.А.",
            par : {
                "id1": "Петров А.А.",
                "id2": "Петрова А.Б."
            }
        },
        "id2": {
            name : "Васечкин А.С.",
            par : {
                "id1": "Петров А.А."
            }
        },
        "id3": {
            name : "Петров А.Г.",
            par : {
                "id1": "Петров А.А."
            }
        }
    };

export default function parentsReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_PARENTS:
            return {
                    ...state,
                    [action.payload.Id]: action.payload.State
                };
        default:
            return state;
    }
}