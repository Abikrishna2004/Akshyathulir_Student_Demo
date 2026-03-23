import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import Drawx from './Pages/Drawx';
import Entreprener from './Pages/Enterprener';
import ResearchCom from './Pages/ResearchCom';
import Person from './Pages/Person';
import IndustryCollab from './Pages/IndustryCollab';
import MainDash from './Pages/MainDash';
import Patent from './Pages/Patent';
import Alumni from './Pages/Alumni';
import PlaceMent from './Pages/PlaceMent';


const AlumniStartupNetwork = () => <Typography variant="h4">Alumni Startup Network</Typography>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drawx />}>
          <Route index element={<MainDash />} />
          <Route path="profile" element={<Person />} />
          <Route path="stats" element={<Entreprener />} />
          <Route path="patents" element={<Patent />} />
          <Route path="collaboration" element={<IndustryCollab />} />
          <Route path="research" element={<ResearchCom />} />
          <Route path="alumni" element={<Alumni />} />
          <Route path="placement" element={<PlaceMent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;