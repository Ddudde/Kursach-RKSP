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
import AnalyticsMain from "./components/analytics/AnalyticsMain";
import Zvonki from "./components/analytics/zvonki/Zvonki";
import Periods from "./components/analytics/periods/Periods";
import Schedule from "./components/analytics/schedule/Schedule";
import AnalyticsJournal from "./components/analytics/journal/AnalyticsJournal";
import Marks from "./components/analytics/marks/Marks";
import PeopleMain from "./components/people/PeopleMain";
import Teachers from "./components/people/teachers/Teachers";

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
              <Route path="analytics" element={<AnalyticsMain/>}>
                  <Route index element={<Zvonki/>} />
                  <Route path="zvonki" element={<Zvonki/>} />
                  <Route path="periods" element={<Periods/>} />
                  <Route path="schedule" element={<Schedule/>} />
                  <Route path="journal" element={<AnalyticsJournal/>} />
                  <Route path="marks" element={<Marks/>} />
              </Route>
              <Route path="people" element={<PeopleMain/>}>
                  <Route index element={<Teachers/>} />
                  <Route path="teachers" element={<Teachers/>} />
                  <Route path="hteachers" element={<Teachers/>} />
                  <Route path="classmates" element={<Teachers/>} />
                  <Route path="parents" element={<Teachers/>} />
                  <Route path="admins" element={<Teachers/>} />
              </Route>
              <Route path="*" element={<ErrNotFound/>} />
          </Route>
      </Routes>
    );
}

export default App;
