import {CHANGE_STATE} from '../actions';

const initialState = {
        auth: true,
        login: "test",
        ico: 2,
        role: 0, // 0-обучающийся, 1-родитель, 2-педагог, 3-завуч, 4-админ
        roleDesc: "обучающийся",
        roles: false
    };

export default function statusReducer(state = initialState, action) {
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