import {CHANGE_TEACHERS} from '../../actions';

const initialState = {
        my: {
            "Англ. яз." : {
                "id1" : "Петров А.А.",
                "id2" : "Петров А.Б."
            },
            "Русский яз.": {
                "id1" : "Петров А.А."
            },
            "Математика": {
                "id1" : "Петров А.А."
            },
            "Окруж. мир": {
                "id1" : "Петров А.А."
            }
        },
        nemy: {
            "Русский яз.": {
                "id1" : "Петров А.А."
            },
            "Математика": {
                "id1" : "Петров А.А."
            },
            "Алгебра": {
                "id1" : "Петров А.А.",
                "id2" : "Петров А.С.",
                "id3" : "Петров А.Г."
            }
        }
    };

export default function teachersReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_TEACHERS:
            return {
                    ...state,
                    [action.payload.teaId]: action.payload.teaState
                };
        default:
            return state;
    }
}