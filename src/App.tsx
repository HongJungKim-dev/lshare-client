import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Initial from './pages/Initial';
import Main from './pages/Main';
import MemberDetail from './pages/MemberDetail';
import MemberEdit from './pages/MemberEdit';
import MemberManage from './pages/MemberManage';
import SignUp from './pages/SignUp';
import Write from './pages/Write';
import StudyManage from './pages/StudyManage';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Initial />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/write" element={<Write />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/memberEdit" element={<MemberEdit />} />
      <Route path="/memberDetail" element={<MemberDetail />} />
      <Route path="/memberManage" element={<MemberManage />} />
      <Route path="/studyManage" element={<StudyManage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
