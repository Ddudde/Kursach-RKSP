import {CHANGE_CONTACT, CHANGE_CONTACT_MAP, CHANGE_CONTACT_MAPIMG} from '../actions';

let contYO, mapTextYO, contPOR, mapTextPOR;

contYO =
`8 (800) 555 35 36
5 (353) 555 00 88`;

mapTextYO =
`Ближайшие станции метро:
Александровский сад, 610 м (Филёвская линия, выход 5)
Библиотека им. Ленина, 680 м (Сокольническая линия, выход 3)
Арбатская, 750 м (Арбатско-Покровская линия, выход 8)`;

contPOR =
`8 (800) 555 35 37
5 (353) 555 00 88`;

mapTextPOR =
`Ближайшие станции метро:
Александровский сад, 610 м (Филёвская линия, выход 5)
Библиотека им. Ленина, 680 м (Сокольническая линия, выход 3)
Арбатская, 750 м (Арбатско-Покровская линия, выход 8)`;

const initialState = {
    "Yo": {
        contact: contYO,
        mapPr: {
            text: mapTextYO,
            imgUrl: "/media/map.jpg"
        }
    },
    "Por": {
        contact: contPOR,
        mapPr: {
            text: mapTextPOR,
            imgUrl: "/media/map.jpg"
        }
    }
};
export default function contactReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_CONTACT:
            fd[action.payload.type].contact = action.payload.state;
            return fd;
        case CHANGE_CONTACT_MAPIMG:
            fd[action.payload.type].mapPr.imgUrl = action.payload.state;
            return fd;
        case CHANGE_CONTACT_MAP:
            fd[action.payload.type].mapPr.text = action.payload.state;
            return fd;
        default:
            return state;
    }
}