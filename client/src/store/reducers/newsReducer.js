import {CHANGE_NEWS_POR, CHANGE_NEWS_YO} from '../actions';

const initialState = {
    newsYo: {
        "id_0": { title: 'В НЕВЕДЕНИИ УО', date: '02.12.2020', img_url: '/media/tuman.jpg', text: ''},
        "id_1": { title: 'ПОШЛА ВОДА В ХАТУ', date: '11.11.2020', img_url: '', text: 'Вот и подошли первые дедлайны по курсовой работе. А я только вспомнил о существовании курсовой...'},
        "id_2": { title: 'ПОЯВИЛИСЬ ПЕРВЫЕ ПРЕДПОСЛЫКИ К КУРСОВОЙ РАБОТЕ...', date: '25.09.2020', img_url: '', text: 'Сразу же была выбрана тема: «Интернет-ресурс на тему «Компьютерные комплектующие» с использованием технологий HTML5, CSS3, JavaScript»'}
    },
    newsPor: {
        "id_0": { title: 'В НЕВЕДЕНИИ Портала', date: '02.12.2020', img_url: '/media/tuman.jpg', text: ''},
        "id_1": { title: 'ПОШЛА ВОДА В ХАТУ', date: '11.11.2020', img_url: '', text: 'Вот и подошли первые дедлайны по курсовой работе. А я только вспомнил о существовании курсовой...'},
        "id_2": { title: 'ПОЯВИЛИСЬ ПЕРВЫЕ ПРЕДПОСЛЫКИ К КУРСОВОЙ РАБОТЕ...', date: '25.09.2020', img_url: '', text: 'Сразу же была выбрана тема: «Интернет-ресурс на тему «Компьютерные комплектующие» с использованием технологий HTML5, CSS3, JavaScript»'}
    }
};
export default function newsReducer(state = initialState, action) {
    console.log('reducer', state, action);
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