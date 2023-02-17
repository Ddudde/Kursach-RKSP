import {
    CHANGE_TEACHERS,
    CHANGE_TEACHERS_DEL,
    CHANGE_TEACHERS_DEL_L1,
    CHANGE_TEACHERS_GL,
    CHANGE_TEACHERS_L1
} from '../../actions';

const initialState = {
    0: {
        "Англ. яз." : {
            "id1" : {
                name: "Петров А.А.1"
                // link: sit + "/invite/x"
            },
            "id2" : {
                name: "Петров А.Б.2"
            }
        },
        "Русский яз.": {
            "id1" : {
                name: "Петров А.А.1"
            }
        },
        "Математика": {
            "id1" : {
                name: "Петров А.А.1"
            }
        },
        "Окруж. мир": {
            "id1" : {
                name: "Петров А.А.1"
            }
        }
    },
    1: {
        "Русский яз.": {
            "id3" : {
                name: "Петров А.А.3"
            }
        },
        "Математика": {
            "id4" : {
                name: "Петров А.А.4"
            }
        },
        "Алгебра": {
            "id5" : {
                name: "Петров А.А.5"
            },
            "id6" : {
                name: "Петров А.С.6"
            },
            "id7" : {
                name: "Петров А.Г.7"
            }
        }
    },
    2 : {
        "id5" : {
            name: "Петров А.А.5"
        },
        "id6" : {
            name: "Петров А.С.6"
        },
        "id7" : {
            name: "Петров А.Г.7"
        }
    }
};

export default function teachersReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_TEACHERS_GL:
            fd[action.payload.l0] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS:
            if(!fd[action.payload.l0][action.payload.l1][action.payload.l2]){
                fd[action.payload.l0][action.payload.l1][action.payload.l2] = {};
            }
            fd[action.payload.l0][action.payload.l1][action.payload.l2][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS_L1:
            if(!fd[action.payload.l0][action.payload.l1]){
                fd[action.payload.l0][action.payload.l1] = {};
            }
            fd[action.payload.l0][action.payload.l1][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_TEACHERS_DEL:
            delete fd[action.payload.l0][action.payload.l1][action.payload.l2];
            return fd;
        case CHANGE_TEACHERS_DEL_L1:
            delete fd[action.payload.l0][action.payload.l1];
            return fd;
        default:
            return state;
    }
}