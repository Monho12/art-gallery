import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import AddArt from './pages/addArt/addArt.jsx';
import ArtDetail from './pages/artDetail/artDetail.jsx';
import Gallery from './pages/gallery/gallery.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import NotFound from './pages/notFound/notFound.jsx';
import Profile from './pages/profile/profile.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function MainLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/addart" element={<AddArt />} />
            <Route path="/art/:id" element={<ArtDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
