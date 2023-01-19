import {CHANGE_STATE} from '../../actions';

const initialState = {
        auth: true,
        login: "test",
        ico: 2,
        role: 2,
        roleDesc: "завуч",
        roles: true,
        secFr: true,
        rolesDescrs: ["обучающийся", "родитель", "педагог", "завуч", "администратор портала"],
        kid: "id1",
        kids:{
            "id1": "Петров А.А.",
            "id2": "Петрова А.Б."
        }
    };

export default function statusReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_STATE:
            return {
                    ...state,
                    [action.payload.stateId]: action.payload.cState,
                };
        default:
            return state;
    }
}