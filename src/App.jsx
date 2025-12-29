import Press from "./pages/Press";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Releases from "./pages/Releases";

import RequireAdmin from "./admin/RequireAdmin";
import AdminAddArtist from "./admin/AdminAddArtist";
import AdminEditArtist from "./admin/AdminEditArtist";
import AdminDashboard from "./admin/AdminDashboard";
import AdminArtists from "./admin/AdminArtists";
import AdminReleases from "./admin/AdminReleases";
import AdminAddRelease from "./admin/AdminAddRelease";
import AdminEditRelease from "./admin/AdminEditRelease";
import AdminSubmissions from "./admin/AdminSubmissions";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/press" element={<Press />} />

        {/* Admin Auth (PUBLIC) */}
        <Route path="/admin/auth" element={<AdminLogin />} />

        {/* Admin (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="artists" element={<AdminArtists />} />
          <Route path="artists/new" element={<AdminAddArtist />} />
          <Route path="artists/edit/:id" element={<AdminEditArtist />} />

          <Route path="releases" element={<AdminReleases />} />
          <Route path="releases/new" element={<AdminAddRelease />} />
          <Route path="releases/edit/:id" element={<AdminEditRelease />} />

          <Route path="submissions" element={<AdminSubmissions />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
