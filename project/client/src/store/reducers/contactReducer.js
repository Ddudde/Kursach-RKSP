import {CHANGE_CONTACT, CHANGE_CONTACT_MAP, CHANGE_CONTACT_MAPIMG} from '../actions';

let contYO, mapTextYO;

contYO =
`8 (800) 555 35 36
5 (353) 555 00 88`;

mapTextYO =
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
        numbers: {
            0: {
                title: '8 (800) 555 35 35',
                number: '+78005553535'
            },
            1: {
                title: '5 (353) 555 00 88',
                number: '+53535550088'
            }
        },
        imageUrl: "/media/map.jpg"
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