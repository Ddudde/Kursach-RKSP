import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/main/Main";
import Start from "./components/start/Start.jsx";
import NewsMain from "./components/news/NewsMain";
import NewsYo from "./components/news/Yo/NewsYo";
import NewsPor from "./components/news/Por/NewsPor";
import ContactMain from "./components/contacts/ContactMain";
import ContactYo from "./components/contacts/Yo/ContactYo";
import ContactPor from "./components/contacts/Por/ContactPor";
import ErrNotFound from "./components/error/ErrNotFound";
import {states} from "./store/selector";
import {useSelector} from "react-redux";
import Dnevnik from "./components/dnevnik/Dnevnik";

function App() {
    const cState = useSelector(states);
    let indexComp;
    if(!cState.auth)
    {
        indexComp = <Start/>;
    } else {
        if(cState.role == 0) indexComp = <Dnevnik/>;
    }
    return (
      <Routes>
          {/*<Route path="/" element={<HelloWorld url='/comp'/>} />*/}
          <Route path="/" element={<Main/>}>
              <Route index element={indexComp} />
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
    );
}

export default App;
