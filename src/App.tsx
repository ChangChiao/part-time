import { useState } from 'react'
import { Route, Routes, HashRouter } from "react-router-dom";
import Layout from './layout/Layout';
import Index from './pages';
import NotFound from './pages/notFound';
import UserInfo from './pages/userInfo';
import AcceptedTask from './pages/acceptedTask';
import CreateTask from './pages/createTask';
import Favorite from './pages/favorite';
import ChatRecord from './pages/chatRecord';
import ChatRoomPage from './pages/chatRoomPage';
import CheckOrder from './pages/checkOrder';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/acceptedTask" element={<AcceptedTask />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/checkOrder" element={<CheckOrder />} />
          <Route path="/chatRecord" element={<ChatRecord />} />
          <Route path="/chatRoomPage" element={<ChatRoomPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
