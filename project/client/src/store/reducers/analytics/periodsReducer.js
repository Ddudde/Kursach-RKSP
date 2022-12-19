import {CHANGE_PERIODS} from '../../actions';

const initialState = {
        0 : {name: "I четверть", per: "01.09.22-03.11.22"},
        1 : {name: "II четверть", per: "12.11.22-29.12.22"},
        2 : {name: "III четверть", per: "11.01.23-23.03.23"},
        3 : {name: "IV четверть", per: "01.04.23-30.05.23"}
    };

export default function periodsReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_PERIODS:
            return {
                    ...state,
                    [action.payload.perId]: action.payload.perState
                };
        default:
            return state;
    }
}