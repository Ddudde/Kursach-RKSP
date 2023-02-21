import {
    CHANGE_EVENT,
    CHANGE_EVENT_DEL,
    CHANGE_EVENT_TIMER,
    CHANGE_EVENT_TIMER_DEL,
    CHANGE_EVENTS,
    CHANGE_EVENTS_CLEAR,
    CHANGE_EVENTS_RL,
    CHANGE_EVENTS_STEP
} from '../../actions';

const initialState = {
    steps: 0,
    right: true,
    evs: {
        // 0: {
        //     title: 'Внимание1!',
        //     dtime: '12:00',
        //     text: 'Допустимы только латиница и цифры'
        // },
        // 1: {
        //     title: 'Внимание2!',
        //     dtime: '12:00',
        //     text: 'Допустимы только латиница и цифры'
        // },
        // 2: {
        //     title: 'Внимание3!',
        //     dtime: '12:00',
        //     text: 'Допустимы только латиница и цифры'
        // }
    },
    time: {
        // 0: {
        //     long: 10,
        //     init: false
        // },
        // 1: {
        //     long: 5,
        //     init: false
        // }
    }
};

export default function eventsReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_EVENTS:
            fd.evs = action.payload;
            return fd;
        case CHANGE_EVENTS_CLEAR:
            fd.evs = {};
            fd.time = {};
            return fd;
        case CHANGE_EVENT:
            if(!action.payload.id){
                let evs = Object.getOwnPropertyNames(fd.evs);
                action.payload.id = evs.length == 0 ? 0 : parseInt(evs[evs.length-1]) + 1;
            }
            fd.evs[action.payload.id] = action.payload.state;
            if(action.payload.time.long) fd.time[action.payload.id] = action.payload.time;
            return fd;
        case CHANGE_EVENT_DEL:
            if(action.payload.state && !fd.time[action.payload.id]){
                return fd;
            }
            delete fd.evs[action.payload.id];
            if(fd.time[action.payload.id]) delete fd.time[action.payload.id];
            return fd;
        case CHANGE_EVENT_TIMER:
            fd.time[action.payload.id].init = action.payload.state;
            return fd;
        case CHANGE_EVENT_TIMER_DEL:
            delete fd.time[action.payload];
            return fd;
        case CHANGE_EVENTS_STEP:
            fd.steps += action.payload;
            return fd;
        case CHANGE_EVENTS_RL:
            fd.right = action.payload;
            return fd;
        default:
            return state;
    }
}