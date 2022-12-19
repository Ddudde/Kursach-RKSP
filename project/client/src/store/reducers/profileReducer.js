import {CHANGE_PROFILE, CHANGE_PROFILE_ROLES} from "../actions";

const initialState = {
        login: "test",
        ico: 2,
        fio: "Иванов Иван Иванович",
        more: "",
        roles: {
            0: {
                roleDesc: "обучающийся",
                yo: "Школа №1541",
                email: "ya@ya.ru",
                parents: {
                    "id1": "Петров А.А.",
                    "id2": "Петрова А.Б."
                },
                group: "10A"
            },
            1: {
                roleDesc: "родитель",
                yo: "Школа №1541",
                kids: {
                    "id1": "Петров А.А.",
                    "id2": "Петрова А.Б."
                },
                email: "ya@ya.ru"
            },
            2: {
                roleDesc: "педагог",
                yo: "Школа №1541",
                lessons: ["Англ. Яз.", "Математика"],
                email: "ya@ya.ru"
            },
            3: {
                roleDesc: "завуч",
                yo: "Школа №1541",
                email: "ya@ya.ru"
            },
            4: {
                roleDesc: "администратор портала",
                email: "ya@ya.ru",
            }
        }
    };

export default function profileReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_PROFILE:
            return {
                    ...state,
                    [action.payload.Id]: action.payload.State
                };
        case CHANGE_PROFILE_ROLES:
            return {
                ...state,
                roles: {
                    ...state.roles,
                    [action.payload.roleId] : {
                        ...state.roles[action.payload.roleId],
                        [action.payload.Id]: action.payload.State
                    }
                }
            };
        default:
            return state;
    }
}