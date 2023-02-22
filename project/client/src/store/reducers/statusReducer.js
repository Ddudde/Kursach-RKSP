import {CHANGE_STATE} from '../actions';

const initialState = {
        auth: true,
        login: "test",
        ico: 2,
        role: 4,
        roleDesc: "администратор портала",
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
    let fd = {...state};
    switch(action.type) {
        case CHANGE_STATE:
            fd[action.payload.stateId] = action.payload.cState;
            if(action.payload.stateId == "role") {
                fd.roleDesc = fd.rolesDescrs[action.payload.cState];
            }
            return fd;
        default:
            return state;
    }
}