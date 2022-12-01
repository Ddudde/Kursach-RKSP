import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from "react-helmet-async";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./store/store"
import {BrowserRouter} from "react-router-dom";
import Main from "./components/main/Main";
import NewsMain from "./components/news/NewsMain";
import {Route, Routes} from "react-router-dom";
import Start from "./components/start/Start.jsx";
import NewsYo from "./components/news/Yo/NewsYo";
import NewsPor from "./components/news/Por/NewsPor";
import ContactMain from "./components/contacts/ContactMain";
import ContactYo from "./components/contacts/Yo/ContactYo";
import ContactPor from "./components/contacts/Por/ContactPor";
import ErrNotFound from "./components/error/ErrNotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                    <Provider store={store}>
                        <Routes>
                            {/*<Route path="/" element={<HelloWorld url='/comp'/>} />*/}
                            <Route path="/" element={<Main/>}>
                                <Route index element={<Start/>} />
                                <Route path="start" element={<Start/>} />
                                <Route path="news" element={<NewsMain/>}>
                                    <Route index element={<NewsYo/>} />
                                    <Route path="por" element={<NewsPor/>} />
                                    <Route path="yo" element={<NewsYo/>} />
                                </Route>
                                <Route path="contacts" element={<ContactMain/>}>
                                    <Route index element={<ContactYo/>} />
                                    <Route path="por" element={<ContactPor/>} />
                                    <Route path="yo" element={<ContactYo/>} />
                                </Route>
                                <Route path="*" element={<ErrNotFound/>} />
                            </Route>
                        </Routes>
                    </Provider>
            </HelmetProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
