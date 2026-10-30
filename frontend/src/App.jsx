import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./styles/layout.css";

import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

// The project page (with its photo gallery) loads only when someone opens it.
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));

// Scrolls to #sections after navigation, or to the top on a new page.
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      if (!hash) window.scrollTo({ top: 0, behavior: "auto" });
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <ScrollToHash />
      <Navbar />

      <main id="main">
        <Suspense
          fallback={
            <div className="container section-pad text-center" role="status">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}