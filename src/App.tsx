import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import { StarChart } from './pages/StarChart';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';
import DailyFortune from './pages/DailyFortune';
import DivinationPage from './pages/Divination';
import EditProfile from './pages/EditProfile';
import ProductDetail from './pages/ProductDetail';
import { MainLayout } from './components/layout/MainLayout';
import { ToastContainer } from './components/ui/Toast';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
      </AnimatePresence>
    </>
  )
}

export default App
