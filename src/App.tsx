import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { StarChart } from './pages/StarChart';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';
import DailyFortune from './pages/DailyFortune';
import DivinationPage from './pages/Divination';
import EditProfile from './pages/EditProfile';
import ProductDetail from './pages/ProductDetail';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/daily-fortune" element={<DailyFortune />} />
        <Route path="/starchart" element={<StarChart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* Standalone Pages (No Footer) */}
      <Route path="/divination" element={<DivinationPage />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
    </Routes>
  )
}

export default App
