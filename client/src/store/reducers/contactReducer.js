import {CHANGE_CONTACT} from '../actions';

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
        case CHANGE_CONTACT:
            let result;
            switch(action.payload.contactType) {
                case "Yo":
                    if(action.payload.contactId === "imageUrl") {
                        result = {
                            ...state,
                            contactsYo: {
                                ...state.contactsYo,
                                [action.payload.contactId]: action.payload.contactState.title
                            }
                        };
                    } else {
                        result = {
                            ...state,
                            contactsYo: {
                                ...state.contactsYo,
                                numbers: {
                                    ...state.contactsYo.numbers,
                                    [action.payload.contactId]: action.payload.contactState
                                }
                            }
                        };
                    }
                    break;
                case "Por":
                    if(action.payload.contactId === "imageUrl") {
                        result = {
                            ...state,
                            contactsPor: {
                                ...state.contactsPor,
                                [action.payload.contactId]: action.payload.contactState.title
                            }
                        };
                    } else {
                        result = {
                            ...state,
                            contactsPor: {
                                ...state.contactsPor,
                                numbers: {
                                    ...state.contactsPor.numbers,
                                    [action.payload.contactId]: action.payload.contactState
                                }
                            }
                        };
                    }
                    break;
                default:
                    return state;
            }
            return result;
        default:
            return state;
    }
}