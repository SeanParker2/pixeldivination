import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { StarChart } from './pages/StarChart';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/starchart" element={<StarChart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        {/* 中间按钮暂时导向首页或一个开发中的占位页 */}
        <Route path="/divination" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
