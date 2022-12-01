import {CHANGE_INDICATOR} from '../actions';

const initialState = {
    "actived": "ind_0",
    "ind_0": "1",
    "ind_1": "0",
    "ind_2": "0",
    "ind_3": "0"
};

export default function indicatorReducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch(action.type) {
        case CHANGE_INDICATOR:
            let sost = {...state};
            sost[sost.actived] = "0";
            let idind = document.querySelector("#" + sost.actived);
            if(idind) idind.setAttribute('data-activated', '0');
            let idb = document.querySelector('#g_block_' + (parseInt(sost.actived.split('_')[1]) + 1));
            if(idb)
            {
                idb.style.display = 'none';
                idb.style.opacity = '0';
            }
            sost.actived = action.payload;
            sost[sost.actived] = "1";
            idb = '#g_block_' + (parseInt(sost.actived.split('_')[1]) + 1);
            idb = document.querySelector('#g_block_' + (parseInt(sost.actived.split('_')[1]) + 1));
            if(idb)
            {
                idb.style.display = 'block';
                idb.style.opacity = '1';
            }
            idind = document.querySelector("#" + sost.actived);
            if(idind) idind.setAttribute('data-activated', '1');
            return sost;
        default:
            return state;
    }
}