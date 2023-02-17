import {CHANGE_SCHEDULE} from '../../actions';

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
            name: "Понедельник",
            lessons: {
                0: {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                1 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                2 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                3 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                }
            }
        },
        1 : {
            name: "Вторник",
            lessons: {
                0 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                1 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                2 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                3 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                4 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                5 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                }
            }
        },
        2 : {
            name: "Среда",
            lessons: {
                0 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                1 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                2 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                3 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                4 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                }
            }
        },
        3 : {
            name: "Четверг",
            lessons: {
                0 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                1 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                }
            }
        },
        4 : {
            name: "Пятница",
            lessons: {
                0 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                },
                1 : {
                    cabinet: "300",
                    prepod: "Петренко А.А.",
                    group: "10A"
                }
            }
        },
        5 : {
            name: "Суббота"
        },
        6 : {
            name: "Воскресенье"
        }
    },
    edit: {

    }
};

export default function scheduleReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_SCHEDULE:
            if(!fd.days[action.payload.l0]){
                fd.days[action.payload.l0] = {};
            }
            if(!fd.days[action.payload.l0].lessons[action.payload.l1]){
                fd.days[action.payload.l0].lessons[action.payload.l1] = {};
            }
            fd.days[action.payload.l0].lessons[action.payload.l1][action.payload.l2] = action.payload.state;
            return fd;
        default:
            return state;
    }
}