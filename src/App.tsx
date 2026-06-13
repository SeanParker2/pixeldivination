import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Home from './pages/Home';
import { StarChart } from './pages/StarChart';
import { Shop } from './pages/Shop';
import { Profile } from './pages/Profile';
import DailyFortune from './pages/DailyFortune';
import DivinationPage from './pages/Divination';
import EditProfile from './pages/EditProfile';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import FengShui from './pages/FengShui';
import FortuneCalendar from './pages/FortuneCalendar';
import Orders from './pages/Orders';
import BaZi from './pages/BaZi';
import NumerologyPage from './pages/Numerology';
import MatchPage from './pages/Match';
import CommunityPage from './pages/Community';
import { MainLayout } from './components/layout/MainLayout';
import { ToastContainer } from './components/ui/Toast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { WelcomeModal } from './components/WelcomeModal';
import { useUserStore } from './stores/useUserStore';
import { useAuth } from './hooks/useAuth';

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  },
};

function App() {
  const location = useLocation();
  const { isProfileSet } = useUserStore(state => state.profile);
  const { isAuthenticated, isLoading, loadProfile } = useAuth();

  // Load profile on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isAuthenticated && !isLoading) {
      loadProfile();
    }
  }, []); // Only run once on mount

  // Show welcome modal if profile is not set and user is not on edit/login page
  const showWelcome = !isProfileSet && location.pathname !== '/profile/edit' && location.pathname !== '/login';

  return (
    <ErrorBoundary>
      <ToastContainer />
      <AnimatePresence>
        {showWelcome && <WelcomeModal />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/daily-fortune" element={<DailyFortune />} />
              <Route path="/starchart" element={<StarChart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Standalone Pages (No Footer) */}
            <Route path="/divination" element={<DivinationPage />} />
            <Route path="/bazi" element={<BaZi />} />
            <Route path="/numerology" element={<NumerologyPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/fengshui" element={<FengShui />} />
            <Route path="/fortune-calendar" element={<FortuneCalendar />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/shop/:id" element={<ProductDetail />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default App
