import {Route, Routes} from "react-router-dom";
import Main from "./components/main/Main";
import Start from "./components/start/Start.jsx";
import NewsMain from "./components/news/NewsMain";
import NewsYo from "./components/news/Yo/NewsYo";
import NewsPor from "./components/news/Por/NewsPor";
import ContactMain from "./components/contacts/ContactMain";
import ContactYo from "./components/contacts/Yo/ContactYo";
import ContactPor from "./components/contacts/Por/ContactPor";
import ErrNotFound from "./components/other/error/ErrNotFound";
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
import HTeachers from "./components/people/hteachers/HTeachers";
import Classmates from "./components/people/classmates/Classmates";
import Parents from "./components/people/parents/Parents";
import Admins from "./components/people/admins/Admins";
import React from "react";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Kids from "./components/tutor/kids/Kids";

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
                  <Route index element={<NewsPor/>} />
                  <Route path="por" element={<NewsPor/>} />
                  {(cState.auth && cState.role != 4) && <Route path="yo" element={<NewsYo/>} />}
              </Route>
              <Route path="contacts" element={<ContactMain/>}>
                  <Route index element={<ContactPor/>} />
                  <Route path="por" element={<ContactPor/>} />
                  {(cState.auth && cState.role != 4) && <Route path="yo" element={<ContactYo/>} />}
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
                  <Route index element={<Admins/>} />
                  {(cState.auth && cState.role != 4) && <Route path="teachers" element={<Teachers/>} />}
                  {(cState.auth && cState.role != 4) && <Route path="hteachers" element={<HTeachers/>} />}
                  {(cState.auth && cState.role == 0) && <Route path="classmates" element={<Classmates/>} />}
                  {(cState.auth && cState.role == 0) && <Route path="parents" element={<Parents/>} />}
                  <Route path="admins" element={<Admins/>} />
              </Route>
              <Route path="tutor">
                  <Route path="kids" element={<Kids/>} />
                  <Route path="teachers" element={<Kids/>} />
                  <Route path="parents" element={<Kids/>} />
                  <Route path="hteachers" element={<Kids/>} />
              </Route>
              {cState.auth && <Route path="profiles" element={<Profile/>} />}
              <Route path="profiles/:log" element={<Profile/>} />
              {cState.auth && <Route path="settings" element={<Settings/>} />}
              <Route path="invite/:inv" element={<Start/>} />
              <Route path="*" element={<ErrNotFound/>} />
          </Route>
      </Routes>
    );
}

export default App;
