import {CHANGE_ADMINS} from '../../actions';

const initialState = {
        "id1" : "Новиков А.А.",
        "id2" : "Новиков А.С.",
        "id3" : "Новиков А.Г."
    };

export default function adminsReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_ADMINS:
            return {
                    ...state,
                    [action.payload.Id]: action.payload.State
                };
        default:
            return state;
    }
}