import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UwacuNavbar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import CultureHeritage from "./pages/CultureHeritage";
import Stories from "./pages/Stories";
import Photography from "./pages/Photography";
import InteractiveMap from "./pages/InteractiveMap";
import Learn from "./pages/Learn";
import MarketPlace from "./pages/MarketPlace";
import Events from "./pages/Events";
import UwacuFooter from "./components/Footer";
import ContactPage from "./pages/ContactPage";

// Auth & Protected Routes
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Dynamic / Protected Features
import StoryDetailPage from "./pages/StoryDetailPage";
import PostStoryPage from "./pages/PostStoryPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import PostCoursePage from "./pages/PostCoursePage";

gsap.registerPlugin(ScrollTrigger);

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AppInner() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    let rafId;
    const update = (time) => { lenis.raf(time); rafId = requestAnimationFrame(update); };
    rafId = requestAnimationFrame(update);

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite text-brand-charcoal selection:bg-brand-yellow selection:text-brand-green">
      <UwacuNavbar />
      <main className="flex-grow">
        <Routes>
          {/* Core */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Explore dropdown */}
          <Route path="/culture" element={<CultureHeritage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetailPage />} />
          <Route 
            path="/stories/post" 
            element={
              <ProtectedRoute roles={["author", "instructor"]}>
                <PostStoryPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/photography" element={<Photography />} />
          <Route path="/map" element={<InteractiveMap />} />

          {/* Nav links */}
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:courseId" element={<CourseDetailPage />} />
          <Route 
            path="/learn/post" 
            element={
              <ProtectedRoute roles={["instructor"]}>
                <PostCoursePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/get-involved" element={<MarketPlace />} />
          <Route path="/events" element={<Events />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <UwacuFooter />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppInner />
      </BrowserRouter>
    </AuthProvider>
  );
}
