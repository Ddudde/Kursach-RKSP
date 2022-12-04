import {
    CHANGE_CONTACT_YO,
    CHANGE_CONTACT_POR,
    CHANGE_CONTACT_YO_IMAGEURL,
    CHANGE_CONTACT_POR_IMAGEURL
} from '../actions';

const initialState = {
    contactsYo: {
        numbers: {
            "id_0": { title: '8 (800) 555 35 36', number: '+78005553535'},
            "id_1": { title: '5 (353) 555 00 88', number: '+53535550088'}
        },
        imageUrl: "/media/map.jpg"
    },
    contactsPor: {
        numbers: {
            "id_0": { title: '8 (800) 555 35 35', number: '+78005553535'},
            "id_1": { title: '5 (353) 555 00 88', number: '+53535550088'}
        },
        imageUrl: "/media/map.jpg"
    }
};
export default function contactReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_CONTACT_YO_IMAGEURL:
            return {
                ...state,
                contactsYo: {
                    ...state.contactsYo,
                    [action.payload.contactId]: action.payload.contactState.title
                }
            };
        case CHANGE_CONTACT_YO:
            return {
                ...state,
                contactsYo: {
                    ...state.contactsYo,
                    numbers: {
                        ...state.contactsYo.numbers,
                        [action.payload.contactId]: action.payload.contactState
                    }
                }
            };
        case CHANGE_CONTACT_POR_IMAGEURL:
            return  {
                ...state,
                contactsPor: {
                    ...state.contactsPor,
                    [action.payload.contactId]: action.payload.contactState.title
                }
            };
        case CHANGE_CONTACT_POR:
            return  {
                ...state,
                contactsPor: {
                    ...state.contactsPor,
                    numbers: {
                        ...state.contactsPor.numbers,
                        [action.payload.contactId]: action.payload.contactState
                    }
                }
            };
        default:
            return state;
    }
}