import {CHANGE_STATE} from "../actions";

const initialState = {
        login: "test",
        ico: 2,
        fio: "Иванов Иван Иванович",
        more: "",
        roles: [
            {
                role: 0,
                roleDesc: "обучающийся",
                yo: "Школа №1541",
                email: "ya@ya.ru",
                parents: {
                    "id1": "Петров А.А.",
                    "id2": "Петрова А.Б."
                },
                group: "10A"
            },
            {
                role: 1,
                roleDesc: "родитель",
                yo: "Школа №1541",
                kids: {
                    "id1": "Петров А.А.",
                    "id2": "Петрова А.Б."
                },
                email: "ya@ya.ru"
            },
            {
                role: 2,
                roleDesc: "педагог",
                yo: "Школа №1541",
                lessons: ["Англ. Яз.", "Математика"],
                email: "ya@ya.ru"
            },
            {
                role: 3,
                roleDesc: "завуч",
                yo: "Школа №1541",
                email: "ya@ya.ru"
            },
            {
                role: 4,
                roleDesc: "админ",
                email: "ya@ya.ru",
            }
        ]
    };

export default function profileReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_STATE:
            return {
                    ...state,
                    [action.payload.stateId]: action.payload.cState
                };
        default:
            return state;
    }
}