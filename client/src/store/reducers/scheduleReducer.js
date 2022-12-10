import {CHANGE_SCHEDULE} from '../actions';

const initialState = {
    schedule: {
        0 : ["Англ. яз.", "Русский яз.", "Математика", "Окруж. мир"],
        1 : ["Русский яз.", "Математика", "Англ. яз.", "Русский яз.", "Математика", "Окруж. мир"],
        2 : ["Англ. яз.", "Англ. яз.", "Русский яз.", "Математика", "Окруж. мир"],
        3 : ["Математика", "Окруж. мир"],
        4 : ["Англ. яз.", "Русский яз."],
        5 : [],
        6 : []
    },
    days: {
        0 : {
            lessons: [
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                }
            ]
        },
        1 : {
            lessons: [
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                }
            ]
        },
        2 : {
            lessons: [
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                }
            ]
        },
        3 : {
            lessons: [
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                }
            ]
        },
        4 : {
            lessons: [
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                },
                {
                    cabinet: "300",
                    prepod: "Петренко А.А."
                }
            ]
        },
        5 : {
            lessons: []
        },
        6 : {
            lessons: []
        }
    }
};

export default function scheduleReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_SCHEDULE:
            return {
                    ...state,
                    [action.payload.schId]: action.payload.schState
                };
        default:
            return state;
    }
}