import {CHANGE_STATE} from '../../actions';

const initialState = {
        auth: true,
        login: "test",
        ico: 2,
        role: 0,
        roleDesc: "обучающийся",
        roles: true,
        secFr: true,
        rolesDescrs: ["обучающийся", "родитель", "педагог", "завуч", "администратор портала"]
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