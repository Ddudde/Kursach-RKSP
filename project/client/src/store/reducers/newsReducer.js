import {CHANGE_NEWS_POR, CHANGE_NEWS_YO} from '../actions';

const initialState = {
    newsYo: {
        "id_0": { title: 'Мы перешли на этот сервис', date: '11.11.2022', img_url: '', text: 'Всем своим дружным коллективом мы остановились на данном варианте.'}
    },
    newsPor: {
        "id_0": { title: 'А проект вышел большим...', date: '02.12.2022', img_url: '/media/tuman.jpg', text: 'Да-да, всё ещё не конец...'},
        "id_1": { title: 'День рождения портала!', date: '25.04.2022', img_url: '', text: 'Начались первые работы'}
    }
};
export default function newsReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_NEWS_YO:
            return {
                newsYo: {
                    ...state.newsYo,
                    [action.payload.newsId]: action.payload.newsState
                },
                ...state.newsPor
            };
        case CHANGE_NEWS_POR:
            return {
                newsPor: {
                    ...state.newsPor,
                    [action.payload.newsId]: action.payload.newsState
                },
                ...state.newsYo
            };
        default:
            return state;
    }
}