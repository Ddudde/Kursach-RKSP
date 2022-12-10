import { combineReducers } from "redux";
import checkBoxReducer from "./reducers/checkBoxReducer";
import clientReducer from "./reducers/clientReducer";
import themeReducer from "./reducers/themeReducer";
import indicatorReducer from "./reducers/indicatorReducer";
import newsReducer from "./reducers/newsReducer";
import contactReducer from "./reducers/contactReducer";
import statusReducer from "./reducers/statusReducer";
import dnevnikReducer from "./reducers/dnevnikReducer";
import zvonkiReducer from "./reducers/zvonkiReducer";
import periodsReducer from "./reducers/periodsReducer";
import scheduleReducer from "./reducers/scheduleReducer";

export default combineReducers({
    checkbox: checkBoxReducer,
    themes: themeReducer,
    indicators: indicatorReducer,
    news: newsReducer,
    contacts: contactReducer,
    states: statusReducer,
    dnevnik: dnevnikReducer,
    zvonki: zvonkiReducer,
    periods: periodsReducer,
    schedules: scheduleReducer
});