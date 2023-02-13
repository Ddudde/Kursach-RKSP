import {CHANGE_TEACHERS, CHANGE_TEACHERS_DEL, CHANGE_TEACHERS_GL} from '../../actions';

const initialState = {
        0: {
            "Англ. яз." : {
                "id1" : {
                    name: "Петров А.А."
                    // link: sit + "/invite/x"
                },
                "id2" : {
                    name: "Петров А.Б."
                }
            },
            "Русский яз.": {
                "id1" : {
                    name: "Петров А.А."
                }
            },
            "Математика": {
                "id1" : {
                    name: "Петров А.А."
                }
            },
            "Окруж. мир": {
                "id1" : {
                    name: "Петров А.А."
                }
            }
        },
        1: {
            "Русский яз.": {
                "id3" : {
                    name: "Петров А.А."
                }
            },
            "Математика": {
                "id4" : {
                    name: "Петров А.А."
                }
            },
            "Алгебра": {
                "id5" : {
                    name: "Петров А.А."
                },
                "id6" : {
                    name: "Петров А.С."
                },
                "id7" : {
                    name: "Петров А.Г."
                }
            }
        }
    };

export default function teachersReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_TEACHERS_GL:
            fd[action.payload.type] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS:
            if(!fd[action.payload.type][action.payload.l1][action.payload.l2]){
                fd[action.payload.type][action.payload.l1][action.payload.l2] = {};
            }
            fd[action.payload.type][action.payload.l1][action.payload.l2][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS_DEL:
            delete fd[action.payload.type][action.payload.l1][action.payload.l2];
            return fd;
        default:
            return state;
    }
}