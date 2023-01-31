import {CHANGE_NEWS, CHANGE_NEWS_DEL, CHANGE_NEWS_PARAM} from '../actions';

const initialState = {
    news: {
        "Yo": {
            0: {
                title: 'Мы перешли на этот сервис',
                date: '11.11.2022',
                img_url: '',
                text: 'Всем своим дружным коллективом мы остановились на данном варианте.'
            }
        },
        "Por": {
            0: {
                title: 'День рождения портала!',
                date: '25.04.2022',
                img_url: '',
                text: 'Начались первые работы'
            },
            1: {
                title: 'А проект вышел большим...',
                date: '02.12.2022',
                img_url: '/media/tuman.jpg',
                text: 'Да-да, всё ещё не конец...'
            }
        }
    }
};

export default function newsReducer(state = initialState, action) {
    let fd = {...state};
    switch(action.type) {
        case CHANGE_NEWS:
            fd.news[action.payload.newsType][action.payload.newsId] = action.payload.newsState;
            return fd;
        case CHANGE_NEWS_PARAM:
            fd.news[action.payload.type][action.payload.id][action.payload.param] = action.payload.state;
            return fd;
        case CHANGE_NEWS_DEL:
            delete fd.news[action.payload.type][action.payload.id];
            return fd;
        default:
            return state;
    }
}